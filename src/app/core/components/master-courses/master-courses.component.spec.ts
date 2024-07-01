import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCoursesComponent } from './master-courses.component';

describe('MasterCoursesComponent', () => {
  let component: MasterCoursesComponent;
  let fixture: ComponentFixture<MasterCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
