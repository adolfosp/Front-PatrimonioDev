import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoRemoverGridComponent } from './botao-remover-grid.component';

describe('BotaoRemoverGridComponent', () => {
  let component: BotaoRemoverGridComponent;
  let fixture: ComponentFixture<BotaoRemoverGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoRemoverGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoRemoverGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
