
import { TestBed, async, inject } from '@angular/core/testing';
import { CheckserviceService } from './checkservice.service';

describe('CheckserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckserviceService]
    });
  });

  it('should ...', inject([CheckserviceService], (service: CheckserviceService) => {
    expect(service).toBeTruthy();
  }));
});
