import { TestBed } from '@angular/core/testing';

import { MyFirstWebComponentService } from './my-first-web-component.service';

describe('MyFirstWebComponentService', () => {
  let service: MyFirstWebComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFirstWebComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
