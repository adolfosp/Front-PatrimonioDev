import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaginacaoComponent } from './select-paginacao.component';

describe('SelectPaginacaoComponent', () => {
  let component: SelectPaginacaoComponent;
  let fixture: ComponentFixture<SelectPaginacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPaginacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPaginacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
