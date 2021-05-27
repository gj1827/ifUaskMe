import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AlertService, UserService } from '../../../services';

@Component({
  selector: 'app-login',
  template: `
    
  <div class="content is-large has-text-centered">
  <h1>Log In</h1>
  <h2>Welcome back!</h2>
  
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="username">Username</label><br/>
        <input type="text" formControlName="username" class="form-control input has-text-centered is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.username.errors }" placeholder="Enter Username Here" />
        <div *ngIf="(submitted && f.username.errors) || f.username.errors?.isTaken" class="invalid-feedback">
            <div *ngIf="f.username.errors?.required">Username is required</div>
        </div>
    </div>
    <div class="form-group">
        <label for="password">Password</label><br/>
        <input type="password" formControlName="password" class="form-control input has-text-centered is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" placeholder="Enter Password Here" />
        <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
            <div *ngIf="f.password.errors.required">Password is required</div>
        </div>
    </div>
    <div class="form-group">
        <button [disabled]="loading" class="button is-light login-submit">Login</button>
        <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
    </div>
</form>
</div>
 `,
  styles: [`
 .content{
   background-image: url('assets/img/main/login3.jpg') !important;
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
 .login-submit{
   font-weight: bold;
   font-size: 20px;
   letter-spacing: 1px;
   min-height: 50px;
   min-width: 250px;
   background-color: #9fe8ff;
 }
 `
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data?.length > 0) {
            console.log('user logged in: ', data[0]);
            localStorage.setItem('currentUser', JSON.stringify(data[0]));
            //window.location.href = window.location.protocol + '//' + window.location.host + '/';
            window.location.hash = '#/login';
          }
          else {
            this.alertService.error('Username or password is incorrect');
            this.loading = false;
          }
        },
        (error:any) => {
          this.alertService.error(error?.message);
          this.loading = false;
        });
  }

}
