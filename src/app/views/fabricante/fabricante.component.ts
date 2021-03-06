import { FabricanteService } from './../../services/fabricante/fabricante.service';
import { Fabricante } from './../../models/Fabricante';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicaoHelper';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss', '../../../scss/style-base.scss']
})
export class FabricanteComponent implements OnInit {

  form!: FormGroupTypeSafe<Fabricante>;
  fabricante = {} as Fabricante;
  codigoFabricante: number;
  public estadoSalvar: string = 'cadastrarFabricante';
  private limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilderTypeSafe,
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
    this.form = this.fb.group<Fabricante>({
      codigoFabricante: new FormControl(this.limpandoCampo ? this.form.get('codigoFabricante').value : 0, []),
      nomeFabricante: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    });
  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    let atualizando = this.estadoSalvar == 'atualizarFabricante';
    let nomeAcaoRealizada = atualizando ? 'atualizado' : 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.fabricante = (this.estadoSalvar === 'cadastrarFabricante') ? { ...this.form.value } : { codigoFabricante: this.fabricante.codigoFabricante, ...this.form.value };

    this.fabricanteService[this.estadoSalvar](this.fabricante).subscribe(
      () => this.toaster.success(`Fabricante ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "fabricante", ['o', 'do'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () => {

        setTimeout(() => {
          this.router.navigate(['dashboard/listar-fabricante'])
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
          error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um erro ao tentar carregar o fabricante. Mensagem: ${template.mensagemErro}`, template.titulo);
          }
        }
      ).add(() => this.spinner.hide('carregando'));
    }
  }

}
