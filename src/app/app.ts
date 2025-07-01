import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/layouts/navbar/navbar';
import { Mouse } from "./shared/mouse/mouse";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Mouse],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true
})
export class App {
  protected title = 'landingPage';
}
