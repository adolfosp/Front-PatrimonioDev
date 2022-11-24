import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTempoComponent } from './modal-tempo.component';

describe('ModalTempoComponent', () => {
  let component: ModalTempoComponent;
  let fixture: ComponentFixture<ModalTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTempoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
