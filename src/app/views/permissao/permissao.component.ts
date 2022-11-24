import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '@nvs-helpers/MensagemRequisicaoHelper';
import { UsuarioPermissao } from '@nvs-models/UsuarioPermissao';
import { PermissaoService } from '@nvs-services/permissao/permissao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.sass', '../../../assets/style-base.sass']
})
export class PermissaoComponent implements OnInit {

  form!: FormGroup;
  usuarioPermissao = {} as UsuarioPermissao;
  codigoPerfil: number;
  estadoSalvar: string = 'cadastrarPermissao';
  private limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private permissaoService: PermissaoService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarPermissao();
    this.controlarVisibilidadeCampoAtivo();
  }

  //TODO: Realizar busca do banco
  permissoesPorContexto: Array<any> = [
    { nomeContexto: 'Patrimônio', codigo: 1, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Setor', codigo: 2, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Empresa', codigo: 3, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Equipamento', codigo: 4, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Permissão', codigo: 5, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Fabricante', codigo: 6, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Funcionário', codigo: 7, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Movimentação', codigo: 8, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'CategoriaEquipamento', codigo: 9, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },
    { nomeContexto: 'Usuário', codigo: 10, permissoes: [{ name: 'Alterar', value: 1, checked: false }, { name: 'Adicionar', value: 2, checked: false }, { name: 'Listar', value: 3, checked: false }, { name: 'Remover', value: 4, checked: false }, { name: 'Desativar', value: 5, checked: false }] },

  ];

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  private controlarVisibilidadeCampoAtivo(): void {

    if (this.estadoSalvar == 'cadastrarPermissao'){
      this.form.controls['ativo'].disable();
      return;
    }

    this.form.controls['ativo'].enable()
  }

  public carregarPermissao(): void {
    this.codigoPerfil = +this.activateRouter.snapshot.paramMap.get('codigoPermissao');

    if (this.codigoPerfil !== null && this.codigoPerfil !== 0) {
      this.estadoSalvar = 'atualizarPermissao';
      this.spinner.show('carregando');

      this.permissaoService.obterApenasUmaPermissao(this.codigoPerfil).subscribe(
        {
          next: (permissao: UsuarioPermissao[]) => {
            this.usuarioPermissao = permissao[0];
            this.form.patchValue(this.usuarioPermissao);
            this.atribuirPermissoesAoControleForm(permissao);
          },
          error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao carregar a permissão. Mensagem ${template.mensagemErro}`, template.titulo);
          }
        }
      ).add(() => this.spinner.hide('carregando'));
    }
  }

  private atribuirPermissoesAoControleForm(permissao: UsuarioPermissao[]): void {

    const acoesPorContexto: FormArray = this.form.get('acoesPorContexto') as FormArray;

    for (let i = 0; i < permissao.length; i++) {

      for (let k = 0; k < permissao[i].codigosPermissao.length; k++) {
        this.permissoesPorContexto[permissao[i].codigoContexto - 1].permissoes[permissao[i].codigosPermissao[k] - 1].checked = true;
        const permissaoFormatada = `${permissao[i].codigoContexto}-${this.permissoesPorContexto[permissao[i].codigoContexto].permissoes[permissao[i].codigosPermissao[k] - 1].value}`;
        acoesPorContexto.push(new FormControl(permissaoFormatada));
      }

    }
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoPerfil: new FormControl(this.limpandoCampo ? this.form.get('codigoUsuarioPermissao').value : 0, []),
      descricaoPerfil: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      ativo: new FormControl(true),
      acoesPorContexto: this.fb.array([], [Validators.required])
    });
  }

  public onCheckBoxMarcada(e) {
    const acoesPorContexto: FormArray = this.form.get('acoesPorContexto') as FormArray;
    if (e.checked) {
      acoesPorContexto.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      acoesPorContexto.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          acoesPorContexto.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  public salvarAlteracao(): void {

    let atualizando = this.estadoSalvar == 'atualizarPatrimonio';
    let nomeAcaoRealizada = atualizando ? 'atualizada' : 'cadastrada';

    this.spinner.show(nomeAcaoRealizada);

    this.usuarioPermissao = (this.estadoSalvar === 'cadastrarPermissao') ? { ...this.form.value } : { codigoPerfil: this.usuarioPermissao.codigoPerfil, ...this.form.value };

    this.permissaoService[this.estadoSalvar](this.usuarioPermissao).subscribe(
      () => this.toaster.success(`Permissão ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "permissão", ['o', 'da'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['dashboard/permissao/listagem'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }
}

