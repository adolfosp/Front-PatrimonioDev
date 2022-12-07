import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from '../../services/api/api.service';
import { CategoriaComponent } from './categoria.component';

const fakeActivatedRoute = {
  snapshot: { data: { "codigoCategoria": "1"} }
} as unknown as ActivatedRoute;

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaComponent ],
      imports: [
        FormsModule, ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        JwtModule.forRoot({})
      ],
      providers: [
                  ApiService,
                  CategoriaService,
                  NgxSpinnerService,
                  JwtHelperService,
                  {provide: ActivatedRoute, useValue: fakeActivatedRoute}

                  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should has 2 inputs', () =>{

    //Arrange & Act
    const formElement = fixture.debugElement.nativeElement.querySelector('#card_categoriaForm');
    const todosElementosInput = formElement.querySelectorAll('input');

    //Assert
    expect(todosElementosInput.length).toEqual(2);

  });

  it('should check initial form values for categoria form', () =>{

    //Arrange & Act
    const categoriaValues = {
      codigoCategoria: 0,
      descricao: ''
    };

    //Assert
    expect(component.form.value).toEqual(categoriaValues);

  });

  it('should check descricao value before entering some value', () =>{

    //Arrange & Act
    const descricaoFormGroup = component.form.get('descricao');

    //Assert
    expect(descricaoFormGroup.errors['required']).toBeTruthy();

  });

  it('should show error if maxlength is greater than 50 characters', () =>{

    //Arrange & Act
    component.form.controls['descricao'].setValue("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do");
    const descricaoFromGroup = component.form.get('descricao');

    //Assert
    expect(descricaoFromGroup.errors['maxlength']).toBeTruthy();

  });

  it('should not show error if maxlength is less or equal to 50 characters', () =>{

    //Arrange & Act
    component.form.controls['descricao'].setValue("Lorem ipsum dolor sit amet, consectetur adipisicin");
    const descricaoFormGroup = component.form.get('descricao');

    //Assert
    expect(descricaoFormGroup.errors).toEqual(null);

  });

  it('should show error if minlength is less to 2 characters', () =>{

    //Arrange & Act
    component.form.controls['descricao'].setValue("L")
    const descricaoFromGroup = component.form.get('descricao');

    //Assert
    expect(descricaoFromGroup.errors['minlength']).toBeTruthy();

  });

  it('should error if minlength is less to 2 characters', () =>{

    //Arrange & Act
    component.form.controls['descricao'].setValue("L")
    const descricaoFormGroup = component.form.get('descricao');

    //Assert
    expect(descricaoFormGroup.errors['minlength']).toBeTruthy();

  });

  it('should enable the button if does not have error in form', () =>{

    //Arrange & Act
    component.form.controls['descricao'].setValue("Adolfo")
    const botaoSalvar = document.querySelector('.cadastrar') as HTMLButtonElement;
    fixture.detectChanges();

    //Assert
    expect(botaoSalvar.disabled).toBeFalsy();

  });

  it('should not enable the button if does have error in form', () =>{

    //Arrange & Act
    component.form.controls['descricao'].setValue("A")
    const botaoSalvar = document.querySelector('.cadastrar') as HTMLButtonElement;
    fixture.detectChanges();

    //Assert
    expect(botaoSalvar.disabled).toBeTruthy();

  });

});
