import { TestBed } from '@angular/core/testing';

import { HistogramaService } from './histograma.service';

describe('HistogramaService', () => {
  let service: HistogramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistogramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
