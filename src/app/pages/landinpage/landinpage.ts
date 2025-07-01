import { Component } from '@angular/core';
import Home from "../home/home";
import { Portfolio } from "../portfolio/portfolio";
import { Scroll } from "../../core/layouts/scroll/scroll";
import { About } from '../about/about';

@Component({
  selector: 'app-landinpage',
  imports: [Home, Portfolio, Scroll, About],
  templateUrl: './landinpage.html',
  styleUrl: './landinpage.css'
})
export class Landinpage {

}
