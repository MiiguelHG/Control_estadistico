import { TestBed } from '@angular/core/testing';

import { GraficasxrService } from './graficasxr.service';

describe('GraficasxrService', () => {
  let service: GraficasxrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficasxrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
