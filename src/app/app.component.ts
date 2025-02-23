import {
  Component,
  signal,
  HostBinding,
  PLATFORM_ID,
  Inject,
  OnInit,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { DecimalPipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { CountriesService } from './core/countries.service';
import { Country } from './shared/interface/country.interface';
import { SearchComponent } from './shared/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  title = 'app';
  isDarkMode = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private countriesService: CountriesService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode.set(localStorage.getItem('theme') === 'dark');
      this.toggleTheme(this.isDarkMode());
    }
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    this.toggleTheme(this.isDarkMode());
  }

  toggleTheme(darkMode: boolean) {
    const element = document.querySelector('html');

    if (darkMode) {
      element?.classList.add('my-app-dark');
    } else {
      element?.classList.remove('my-app-dark');
    }
  }
}
