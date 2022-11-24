import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPerdaComponent } from './relatorio-perda.component';

describe('RelatorioPerdaComponent', () => {
  let component: RelatorioPerdaComponent;
  let fixture: ComponentFixture<RelatorioPerdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioPerdaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioPerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
