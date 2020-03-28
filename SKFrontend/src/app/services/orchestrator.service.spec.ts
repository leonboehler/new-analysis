import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OrchestratorService } from './orchestrator.service';

describe('OrchestratorService', () => {
  let service: OrchestratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(OrchestratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not allow person younger than 18 years (TK-0202a; D10)', () => {
    var currentYear = new Date().getFullYear();

    //In case of 2020: Test for 2010 (as year of birth)
    var res = service.validBirthday(String(currentYear - 10));

    expect(res).toBe(false);
  });

  it('should allow person older than 18 years (TK-0202a; D10)', () => {
    var currentYear = new Date().getFullYear();

    //In case of 2020: Test for 1997 (as year of birth)
    var res = service.validBirthday(String(currentYear - 22));

    expect(res).toBe(true);
  });
});
