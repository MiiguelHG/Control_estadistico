import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarDatos } from './ingresar-datos';

describe('IngresarDatos', () => {
  let component: IngresarDatos;
  let fixture: ComponentFixture<IngresarDatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarDatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarDatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
