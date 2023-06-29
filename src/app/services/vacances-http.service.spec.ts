import { TestBed } from '@angular/core/testing';

import { VacancesHttpService } from './vacances-http.service';

describe('VacancesHttpService', () => {
  let service: VacancesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
