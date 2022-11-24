import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMovimentacaoComponent } from './listagem-movimentacao.component';

describe('ListagemMovimentacaoComponent', () => {
  let component: ListagemMovimentacaoComponent;
  let fixture: ComponentFixture<ListagemMovimentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemMovimentacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
