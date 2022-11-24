import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPermissaoComponent } from './listagem-permissao.component';

describe('ListagemPermissaoComponent', () => {
  let component: ListagemPermissaoComponent;
  let fixture: ComponentFixture<ListagemPermissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemPermissaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemPermissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
