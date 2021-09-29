import { TestBed } from '@angular/core/testing';

import { IsAdmin } from './is-admin.service';

describe('IsAdminService', () => {
  let service: IsAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
