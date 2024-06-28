import { TestBed } from '@angular/core/testing';

import { MasterCoursesService } from './master-courses.service';

describe('MasterCoursesService', () => {
  let service: MasterCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
