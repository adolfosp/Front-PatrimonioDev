import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { PerdaEquipamento } from "@nvs-models/PerdaEquipamento";
import { PerdaService } from "@nvs-services/perda/perda.service";
import { ConfiguracaoSpinner } from "@nvs-utils/configuracao-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-perda",
  templateUrl: "./perda.component.html",
  styleUrls: ["./perda.component.sass", "../../../assets/style-base.sass"],
})
export class PerdaComponent extends Componente implements OnInit {
  @Output() reloadList = new EventEmitter();

  private _codigoPatrimonio: number;
  private _perda = {} as PerdaEquipamento;

  public form!: FormGroup;
  public confSpinner = ConfiguracaoSpinner;
  public show: boolean;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder, private perdaService: PerdaService, private spinner: NgxSpinnerService) {
    super();
  }

  public toggle(codigoPatrimonio: number) {
    this.switchModal();
    this._codigoPatrimonio = codigoPatrimonio;
  }

  private switchModal() {
    this.show = !this.show;
  }

  ngOnInit(): void {
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoPerdaEquipamento: new FormControl(),
      motivoDaPerda: new FormControl("", [Validators.required, Validators.minLength(30), Validators.maxLength(300)]),
      codigoPatrimonio: new FormControl(""),
    });
  }

  public salvarAlteracao(): void {
    this.spinner.show("cadastrar");

    this._perda = { ...this.form.value };
    this._perda.codigoPatrimonio = this._codigoPatrimonio;

    this.perdaService
      .cadastrar(this._perda)
      .subscribe({
        next: () => {
          this.mostrarAvisoSucesso(`Perda cadastrada com sucesso`);
          this.switchModal();
          this.reloadList.emit();
        },
        error: (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao("cadastrar", "perda", ["o", "da"])} `,
          );
        },
      })
      .add(() => this.spinner.hide("cadastrar"));
  }
}
