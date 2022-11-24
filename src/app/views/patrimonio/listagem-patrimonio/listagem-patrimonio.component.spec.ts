import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPatrimonioComponent } from './listagem-patrimonio.component';

describe('ListagemPatrimonioComponent', () => {
  let component: ListagemPatrimonioComponent;
  let fixture: ComponentFixture<ListagemPatrimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemPatrimonioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemPatrimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
