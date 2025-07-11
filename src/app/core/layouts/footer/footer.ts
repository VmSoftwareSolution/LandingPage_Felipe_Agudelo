import { 
  Component,
  OnInit,
  PLATFORM_ID,
  inject 
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit {
  private platformId = inject(PLATFORM_ID);
    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        AOS.init();
      }
    }
}
