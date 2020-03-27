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
});
