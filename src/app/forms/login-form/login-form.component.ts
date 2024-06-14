import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import * as sha256 from 'sha256';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  emailErrorMessage = '';
  passwordErrorMessage = '';
  hide = true;
  userEmail: string = '';
  userPassword: string = '';

  constructor(private router: Router, private readonly usersService: UsersService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage = 'Not a valid email';
    } else if (this.email.hasError('invalid')) {
      this.emailErrorMessage = 'Not valid email or password';
    } else {
      this.emailErrorMessage = '';
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
    for (let control of [this.email, this.password]) {
      control.markAsTouched();
    }
    return this.email.valid && this.password.valid;
  }

  loginButtonClick(): void {
    if (!this.validateForm()) {
      return;
    }
    this.usersService.getUsers({ 'userEmail': this.userEmail.toLocaleLowerCase(), 'userPassword': sha256(this.userPassword) }).subscribe(
      (response) => {
        if (response.length > 0) {
          localStorage.setItem("email", this.userEmail.toLocaleLowerCase());
          localStorage.setItem("name", response[0].name);
          this.router.navigate(['/']);
        } else {
          this.email.setErrors({ 'invalid': true });
        }
      }
    );
  }
}
