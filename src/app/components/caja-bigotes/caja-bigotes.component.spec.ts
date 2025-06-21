import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaBigotesComponent } from './caja-bigotes.component';

describe('CajaBigotesComponent', () => {
  let component: CajaBigotesComponent;
  let fixture: ComponentFixture<CajaBigotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CajaBigotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaBigotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
