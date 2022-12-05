import { Component, OnInit } from "@angular/core";
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import { ValidacaoCampoSenha } from "@nvs-helpers/ValidacaoSenhaHelper";
import { UsuarioPerfil } from "@nvs-models/UsuarioPerfil";
import { TokenService } from "@nvs-services/token/token.service";
import { UsuarioPerfilService } from "@nvs-services/usuario-perfil/usuario-perfil.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.sass"],
})
export class PerfilComponent implements OnInit {
  private _codigoUsuario: number;
  private _usuarioPerfil = {} as UsuarioPerfil;
  private _file: File;
  public form!: FormGroup;
  public imagemUrl = "assets/img/sem-imagem.png";

  constructor(
    private perfilService: UsuarioPerfilService,
    private token: TokenService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {}

  public get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this._codigoUsuario = this.token.obterCodigoUsuarioToken();

    this.validacao();
    this.carregarPerfilUsuario();
    this.tratarRetornoRequisicaoImagem();
  }

  private tratarRetornoRequisicaoImagem() {
    window.addEventListener(
      "error",
      (error) => {
        const { nodeName } = error.target as HTMLInputElement;

        if (nodeName.includes("IMG")) {
          this.atribuirCaminhoImagemPadraoPerfil();
        }
      },
      true,
    );
  }

  private validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidacaoCampoSenha.MustMatch("senha", "confirmeSenha"),
    };

    this.form = this.fb.group(
      {
        codigoUsuario: new FormControl(null),
        nomeUsuario: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        nomeSetor: new FormControl(null),
        razaoSocial: new FormControl(null),
        descricaoPermissao: new FormControl(null),
        email: new FormControl(null),
        senha: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
        imagemUrl: new FormControl(""),
        confirmeSenha: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      },
      formOptions,
    );
  }

  private carregarPerfilUsuario() {
    this.spinner.show("carregando");

    this.perfilService
      .obterPerfilUsuario(this._codigoUsuario)
      .subscribe({
        next: (result: UsuarioPerfil) => {
          this.form.patchValue(result);
          this._codigoUsuario = result.codigoUsuario;
          this.form.controls["confirmeSenha"].setValue(result.senha);

          this.tratarUrlImagem(result.imagemUrl);
        },
        error: (error: unknown) => {
          const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
          this.toaster[template.tipoMensagem](
            `Houve um erro ao carregar o perfil. Mensagem: ${template.mensagemErro}`,
            "Erro",
          );
        },
      })
      .add(() => this.spinner.hide("carregando"));
  }

  private tratarUrlImagem(url: string): void {
    if (typeof url == "undefined" || url == null) this.atribuirCaminhoImagemPadraoPerfil();
    else this.imagemUrl = `${environment.apiUrlImage}/${url}`;
  }

  public salvarAlteracaoPerfil(): void {
    this.spinner.show("atualizando");

    this._usuarioPerfil = new UsuarioPerfil(this.form.value);

    this.perfilService
      .atualizarPerfilUsuario(this._usuarioPerfil)
      .subscribe({
        next: () => {
          this.toaster.success(`Perfil atualizado com sucesso!`);
        },
        error: (error: unknown) => {
          const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
          this.toaster[template.tipoMensagem](
            `Houve um erro ao atualizar o perfil. Mensagem: ${template.mensagemErro}`,
            "Erro",
          );
        },
      })
      .add(() => this.spinner.hide("atualizando"));
  }

  public onFileChange(env: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.imagemUrl = event.target.result);
    this._file = env.target.files;
    reader.readAsDataURL(this._file[0]);

    this.uploadImagem();
  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = "none";
  }

  private uploadImagem(): void {
    this.spinner.show("upload");

    this.perfilService
      .inserirImagem(this._codigoUsuario, this._file[0])
      .subscribe({
        next: () => {
          this.carregarPerfilUsuario();
          this.toaster.success("Imagem atualizada com sucesso", "Sucesso");
        },
        error: (error: unknown) => {
          const template = MensagemRequisicao.retornarMensagemTratada(error["message"], error["error"].mensagem);
          this.toaster[template.tipoMensagem](
            `Houve um erro ao subir a imagem: Mensagem: ${template.mensagemErro}`,
            "Erro",
          );
        },
      })
      .add(() => this.spinner.hide("upload"));
  }

  private atribuirCaminhoImagemPadraoPerfil(): void {
    this.imagemUrl = "assets/img/sem-imagem.png";
  }
}
