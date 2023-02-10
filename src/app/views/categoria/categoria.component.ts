/* eslint-disable rxjs/no-implicit-any-catch */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Categoria } from '@nvs-models/Categoria';
import Componente from '@nvs-models/Componente';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CLASSE_BOTAO_LIMPAR } from 'src/app/utils/classes-sass.constant';
import { DadosRequisicao } from '../../models/DadosRequisicao';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.sass', '../../../assets/style-base.sass'],
})
export class CategoriaComponent extends Componente implements OnInit, Componente {

  private categoria = {} as Categoria;
  private codigoCategoria: number | undefined;
  private limpandoCampo = false;

  public form!: FormGroup;
  public estadoSalvar = "cadastrarCategoria";
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private categoriaService: CategoriaService,
    private activateRouter: ActivatedRoute) {
    super();
  }

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

    const atualizando = this.estadoSalvar == 'atualizarCategoria';
    const nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';

    this.spinner.show(nomeAcaoRealizada);

    this.categoria = (this.estadoSalvar === 'cadastrarCategoria') ? { ...this.form.value } : { codigoCategoria: this.categoria.codigoCategoria, ...this.form.value };

    this.categoriaService[this.estadoSalvar](this.categoria).subscribe(
      (dados: DadosRequisicao) => this.toaster.success(`${dados.mensagem}`, 'Sucesso!'),
      (error: unknown) => {
        this.mostrarAvisoErro(error, `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "categoria", ['o', 'da'])}}`)
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
        next: (dados: DadosRequisicao) => {
          this.categoria = (dados.data) as Categoria;
          this.form.patchValue(this.categoria);
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um problema ao carregar a categoria")
        }
      }
    ).add(() => this.spinner.hide('carregando'));
  }

  mostrarAvisoErro(error: unknown, mensagemInicial: string): void {
    const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
    this.toaster[template.tipoMensagem](`${mensagemInicial}. Mensagem ${template.mensagemErro}`, template.titulo);
  }
}
