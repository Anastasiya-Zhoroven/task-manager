import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFiltersFormComponent } from './task-filters-form.component';

describe('TaskFiltersFormComponent', () => {
  let component: TaskFiltersFormComponent;
  let fixture: ComponentFixture<TaskFiltersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFiltersFormComponent]
    });
    fixture = TestBed.createComponent(TaskFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
