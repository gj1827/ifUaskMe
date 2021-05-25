import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
  <section class="hero is-bold is-medium has-text-centered" id="about1">
  <div class="hero-body">
    <div class="container">
    <div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <p class="title">Zašto baš ovakav projekt?</p>
      <p>Cilj ovoga projekta je spojiti recenzije korisnika i službene najave, što bi omogućilo brže i efektivnije traženje sadržaja. </p>
    </div>
    <div class="tile is-child box">
      <p class="title">Koje tehnologije koristimo?</p>
      <p>U ovom projektu koristimo AngularJS za frontend i Express za backend.</p>
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title">Ukratko o projektu</p>
      <p>Motivacija za odabir ovog projekta dolazi iz želje sadržajima koji su svi na
      na jednom mjestu. Kada smo u potrazi za nekom knjigom ili filmom, uvijek je potrebno
      posjetiti više stranica i izvora kako bismo saznali sve što želimo o nekome filmu
      ili knjizi. Nekada jednostavno ocjena od 1 do 10 nije dovoljna kako bismo odlučili 
      vrijedi li nešto našega vremena. 
      
      Ogromna količina i raznolikost sadržaja koji se nalaze na internetu nam ponekada može
      izazvati osjećaj izgubljenosti i neodlučnosti, te se korisnici često nalaze u situaciji
      da satima pretražuju Internet, ne bi li pronašli nešto što odgovara njihovim ukusima.<br/> 
     Ova review stranica ima primarni cilj korisnicima pomoći u tome! Radila bi na način da 
     sakuplja recenzije o sadržajima i raspoređuje ih u odgovarajuće kategorije, da bi svi 
     mogli vidjeti što su ljudi koji su već pogledali, pročitali ili poslušali određeni sadržaj
      mislili o istome. <br/>Korisnici će na osnovu recenzija moći stvarati listu želja za gledanje
     ili čitanje i sve to će im biti dostupno na jednoj lokaciji kojoj će biti lako pristupiti.</p>
    </div>
  </div>
</div>
    </div>
  </div>
</section>

<section class="hero is-bold is-medium has-text-centered" id="about2">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        About the creators
      </h1>
      <div class="columns has-text-centered">
        <!--ovdje o nama-->
        <div class="column is-half-desktop is-pulled-left">
          <h1 id="p1" >Gabrijela</h1>
          <figure class="image ">
            <img src="assets/img/portrait/gabi.jpg">
          </figure>
          <div>Date of birth: <i>15.01.2000.</i><br>
            Faculty I am attending: <i>FSRE</i><br>
            Field of study: <i>Computer Science</i><br>
            </div>
        </div>
        <div class="column is-half-desktop is-pulled-right">
          <h1 id="p1">Danica</h1>
          <figure class="image ">
            <img src="assets/img/portrait/danica1.png">
          </figure>
          <div>Date of birth: <i>26.12.1999.</i><br>
          Faculty I am attending: <i>FSRE</i><br>
          Field of study: <i>Computer Science</i><br>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
  .tile{
    opacity: 0.9;
    
  }
  .image{
    margin:auto;
    height:178px;
    width:128px;
  }
  img{
    margin: auto;
    filter: brightness(130%);
    border-radius: 7px;
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .column{
    margin:1px;
    height:300px;
    
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.19);
  }
  .q{
    margin:5px;
    margin-left:35px;
  }
  #p1{
    font-weight:bold;
    font-size: 18px;
    text-shadow: 0.5px 1px gray;
  }
  #about1{
    background-image: url('assets/img/main/about3.jpg') !important;
    background-size: cover;
    background-position: center center;
  }
  .title{
    text-decoration: underline;
    text-shadow: 2px 1px gray;
    padding-bottom:30px;
  }
  .hero{
    margin: -45px;
  }
    `
  ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
