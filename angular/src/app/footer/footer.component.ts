import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer class="footer ">
    <div class="container has-text-centered ">
     <!-- <a><img src="assets/icons/cinema/logo-final.png" width="65px" height="100px" ></a><br/><br/>-->
      
      <br/><br/>
      <p>ifU&#x2754;Me by Gabrijela & Danica </p>
      </div>
  </footer>
  `,
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
