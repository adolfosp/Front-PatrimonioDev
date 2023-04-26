
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IServiceAtualizar, IServiceCadastrar } from '@nvs-helpers/IServiceNomeHelper';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { Categoria } from '@nvs-models/Categoria';
import Componente from '@nvs-models/Componente';
import { DadosRequisicao } from '@nvs-models/requisicoes/DadosRequisicao';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CLASSE_BOTAO_LIMPAR } from 'src/app/utils/classes-sass.constant';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.sass', '../../../assets/style-base.sass'],
})
export class CategoriaComponent extends Componente implements OnInit, Componente {

  private _categoria = {} as Categoria;
  private _codigoCategoria: number | undefined;
  private _limpandoCampo = false;

  public form!: FormGroup;
  public estadoSalvar = IServiceCadastrar;
  public readonly classeBotaoLimpar = CLASSE_BOTAO_LIMPAR;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
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
    this._limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoCategoria: new FormControl(this._limpandoCampo ? this.form.get('codigoCategoria')?.value : 0, [],),
      descricao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])

    });
  }

  public salvarAlteracao(): void {

    const atualizando = this.estadoSalvar === IServiceAtualizar;
    const nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';

    this.spinner.show(nomeAcaoRealizada);

    this._categoria = (this.estadoSalvar === IServiceCadastrar) ? { ...this.form.value } : { codigoCategoria: this._categoria.codigoCategoria, ...this.form.value };

    this.categoriaService[this.estadoSalvar](this._categoria).subscribe(
      (dados: DadosRequisicao) => this.mostrarAvisoSucesso(dados.mensagem),
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

    this._codigoCategoria = +this.activateRouter.snapshot.paramMap?.get('codigoCategoria');

    if (this._codigoCategoria == null || this._codigoCategoria == 0) return;

    this.estadoSalvar = IServiceAtualizar;
    this.spinner.show('carregando');

    this.categoriaService.obterRegistro(this._codigoCategoria).subscribe(
      {
        next: (dados: DadosRequisicao) => {
          this._categoria = (dados.data) as Categoria;
          this.form.patchValue(this._categoria);
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(error, "Houve um problema ao carregar a categoria")
        }
      }
    ).add(() => this.spinner.hide('carregando'));
  }
}
