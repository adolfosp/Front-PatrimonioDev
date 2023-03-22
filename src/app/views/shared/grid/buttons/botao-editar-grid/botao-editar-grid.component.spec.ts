import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoEditarGridComponent } from './botao-editar-grid.component';

describe('GridBotaoEditarComponent', () => {
  let component: BotaoEditarGridComponent;
  let fixture: ComponentFixture<BotaoEditarGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoEditarGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoEditarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
