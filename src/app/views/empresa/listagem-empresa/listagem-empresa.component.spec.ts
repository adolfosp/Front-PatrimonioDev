import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemEmpresaComponent } from './listagem-empresa.component';

describe('ListagemEmpresaComponent', () => {
  let component: ListagemEmpresaComponent;
  let fixture: ComponentFixture<ListagemEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
