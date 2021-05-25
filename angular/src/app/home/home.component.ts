import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        IF YOU ASK ME...
      </h1>
      <h2 class="subtitle">
        Welcome{{currentUser?.username ? (", " + currentUser?.username) : ""}}!
      </h2>
    </div>
  </div>
</section>
  `,
  styles: [`
  .hero {
    background-image: url('assets/img/main/main2.jpg');
    background-size: cover;
    background-position:center center;
  }
  .title{
    color: black;
    font-weight: bold;
    text-shadow: 2px 1px grey;
  }
  `]
})
export class HomeComponent implements OnInit {

  currentUser: any;

  constructor() { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') !== null ? JSON.parse(<any>localStorage.getItem('currentUser')) : {};
  }

}
