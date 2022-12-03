import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Fabricante } from '@nvs-models/Fabricante';
import { FabricanteService } from '@nvs-services/fabricante/fabricante.service';
import { CLASSE_BOTAO_LIMPAR } from '@nvs-utils/classes-sass.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.sass', '../../../assets/style-base.sass']
})
export class FabricanteComponent implements OnInit {

  private limpandoCampo = false;
  private fabricante = {} as Fabricante;
  private codigoFabricante: number;

  public form!: FormGroup;
  public estadoSalvar = 'cadastrarFabricante';
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;


  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private fabricanteService: FabricanteService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarFabricante();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoFabricante: new FormControl(this.limpandoCampo ? this.form.get('codigoFabricante').value : 0, []),
      nomeFabricante: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    });
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  public salvarAlteracao(): void {
    const atualizando = this.estadoSalvar == 'atualizarFabricante';
    const nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.fabricante = (this.estadoSalvar === 'cadastrarFabricante') ? { ...this.form.value } : { codigoFabricante: this.fabricante.codigoFabricante, ...this.form.value };

    this.fabricanteService[this.estadoSalvar](this.fabricante).subscribe(
      () => this.toaster.success(`Fabricante ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: unknown) => {
        const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "fabricante", ['o', 'do'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () => {

        setTimeout(() => {
          this.router.navigate(['dashboard/fabricante/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  public carregarFabricante(): void {
    this.codigoFabricante = +this.activateRouter.snapshot.paramMap.get('codigoFabricante');
    if (this.codigoFabricante !== null && this.codigoFabricante !== 0) {
      this.estadoSalvar = 'atualizarFabricante';
      this.spinner.show('carregando');

      this.fabricanteService.obterApenasUmFabricante(this.codigoFabricante).subscribe(
        {
          next: (fabricante: Fabricante) => {
            this.fabricante = { ...fabricante };
            this.form.patchValue(this.fabricante);
          },
          error: (error: unknown) => {
            const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao tentar carregar o fabricante. Mensagem: ${template.mensagemErro}`, template.titulo);
          }
        }
      ).add(() => this.spinner.hide('carregando'));
    }
  }

}
