import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-review-page',
  template: `
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image">
            <img src='{{ categoryItem?.image_path ? ("assets/img/" + categoryItem?.category_name?.toLowerCase() + "/" + categoryItem?.image_path) : "" }}' alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            
              <span class="mov-title"><strong>{{ categoryItem?.title }}</strong></span><br/>
              <span class="mov-genre"><small>{{ categoryItem?.genre }}</small></span><br/>
              <span class="mov-year"><small>{{ categoryItem?.year }}, <strong>{{ categoryItem?.author }}</strong></small></span><br/>
              <br>
              <span class="mov-desc"><strong>description:</strong></span><br/>
              <span class="mov-syn">{{ categoryItem?.description }}</span><br/>
              <br/>
              <span class="mov-len"><strong>length:</strong> {{ categoryItem?.length }}</span><br/>
          </div>
          
        </div>
      </article>
    </div>
    
    <ul class="review-list">
      <li *ngIf="isUserLoggedIn" class="new-review-container">
        <p>Leave a review!</p>
        <p>{{currentUser?.username}}:</p>
        <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()">
          <div class="form-group star-wrapper-input">
            <svg id="rating-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="url(#grad1)" class="star-yellow" viewBox="0 0 16 16">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:rgb(218,165,32);stop-opacity:1" />
                  <stop offset="20%" style="stop-color:rgb(218,165,32);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:rgb(241, 235, 173);stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <select class="form-control" formControlName="rating" name="rating" id="rating-select">
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div *ngIf="submitted && f.rating.errors" class="invalid-feedback">
              <div *ngIf="f.rating.errors?.required">Rating is required</div>
          </div>
          <div class="form-group review-text">
            <textarea id="new-review-text" formControlName="text" class="form-control is-warning is-focused" [ngClass]="{ 'is-invalid': submitted && f.text.errors }" placeholder="Enter Review here..." rows="4"></textarea>
          </div>
          <div *ngIf="submitted && f.text.errors" class="invalid-feedback">
              <div *ngIf="f.text.errors?.required">Review is required</div>
          </div>
          <div class="form-group">
              <button [disabled]="loading" class="button is-light review-submit">Submit Review</button>
              <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </div>
      </form>
      </li>
      <li *ngIf="!isUserLoggedIn" class="no-review-container">
        <p>You must login to leave a review.</p>
      </li>
      <ng-container *ngIf="reviewListCurrent.length === 0; then thenBlock else elseBlock"></ng-container>
      
      <ng-template #thenBlock>
        <li class="no-review-container">
          <p>No reviews yet!</p>
        </li>
      </ng-template>
      <ng-template #elseBlock>
        <li class="no-review-container">
          <p>Other reviews</p>
        </li>
      </ng-template>
      
      <li *ngFor="let review of reviewListCurrent; let i = index" class="review-container">
        <div class="username-rating-container">
          <div class="star-wrapper">
            <svg *ngFor="let i of [].constructor(reviewRating(i))" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="url(#grad1)" class="star-yellow" viewBox="0 0 16 16">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:rgb(218,165,32);stop-opacity:1" />
                  <stop offset="20%" style="stop-color:rgb(218,165,32);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:rgb(241, 235, 173);stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg *ngFor="let i of [].constructor(5 - reviewRating(i))" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="star-grey" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div>
          <div class="username-wrapper"><p>{{ review.username }}: </p></div>
          <div *ngIf='reviewListCurrent[i]?.username === currentUser?.username || currentUser?.role === "admin"' class="trash-button" (click)="deleteReview(i)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="trash-icon bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </div>
        </div>
        <div class="review-text"><p>{{ review.text }}</p></div>
      </li>
    </ul>
  `,
  styles: [`
  .review-list{
    padding: 15px;
    background-color: #eee;
  }
  .review-container, .no-review-container, .new-review-container{
    padding: 15px;
    margin-bottom: 25px;
    box-shadow: 0px 3px 9px 2px #777;
    border: 3px solid #777;
    background-color: #444;
  }
  .no-review-container{
    background-color: #777;
    justify-content: center;
    text-align: center;
  }
  .no-review-container p{
    color: #fff;
    font-size: 18px;
  }
  #new-review-text{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #fff;
    background-color: transparent;
    resize: none;
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
  .review-text{
    border: 2px solid #777;
    padding: 15px;
    background-color: #333;
    box-shadow: 2px 2px 9px 2px #000 inset;
  }
  .new-review-container .review-text{
    padding: 8px;
    margin-top: 15px;
  }
  #new-review-text::placeholder{
    color: #aaa;
  }
  .new-review-container p{
    color: #fff;
    margin-bottom: 10px;
  }
  .review-text p{
    color: #ddd;
  }
  .username-wrapper p{
    color: #fff;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 3px #000;
    letter-spacing: 1px;
  }
  .star-wrapper, .star-wrapper-input{
    display: flex;
    align-items: center;
  }
  .star-wrapper-input{
    position: relative;
    border: 2px solid #999;
    max-width: 55px;
    justify-content: space-between;
  }
  #rating-select{
    background-color: transparent;
    color: #fff;
    font-size: 15px;
    border: none;
    outline: none;
    cursor: pointer;
    width: 100%;
    z-index: 1;
  }
  #rating-star{
    position: absolute;
    left: 15px;
    z-index: 0;
  }
  option{
    background-color: #222;
  }
  .review-submit{
    margin-top: 15px;
  }
  .invalid-feedback{
    color: red;
    text-shadow: 1px 1px 2px #000;
    font-size: 18px;
  }
  .is-invalid{
    border: 2px solid red;
  }
  .star-yellow, .star-grey{
    margin: 1px;
  }
  .star-yellow{
    -webkit-filter: drop-shadow( 0px 0px 3px rgba(251, 245, 183, 1));
    filter: drop-shadow( 0px 0px 3px rgba(251, 245, 183, 1));
  }
  .star-grey{
    color: #222;
    -webkit-filter: drop-shadow( 0px 0px 2px rgba(255, 255, 255, .8));
    filter: drop-shadow( 0px 0px 2px rgba(255, 255, 255, .8));
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
  .box{
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 20px 0 rgba(0, 0, 0, 0.19);
  }
  `
  ]
})
export class ReviewPageComponent implements OnInit {

