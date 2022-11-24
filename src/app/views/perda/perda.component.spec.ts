import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdaComponent } from './perda.component';

describe('PerdaComponent', () => {
  let component: PerdaComponent;
  let fixture: ComponentFixture<PerdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerdaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
