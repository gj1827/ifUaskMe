import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services';

@Component({
  selector: 'app-report',
  template: `
  <div class="container">
    <h1>Report an issue</h1>
    <div *ngIf="isUserLoggedIn">
      <div *ngIf='currentUser?.role === "user"'>
        <p>If you're having trouble with your home page or news feed, you've come to the right place. Please use this form to tell us about the issue you're experiencing.</p>
        <br/>


        <form [formGroup]="issueForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="message">Message</label><br/>
            <textarea name="message" id="messageID" class="textarea is-medium form-control is-warning is-focused" formControlName="message" [ngClass]="{ 'is-invalid': submitted && f.message.errors }" placeholder="Enter Your Message Here"></textarea>
            <div *ngIf="submitted && f.message.errors" class="invalid-feedback">
                <div *ngIf="f.message.errors?.required">Message is required</div>
            </div>
          </div> 
            <div class="field">
              <button type="submit" class="button is-large is-dark">
              Send! </button>
            </div>
        </form>
      </div>
      <div *ngIf='currentUser?.role === "admin"'>
      <ul class="review-list">
        <li class="issues-header-container">
          <p>Issues</p>
        </li>
        <li *ngFor="let review of issueListCurrent; let i = index" class="issues-container">
          <div class="username-rating-container">
            <div class="username-wrapper">
              <p>{{ review.username }} says: </p>
            </div>
            <div *ngIf='issueListCurrent[i]?.username === currentUser?.username || currentUser?.role === "admin"' class="trash-button" (click)="deleteReview(i)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="trash-icon bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </div>
          </div>
          <div class="message-text"><p>{{ review.text }}</p></div>
        </li>
      </ul>
      </div>
    </div>
    <p *ngIf="!isUserLoggedIn">You must <a routerLink="/login">login</a> to report an issue.</p>
    <br/>
  </div>
  `,
  styles: [`
  .input{
    width:40%;
    height: 35px;
  }
  .container{
    margin-top:30px;
    background-image: url('assets/img/main/problem1.jpg');
    background-size: cover;
    background-position: center center;
    padding:35px;
    width:100%;
    border:black solid 2px;
    border-radius:5px;
    min-height: 300px;
  }
  .review-list{
    padding: 15px;
    background-color: #eee;
  }
  .issues-container, .issues-header-container, .new-issues-container{
    padding: 15px;
    margin-bottom: 25px;
    box-shadow: 0px 3px 9px 2px #777;
    border: 3px solid #777;
    background-color: #5a5a5a;
  }
  .issues-header-container{
    background-color: #777;
    justify-content: center;
    text-align: center;
  }
  .issues-header-container p{
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
  }
  .message-text{
    border: 2px solid #777;
    padding: 15px;
    background-color: #ddd;
  }
  .message-text p{
    color: #222;
    font-weight: normal;
  }
  .username-wrapper p{
    color: #fff;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 3px #000;
    letter-spacing: 1px;
  }
  h1{
    font-size:25px;
    font-weight:bold;
    margin-bottom:15px;
    text-shadow: 2px 2px grey;
  }
  h1, p, label{
    font-weight:bolder;
    color:black;
  }
  .trash-icon{
    fill: #bbb;
  }
  .trash-button{
    display: flex;
    position: absolute;
    right: 0;
    justify-content: center;
    align-items: center;
    border: 2px solid #999;
    padding: 5px;
    border-radius: 5px;
  }
  .trash-button:hover{
    border: 2px solid #fff;
    cursor:pointer;
  }
  .trash-button:hover .trash-icon{
    fill: #fff;
  }
  .button{
    margin-top:30px;
  }
  .invalid-feedback{
    color: red;
    text-shadow: 1px 1px 2px #000;
    font-size: 18px;
  }
  .is-invalid{
    border: 2px solid red;
  }
  `
  ]
})
export class ReportComponent implements OnInit {

  currentUser: any;
  isUserLoggedIn: boolean = false;
  issueForm!: FormGroup;
  issueList: any = [];
  loading = false;
  submitted = false;

  constructor(
    public apiService: ApiService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') !== null ? JSON.parse(<any>localStorage.getItem('currentUser')) : {};
    this.isUserLoggedIn = localStorage.getItem('currentUser') !== null ? true : false;

    this.issueForm = this.formBuilder.group({
      message: ['', Validators.required]
    });

    this.updateIssues();
  }
  // convenience getter for easy access to form fields
  get f() { return this.issueForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.issueForm.invalid) {
      console.log('invalid');
      return;
    }

    this.loading = true;

    this.apiService.postTypeRequest('/issues', { user: this.currentUser, text: this.f.message.value }).subscribe(
      (response: any) => {
        console.log(response);
        window.location.reload();
      },
      error => {
        console.log(error);
        alert("There was an error while submitting your issue");
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  get issueListCurrent() {
    return this.issueList;
  }

  public deleteReview(i: number): void {
    console.log('deleting: ', i);
    this.apiService.deleteTypeRequest('/issues/delete/' + this.issueListCurrent[i].id, {issue: this.issueListCurrent[i]}).subscribe(
      (response: any) => {
        console.log(response);
        this.updateIssues();
      },
      error => {
        console.log(error);
        alert("There was an error while deleting your issue");
      },
      () => {

      });
  }

  updateIssues() {
    this.apiService.getTypeRequest('/issues').subscribe(
      (response: any) => {
        console.log(response);
        if (response?.length !== undefined) {
          this.issueList = [...response];
        }
        this.loading = false;
      },
      error => {
        console.log(error);
        alert("There was an error while fetching data");
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

}
