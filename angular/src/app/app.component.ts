import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <alert></alert>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'ifUaskMe';
}
