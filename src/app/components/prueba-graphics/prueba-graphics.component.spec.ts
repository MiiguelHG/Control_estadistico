import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaGraphicsComponent } from './prueba-graphics.component';

describe('PruebaGraphicsComponent', () => {
  let component: PruebaGraphicsComponent;
  let fixture: ComponentFixture<PruebaGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaGraphicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
