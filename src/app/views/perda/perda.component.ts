import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MensagemRequisicao } from "@nvs-helpers/MensagemRequisicaoHelper";
import Componente from "@nvs-models/Componente";
import { PerdaEquipamento } from "@nvs-models/PerdaEquipamento";
import { PerdaService } from "@nvs-services/perda/perda.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-perda",
  templateUrl: "./perda.component.html",
  styleUrls: ["./perda.component.sass", "../../../assets/style-base.sass"],
})
export class PerdaComponent extends Componente implements OnInit {
  @Input() codigoPatrimonio: number;
  @Output() podeFecharModal = new EventEmitter<boolean>();

  form!: FormGroup;
  private _perda = {} as PerdaEquipamento;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private perdaService: PerdaService,
    private spinner: NgxSpinnerService,
  ) {
    super();
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
    this.spinner.show();

    this._perda = { ...this.form.value };
    this._perda.codigoPatrimonio = this.codigoPatrimonio;

    this.perdaService
      .cadastrarPerda(this._perda)
      .subscribe({
        next: () => this.mostrarAvisoSucesso(`Perda cadastrada com sucesso`),
        error: (error: unknown) => {
          this.mostrarAvisoErro(
            error,
            `${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao("cadastrar", "perda", ["o", "da"])} `,
          );
        },
        complete: () => {
          this.podeFecharModal.emit(true);
        },
      })
      .add(() => this.spinner.hide());
  }

  //remover quando refatorar
  public cssValidator(campoForm: FormControl): any {
    return { "is-invalid": campoForm.errors && campoForm.touched };
  }
}
