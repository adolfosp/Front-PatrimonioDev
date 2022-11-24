import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Categoria } from '@nvs-models/Categoria';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.sass', '../../../assets/style-base.sass'],
})
export class CategoriaComponent implements OnInit {


  public form!: FormGroup;
  private categoria = {} as Categoria;
  public estadoSalvar = "cadastrarCategoria";
  private codigoCategoria: number | undefined;
  private limpandoCampo = false;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private categoriaService: CategoriaService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarCategoria();
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoCategoria: new FormControl(this.limpandoCampo ? this.form.get('codigoCategoria')?.value : 0, [],),
      descricao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])

    });
  }

  public salvarAlteracao(): void {

    let atualizando = this.estadoSalvar == 'atualizarCategoria';
    let nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';

    this.spinner.show(nomeAcaoRealizada);

    this.categoria = (this.estadoSalvar === 'cadastrarCategoria') ? { ...this.form.value } : { codigoCategoria: this.categoria.codigoCategoria, ...this.form.value };

    this.categoriaService[this.estadoSalvar](this.categoria).subscribe(
      () => this.toaster.success(`Categoria ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "categoria", ['o', 'da'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['dashboard/categoria/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarCategoria(): void {

    this.codigoCategoria = +this.activateRouter.snapshot.paramMap?.get('codigoCategoria');

    if (this.codigoCategoria == null || this.codigoCategoria == 0) return;

    this.estadoSalvar = 'atualizarCategoria';
    this.spinner.show('carregando');

    this.categoriaService.obterApenasUmaCategoria(this.codigoCategoria).subscribe(
      {
        next: (categoria: Categoria) => {
          this.categoria = { ...categoria };
          this.form.patchValue(this.categoria);
        },
        error: (error: any) => {
          let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
          this.toaster[template.tipoMensagem](`Houve um problema ao carregar a categoria. Mensagem: ${template.mensagemErro}`, template.titulo);
        }
      }
    ).add(() => this.spinner.hide('carregando'));
  }
}

