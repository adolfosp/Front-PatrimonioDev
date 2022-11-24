import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaCanvasComponent } from './etiqueta-canvas.component';

describe('EtiquetaCanvasComponent', () => {
  let component: EtiquetaCanvasComponent;
  let fixture: ComponentFixture<EtiquetaCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtiquetaCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
