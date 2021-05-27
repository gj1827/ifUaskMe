import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
      <img src="assets/icons/cinema/popcorn.png">
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" routerLink="/">
        Home
      </a>

      <a class="navbar-item" routerLink="/about">
        About Us
      </a>

      <a *ngIf='currentUser?.role === "admin"' class="navbar-item" routerLink="/users">
        Users
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" routerLink="/category/movies">
          <img src="assets/icons/content/video-camera.png">&nbsp;&nbsp;&nbsp;Movies
          </a>
          <a class="navbar-item" routerLink="/category/books">
          <img src="assets/icons/content/book1.png">&nbsp;&nbsp;&nbsp;Books
          </a>
          <a class="navbar-item" routerLink="/category/music">
          <img src="assets/icons/content/headphone.png">&nbsp;&nbsp;&nbsp;Music
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" routerLink="/report">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div *ngIf="!isUserLoggedIn" class="buttons">
          <a class="button is-link" id="button1" routerLink="/register">
            <strong >Register</strong>
          </a>
          <a class="button is-light" (click)="reloadRedirect('login')" routerLink="/login">
            Log in
          </a>
        </div>
        <div *ngIf="isUserLoggedIn" class="buttons">
          <a class="button is-user" id="button1">
            <svg *ngIf='currentUser?.role === "admin"' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="admin-icon bi bi-shield-check" viewBox="0 0 16 16">
              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
              <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            <strong >
              {{currentUser?.username}}
            </strong>
          </a>
          <a class="button is-light" (click)="reloadRedirect('login')" routerLink="/login">
            Log out
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
  `,
  styles: [
    `
    .is-user{
      background-color: transparent;
      color: #fff;
      border: 2px solid #fff;
    }
    .admin-icon{
      width: 18px;
      height: 18px;
      margin-right: 3px;
    }
    @media screen and (max-width: 1023px) {
      .is-user{
        color: #222;
        border: 2px solid #222;
      }
    }
    `
  ]
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  isUserLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {

      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
    
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
          el.addEventListener('click', () => {
    
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
    
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target?.classList.toggle('is-active');
    
          });
        });
      }
    
    });

    this.currentUser = localStorage.getItem('currentUser') !== null ? JSON.parse(<any>localStorage.getItem('currentUser')) : {};
    this.isUserLoggedIn = localStorage.getItem('currentUser') !== null ? true : false;
    console.log('current user: ', JSON.parse(<any>localStorage.getItem('currentUser')));
  }

  reloadRedirect(link: string) {
    window.location.hash = '#/' + link;
    window.location.reload();
  }

}
