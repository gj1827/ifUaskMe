import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { ApiService } from '../services';

@Component({
  selector: 'app-movies',
  template: `<div id="full">
  <section class="hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        {{ category_name.charAt(0).toUpperCase() + category_name.substring(1) }}
      </h1>
      
    </div>
  </div>
</section>

<div *ngFor="let item of itemListCurrent; let i = index" class="box">
  <article class="media">
    <div class="media-left" (click)='linkTo( "/category/" + item?.category_name?.toLowerCase() + "/" + (itemListCurrent[i].id) )'>
      <figure class="image">
        <img src='{{ "assets/img/" + item?.category_name?.toLowerCase() + "/" + item?.image_path }}' alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        
          <span class="mov-title" (click)='linkTo( "/category/" + item?.category_name?.toLowerCase() + "/" + (itemListCurrent[i].id) )'><strong>{{ item?.title }}</strong></span><br/>
          <span class="mov-genre"><small>{{ item?.genre }}</small></span><br/>
          <span class="mov-year"><small>{{ item?.year }}</small></span><br/>
          <br>
          <span class="mov-syn">{{ item?.description }}</span>
      </div>
    </div>
  </article>
</div>

</div>
  `,
  styles: [`
  h1{
    color:white;
    font-size:40px;
    font-weight:bold;
    text-shadow: 5px 4px 10px grey;
  }
  .media-left{
    cursor: pointer;
  }
  .mov-title{
    text-shadow: 2px 2px 5px grey;
    cursor: pointer;
  }
  .mov-title a{
    color: black;
  }
  .image{
    height: 180px;
    width: 128px;
  }
  #full{
    background-color: #E5E5D4;
    padding-bottom:25px;
  }
  .box{
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 20px 0 rgba(0, 0, 0, 0.19);
  }`
  ]
})
export class CategoryComponent implements OnInit {

  category_name: string = '';
  itemList: any = [];

  constructor(
    private route: ActivatedRoute,
    public apiService: ApiService,
    private router: Router
  ) { 
    router.events
    .subscribe((event: any) => {
      if (event instanceof NavigationEnd && window.location.hash.startsWith("#/category/") && this.category_name) {
        this.apiService.getTypeRequest('/categories/items/name/' + this.category_name).subscribe(
          (response: any) => {
            console.log(response);
            if (response?.length !== undefined) {
              this.itemList = [...response];
            }
            console.log(this.itemList);
          },
          (error: any) => {
            console.log(error);
          },
          () => {
    
          });
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category_name = params.category_name; // same as :username in route
      // using category_name call the BE api and fetch data
      this.apiService.getTypeRequest('/categories/items/name/' + this.category_name).subscribe(
        (response: any) => {
          console.log(response);
          if (response?.length !== undefined) {
            this.itemList = [...response];
          }
          console.log(this.itemList);
        },
        (error: any) => {
          console.log(error);
        },
        () => {
  
        });
    });
  }

  get categoryName() {
    return this.category_name;
  }

  get itemListCurrent() {
    return this.itemList;
  }

  linkTo(link: string) {
    this.router.navigate([link],);
  }

}
