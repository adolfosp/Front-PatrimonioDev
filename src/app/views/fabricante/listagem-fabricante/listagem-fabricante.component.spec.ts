import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemFabricanteComponent } from './listagem-fabricante.component';

describe('ListagemFabricanteComponent', () => {
  let component: ListagemFabricanteComponent;
  let fixture: ComponentFixture<ListagemFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemFabricanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
