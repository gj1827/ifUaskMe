import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-page',
  template: `
    <ul class="user-list">
      
      <ng-container *ngIf="userListCurrent.length === 0; then thenBlock else elseBlock"></ng-container>
      
      <ng-template #thenBlock>
        <li class="no-users-container">
          <p>No users found</p>
        </li>
      </ng-template>
      <ng-template #elseBlock>
        <li class="no-users-container">
          <p>Users</p>
        </li>
      </ng-template>
      
      <li *ngFor="let user of userListCurrent; let i = index" class="user-container">
        <div class="username-rating-container">
          <div class="username-wrapper">
            <p>{{ user.username }}</p>
            <svg *ngIf='user?.role === "admin"' xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="admin-icon bi bi-shield-check" viewBox="0 0 16 16">
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            <svg *ngIf='user?.username === currentUser?.username' xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="user-icon" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>
          <div *ngIf='userListCurrent[i]?.username !== currentUser?.username && userListCurrent[i]?.role !== "admin"' class="promote-button" (click)="promoteUser(i)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="promote-icon bi bi-shield-check" viewBox="0 0 16 16">
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <div *ngIf='userListCurrent[i]?.username !== currentUser?.username && userListCurrent[i]?.role !== "admin"' class="trash-button" (click)="deleteUser(i)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="trash-icon bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </div>
        </div>
        <div class="user-info">
            <div class="user-info-text">
                <p><strong>First Name:  </strong>{{ user.first_name }}</p>
                <p><strong>Last Name:  </strong>{{ user.last_name }}</p>
            </div>
            <div class="user-info-text">
                <p><strong>Username: </strong>{{ user.username }}</p>
                <p><strong>E-mail: </strong>{{ user.email }}</p>
            </div>
        </div>
      </li>
    </ul>
  `,
  styles: [`
  .user-list{
    padding: 15px;
    background-color: #eee;
  }
  .user-container, .no-users-container{
    padding: 15px;
    margin-bottom: 25px;
    box-shadow: 0px 3px 9px 2px #777;
    border: 3px solid #777;
    background-color: #444;
  }
  .no-users-container{
    background-color: #777;
    justify-content: center;
    text-align: center;
  }
  .no-users-container p{
    color: #fff;
    font-size: 18px;
  }
  .username-rating-container{
    display: flex;
    position: relative;
    height: 100%;
    align-items: center;
    margin-bottom: 10px;
  }
  .username-wrapper{
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  .user-info{
      display: flex;
      width: 100%;
      justify-content: space-between;
  }
  .user-info-text{
    border: 2px solid #777;
    padding: 15px;
    background-color: #333;
    box-shadow: 2px 2px 9px 2px #000 inset;
    width: 48%;
  }
  .user-info-text p{
    color: #ddd;
    text-align: left;
    border-bottom: 1px solid #555;
    display: flex;
    min-width: fit-content;
    width: 100%;
    justify-content: space-between;
  }
  .user-info-text strong{
    color: #ddd;
    text-align: left;
  }
  .username-wrapper p{
    color: #fff;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 3px #000;
    letter-spacing: 1px;
  }
  .trash-icon, .promote-icon{
    fill: #bbb;
  }
  .trash-button, .promote-button{
    display: flex;
    position: absolute;
    right: 0;
    justify-content: center;
    align-items: center;
    border: 2px solid #999;
    padding: 5px;
    border-radius: 5px;
  }
  .promote-button{
    right: 36px;
  }
  .trash-button:hover, .promote-button:hover{
    border: 2px solid #fff;
    cursor:pointer;
  }
  .trash-button:hover .trash-icon, .promote-button:hover .promote-icon{
    fill: #fff;
  }
  h1{
    color:white;
    font-size:40px;
    font-weight:bold;
    text-shadow: 5px 4px 10px grey;
  }
  .mov-title{
    text-shadow: 2px 2px 5px grey;
  }
  .mov-title a{
    color: black;
  }
  .image{
    height: 234px;
    width: 168px;
  }
  #full{
    background-color: #E5E5D4;
    padding-bottom:25px;
  }
  .admin-icon{
    width: 18px;
    height: 18px;
    margin-right: 3px;
    margin-left: 3px;
    fill: #fff;
  }
  .user-icon{
    width: 18px;
    height: 18px;
    margin-right: 3px;
    fill: #fff;
  }
  @media screen and (max-width: 800px) {
    .user-info{
        flex-direction: column;
    }
    .user-info-text{
      width: 100%;
    }
  }
  `
  ]
})
export class UsersPageComponent implements OnInit {

  userList: any = [];
  currentUser: any;
  isUserLoggedIn: boolean = false;

  constructor(private router: Router,
    public apiService: ApiService,) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') !== null ? JSON.parse(<any>localStorage.getItem('currentUser')) : {};
    this.isUserLoggedIn = localStorage.getItem('currentUser') !== null ? true : false;
    if(this.currentUser?.role !== "admin"){
        alert("You do not have access to that page.");
        this.router.navigate(["/"]);
    }
    // using id call the BE api and fetch data
    
    this.updateUsers();

  }

  // convenience getter for easy access to form fields

  get userListCurrent() {
    return this.userList;
  }

  public deleteUser(i: number): void {
    console.log('deleting: ', i);
    this.apiService.deleteTypeRequest('/users/delete/' + this.userListCurrent[i].id, {user: this.userListCurrent[i]}).subscribe(
      (response: any) => {
        console.log(response);
        this.updateUsers();
      },
      error => {
        console.log(error);
        alert("There was an error while deleting the user");
      },
      () => {

      });
  }

  public promoteUser(i: number): void {
    console.log('deleting: ', i);
    this.apiService.putTypeRequest('/users/admin/' + this.userListCurrent[i].id, {user: this.userListCurrent[i]}).subscribe(
      (response: any) => {
        console.log(response);
        this.updateUsers();
      },
      error => {
        console.log(error);
        alert("There was an error while deleting the user");
      },
      () => {

      });
  }

  updateUsers() {
    this.apiService.getTypeRequest('/users').subscribe(
      (response: any) => {
        console.log(response);
        if (response?.length !== undefined) {
          this.userList = [...response];
        }
      },
      error => {
        console.log(error);
        alert("There was an error while fetching data");
      },
      () => {

      });
  }

}