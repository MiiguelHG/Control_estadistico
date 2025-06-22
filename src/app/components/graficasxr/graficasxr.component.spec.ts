import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasxrComponent } from './graficasxr.component';

describe('GraficasxrComponent', () => {
  let component: GraficasxrComponent;
  let fixture: ComponentFixture<GraficasxrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficasxrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasxrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
