import { TestBed } from '@angular/core/testing';

import { NotifecationsService } from './notifecations.service';

describe('NotifecationsService', () => {
  let service: NotifecationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifecationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
