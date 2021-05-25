import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ReportComponent } from './report/report.component';
//import { LoginComponent } from './auth/components/login/login.component';
//import { RegisterComponent } from './auth/components/register/register.component';
import { AuthModule } from './auth/auth/auth.module';
import { CategoryComponent } from './category/category.component';
import { ReviewPageComponent } from './review-page/review-page.component';//automatski dodano
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './_directives';
import { AlertService, AuthService, UserService } from './services';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({ //dekorator kojim dodajemo metadata u class (appmodule dolje)
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ReportComponent,
    CategoryComponent,
    ReviewPageComponent,
    UsersPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [
    AlertService,
    AuthService,
    UserService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
