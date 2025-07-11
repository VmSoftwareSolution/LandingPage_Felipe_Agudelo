import { Component } from '@angular/core';
import Home from "../home/home";
import { Portfolio } from "../portfolio/portfolio";
import { Scroll } from "../../shared/scroll/scroll";
import { About } from '../about/about';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-landinpage',
  imports: [Home, Portfolio, Scroll, About , Contact],
  templateUrl: './landinpage.html',
  styleUrl: './landinpage.css'
})
export class Landinpage {

}
