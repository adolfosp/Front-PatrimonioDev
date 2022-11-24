import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSetorComponent } from './listagem-setor.component';

describe('ListagemSetorComponent', () => {
  let component: ListagemSetorComponent;
  let fixture: ComponentFixture<ListagemSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemSetorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
