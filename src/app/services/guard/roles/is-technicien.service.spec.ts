import { TestBed } from '@angular/core/testing';

import { IsTechnicien } from './is-technicien.service';

describe('IsTechnicienService', () => {
  let service: IsTechnicien;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsTechnicien);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
