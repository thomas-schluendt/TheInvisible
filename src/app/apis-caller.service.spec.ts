
import { TestBed, async, inject } from '@angular/core/testing';
import { ApisCallerService } from './apis-caller.service';

describe('ApisCallerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApisCallerService]
    });
  });

  it('should ...', inject([ApisCallerService], (service: ApisCallerService) => {
    expect(service).toBeTruthy();
  }));
});
