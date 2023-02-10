import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Categoria } from '@nvs-models/Categoria';
import { DadosRequisicao } from '@nvs-models/DadosRequisicao';
import { Equipamento } from '@nvs-models/Equipamento';
import { Fabricante } from '@nvs-models/Fabricante';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { EquipamentoService } from '@nvs-services/equipamento/equipamento.service';
import { FabricanteService } from '@nvs-services/fabricante/fabricante.service';
import { CLASSE_BOTAO_LIMPAR } from '@nvs-utils/classes-sass.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.sass','../../../assets/style-base.sass']
})
export class EquipamentoComponent implements OnInit {

  private equipamento = {} as Equipamento;
  private codigoEquipamento: number;
  private limpandoCampo = false;

  public form!: FormGroup;
  public estadoSalvar = 'cadastrarEquipamento';
  public fabricantes: Fabricante[] = [];
  public categorias: Categoria[] = [];
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  public select: any
  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private fabricanteService: FabricanteService,
    private categoriaService: CategoriaService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarFabricantes();
    this.carregarCategorias();
    this.carregarEquipamento();
  }

  getValues(){
    this.select;
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private carregarFabricantes(): void {

    this.fabricanteService.obterTodosFabricante().subscribe(
      (result: Fabricante[]) => {
        this.fabricantes = result;
      },
      (error: unknown) => {
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar os fabricante. Mensagem: ${template.mensagemErro}`, template.titulo);
      },
    );
  }

  private carregarCategorias(): void {

    this.categoriaService.obterTodasCategorias().subscribe({
      next: (result: DadosRequisicao) => {
        this.categorias = result.data as Categoria[];
      },
      error: (error: unknown) => {
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar as categorias. Mensagem: ${template.mensagemErro}`, template.titulo);
      },

    });
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoTipoEquipamento: new FormControl(this.limpandoCampo? this.form.get('codigoTipoEquipamento').value : 0, [],),
      tipoEquipamento: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      codigoFabricante: new FormControl('' ,[Validators.required]),
      codigoCategoria: new FormControl('' ,[Validators.required]),
      nomeFabricante: new FormControl(''),
      nomeCategoria: new FormControl('')
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public cssValidatorCampoSelecao(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors};
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == 'atualizarEquipamento';
    const nomeAcaoRealizada = atualizando? 'atualizado': 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.equipamento = (this.estadoSalvar === 'cadastrarEquipamento') ? {...this.form.value} : {codigoTipoEquipamento: this.equipamento.codigoTipoEquipamento, ...this.form.value};

    this.equipamentoService[this.estadoSalvar](this.equipamento).subscribe(
      () => this.toaster.success(`Equipamento ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: unknown) => {
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"equipamento", ['o','do'])} Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/equipamento/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarEquipamento() : void{
    this.codigoEquipamento = +this.activateRouter.snapshot.paramMap.get('codigoEquipamento');

     if(this.codigoEquipamento !== null && this.codigoEquipamento !== 0){

      this.estadoSalvar = 'atualizarEquipamento';
       this.spinner.show('carregando');

       this.equipamentoService.obterApenasUmEquipamento(this.codigoEquipamento).subscribe(
         {
           next: (equipamento: Equipamento) => {
             this.equipamento = {...equipamento};
             this.form.patchValue(this.equipamento);
           },
           error: (error: unknown) => {
            const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            this.toaster[template.tipoMensagem](`Houve um problema ao carregar o equipamento. Mensagem: ${template.mensagemErro}`, 'Erro!');
           }
         }
       ).add(() => this.spinner.hide('carregando'));
     }
   }

}
