import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { CategoryComponent } from './category/category.component';
import { ReportComponent } from './report/report.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "report",
    component: ReportComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "category/:category_name",
    component: CategoryComponent
  },
  {
    path: "category/movies/:id",
    component: ReviewPageComponent
  },
  {
    path: "category/books/:id",
    component: ReviewPageComponent
  },
  {
    path: "category/music/:id",
    component: ReviewPageComponent
  },
  {
    path: "users",
    component: UsersPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
