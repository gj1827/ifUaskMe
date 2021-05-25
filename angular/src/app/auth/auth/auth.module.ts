import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService, AuthService, UserService } from 'src/app/services';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AlertService,
    AuthService,
    UserService,
  ]
})
export class AuthModule { }
