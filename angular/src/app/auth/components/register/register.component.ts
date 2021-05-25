import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AlertService, UserService } from '../../../services';

@Component({
  selector: 'app-register',
  template: `
  <div class="content is-large has-text-centered">
  <h1>Register</h1>
  <h2>Welcome!</h2>

  <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="firstName">First Name</label><br/>
        <input type="text" formControlName="firstName" class="form-control input has-text-centered is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.firstName.errors }" placeholder="Enter First Name Here" />
        <div *ngIf="submitted && f.firstName.errors" class="invalid-feedback">
            <div *ngIf="f.firstName.errors.required">First Name is required</div>
            <div *ngIf="f.firstName.errors.maxlength">First name cannot be longer than 40 characters</div>
        </div>
    </div>
    <div class="form-group">
        <label for="lastName">Last Name</label><br/>
        <input type="text" formControlName="lastName" class="form-control input has-text-centered is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.lastName.errors }" placeholder="Enter Last Name Here" />
        <div *ngIf="submitted && f.lastName.errors" class="invalid-feedback">
            <div *ngIf="f.lastName.errors.required">Last Name is required</div>
            <div *ngIf="f.lastName.errors?.maxlength">Last name cannot be longer than 40 characters</div>
        </div>
    </div>
    <div class="form-group">
        <label for="email">E-mail</label><br/>
        <input type="text" formControlName="email" class="form-control input has-text-centered is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.email.errors }" placeholder="Enter E-mail Here" />
        <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
            <div *ngIf="f.email.errors.required">E-mail is required</div>
            <div *ngIf="f.email.errors.email">E-mail is invalid</div>
        </div>
    </div>
    <div class="form-group">
        <label for="username">Username</label><br/>
        <input type="text" formControlName="username" class="form-control input has-text-centered is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.username.errors }" placeholder="Enter Username Here" />
        <div *ngIf="(submitted && f.username.errors) || f.username.errors?.isTaken" class="invalid-feedback">
            <div *ngIf="f.username.errors?.required">Username is required</div>
            <div *ngIf="f.username.errors?.isTaken">Username is already taken</div>
            <div *ngIf="f.username.errors?.maxlength">Username cannot be longer than 40 characters</div>
        </div>
    </div>
    <div class="form-group">
        <label for="password">Password</label><br/>
        <input type="password" formControlName="password" class="form-control input has-text-centered is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" placeholder="Enter Password Here" />
        <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
            <div *ngIf="f.password.errors.required">Password is required</div>
            <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
        </div>
    </div>
    <div class="form-group">
        <button [disabled]="loading" class="button is-link register-submit">Register</button>
        <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
    </div>
</form>
</div>
  `,
  styles: [`
  #poz{
    background-image: url('assets/img/neum-border.jpg') !important;
    background-size: cover;
    background-position: center center;
  }
  .content{
    background-image: url('assets/img/main/signup.jpg') !important;
    background-size: cover;
    background-position: center center;
    padding:15px;
  }
  .input{
   width:60%;
  }
  .invalid-feedback{
    color: red;
    text-shadow: 1px 1px 2px #000;
    font-size: 20px;
  }
  .is-invalid{
    border: 2px solid red;
  }
  .form-group{
    margin-top:10px;
    min-height: 110px;
  }
  label{
    font-weight: bold;
    color:white;
    text-shadow: 2px 2px black;
  }
  h1, h2{
    font-weight: bold;
    color:white;
    text-shadow: 2px 2px black;
  }
  .register-submit{
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 1px;
    min-height: 50px;
    min-width: 250px;
  }
  `
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  validateUsername = (control: AbstractControl): ValidationErrors | null =>
    this.userService.checkUsername({ username: control.value })
      .pipe(
        map(
          (data) => {
            let res: string = (<any>data)?.username;
            if (res && res?.toLowerCase() === control.value?.toLowerCase()) {
              return { isTaken: true };
            } else {
              return null;
            }
          }
        ));

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(40)], this.validateUsername],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('user registered', data);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