  id: string = '';
  categoryItem: any;
  reviewList: any = [];
  currentUser: any;
  isUserLoggedIn: boolean = false;
  reviewForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private route: ActivatedRoute,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') !== null ? JSON.parse(<any>localStorage.getItem('currentUser')) : {};
    this.isUserLoggedIn = localStorage.getItem('currentUser') !== null ? true : false;
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params.id; // same as :username in route
    });
    // using id call the BE api and fetch data
    
    this.updateReviews();

      this.apiService.getTypeRequest('/categories/items/single/' + this.id).subscribe(
        (response: any) => {
          console.log(response?.length);
          if (response?.length !== undefined) {
            this.categoryItem = {...response[0]};
          }
        },
        error => {
          console.log(error);
          alert("There was an error while fetching data");
        },
        () => {
  
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.reviewForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }

    this.loading = true;


    this.apiService.postTypeRequest('/reviews/' + this.id, { user: this.currentUser, rating: this.f.rating.value, text: this.f.text.value }).subscribe(
      (response: any) => {
        console.log(response);
        this.reviewForm.reset();
        this.submitted = false;
        this.updateReviews();
      },
      error => {
        console.log(error);
        alert("There was an error while submitting your review");
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  get reviewID() {
    return this.id;
  }

  get reviewListCurrent() {
    return this.reviewList;
  }

  public reviewRating(i: number): number {
    return <number>(this.reviewList[i]?.rating);
  }

  public deleteReview(i: number): void {
    console.log('deleting: ', i);
    this.apiService.deleteTypeRequest('/reviews/delete/' + this.reviewListCurrent[i].id, {review: this.reviewListCurrent[i]}).subscribe(
      (response: any) => {
        console.log(response);
        this.updateReviews();
      },
      error => {
        console.log(error);
        alert("There was an error while deleting your review");
      },
      () => {

      });
  }

  updateReviews() {
    this.apiService.getTypeRequest('/reviews/' + this.id).subscribe(
      (response: any) => {
        console.log(response?.length);
        if (response?.length !== undefined) {
          this.reviewList = [...response];
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
