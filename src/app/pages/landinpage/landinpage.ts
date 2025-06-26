import { Component } from '@angular/core';
import Home from "../home/home";
import { Portfolio } from "../portfolio/portfolio";

@Component({
  selector: 'app-landinpage',
  imports: [Home, Portfolio],
  templateUrl: './landinpage.html',
  styleUrl: './landinpage.css'
})
export class Landinpage {

}
