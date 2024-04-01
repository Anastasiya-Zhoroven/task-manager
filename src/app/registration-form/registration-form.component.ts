import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  
  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  hide = true;

  constructor(private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .subscribe(() => this.updateErrorMessage());
  }


  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  loginButtonClick(): void {
    this.router.navigate(['/dashboard']);
  }
}



