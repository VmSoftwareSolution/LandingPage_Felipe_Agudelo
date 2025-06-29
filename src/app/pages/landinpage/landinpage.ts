import { Component } from '@angular/core';
import Home from "../home/home";
import { Portfolio } from "../portfolio/portfolio";
import { Scroll } from "../../shared/scroll/scroll";

@Component({
  selector: 'app-landinpage',
  imports: [Home, Portfolio, Scroll],
  templateUrl: './landinpage.html',
  styleUrl: './landinpage.css'
})
export class Landinpage {

}
