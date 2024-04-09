import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SelectOption } from 'src/app/interfaces/selectOption.interface';
import { TaskFilters } from 'src/app/interfaces/taskFilters.interface';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-task-filters-form',
  templateUrl: './task-filters-form.component.html',
  styleUrls: ['./task-filters-form.component.scss']
})
export class TaskFiltersFormComponent {
  @Output() onApply = new EventEmitter<TaskFilters>();
  @Input() users!: User[]; 

  form!: FormGroup;
  dueDateForm!: FormGroup;
  orderBy: string = 'asc';

  sortByOptions: SelectOption[] = [
    {value: 'id', viewValue: 'Created date'},
    {value: 'due_date', viewValue: 'Due date'},
  ];

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      assignees: [[], []],
      sortBy: ['', []],
    });

    this.dueDateForm = this.fb.group({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  updateOrder() {
    this.orderBy = this.orderBy == 'asc' ? 'desc' : 'asc';
  }

  clearFilters() {
    this.form.patchValue({
      'assignees': [],
      'sortBy': null,
    });
    this.dueDateForm.patchValue({
      'start': null,
      'end': null,
    });
  }

  onSubmit() {
    let dueDate = {
      'start': this.dueDateForm.value['start'] && this.dueDateForm.value['start'].getTime(),
      'end': this.dueDateForm.value['end'] && this.dueDateForm.value['end'].getTime()
    };
    let data = {...this.form.value, 'dueDate': dueDate, 'orderBy': this.orderBy};
    this.onApply.emit(data);
  }
}
