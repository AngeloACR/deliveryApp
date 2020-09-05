import { TestBed } from '@angular/core/testing';

import { DbHandlerService } from './db-handler.service';

describe('DbHandlerService', () => {
  let service: DbHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
