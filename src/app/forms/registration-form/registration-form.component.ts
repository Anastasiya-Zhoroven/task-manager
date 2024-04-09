import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import * as sha256 from 'sha256';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);

  nameErrorMessage = '';
  emailErrorMessage = '';
  passwordErrorMessage = '';

  hide = true;

  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';

  constructor(private router: Router, private readonly usersService: UsersService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.name.statusChanges, this.name.valueChanges)
      .subscribe(() => this.updateNameErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage = 'Not a valid email';
    } else if (this.email.hasError('invalid')) {
      this.emailErrorMessage = 'This email already exists';
    } else if (this.email.hasError('pattern')) {
      this.emailErrorMessage = 'Pattern not matched: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    } else {
      this.emailErrorMessage = '';
    }
  }

  updateNameErrorMessage() {
    if (this.name.hasError('required')) {
      this.nameErrorMessage = 'You must enter a value';
    } else {
      this.nameErrorMessage = '';
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage = 'You must enter a value';
    } else {
      this.passwordErrorMessage = '';
    }
  }

  validateForm(): boolean {
    for (let control of [this.name, this.email, this.password]) {
      control.markAsTouched();
    }
    return this.name.valid && this.email.valid && this.password.valid;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }
    this.usersService.getUsers({ 'userEmail': this.userEmail.toLocaleLowerCase() }).subscribe(
      (response) => {
        if (response.length > 0) {
          this.email.setErrors({ 'invalid': true });
        } else {
          let newUser: User = { name: this.userName, email: this.userEmail.toLocaleLowerCase(), password: sha256(this.userPassword) }
          this.usersService.addUser(newUser).subscribe(
            (response) => {
              this.router.navigate(['/']);
              localStorage.setItem("name", response.name);
              localStorage.setItem("email", response.email);
            }
          );
        }
      }
    );

  }
}



