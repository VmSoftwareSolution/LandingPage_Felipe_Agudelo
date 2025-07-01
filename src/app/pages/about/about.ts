import { 
  Component,
  OnInit,
  PLATFORM_ID,
  inject 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';


@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})

export class About implements OnInit{
   private platformId = inject(PLATFORM_ID);
   ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
}

