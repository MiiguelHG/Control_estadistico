import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendenciasCentralComponent } from './tendencias-central.component';

describe('TendenciasCentralComponent', () => {
  let component: TendenciasCentralComponent;
  let fixture: ComponentFixture<TendenciasCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TendenciasCentralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendenciasCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
