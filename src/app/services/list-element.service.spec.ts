import { TestBed } from '@angular/core/testing';

import { ListElementService } from './list-element.service';

describe('ListElementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListElementService = TestBed.get(ListElementService);
    expect(service).toBeTruthy();
  });
});
