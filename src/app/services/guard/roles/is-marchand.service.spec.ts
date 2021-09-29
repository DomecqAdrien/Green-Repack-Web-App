import { TestBed } from '@angular/core/testing';

import { IsMarchand } from './is-marchand.service';

describe('IsMarchandService', () => {
  let service: IsMarchand;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsMarchand);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
