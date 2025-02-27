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
import { DecimalPipe, NgClass } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { CountriesService } from '../../core/countries.service';
import { Country } from '../../shared/interface/country.interface';
import { SearchComponent } from '../../shared/search/search.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { RestoreScrollPositionDirective } from '../../shared/directive/restore-scroll-position.directive';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DecimalPipe,
    SkeletonModule,
    SearchComponent,
    RouterModule,
    NgOptimizedImage,
    RestoreScrollPositionDirective,
    ToggleSwitchModule,
    NgClass,
    FormsModule,
  ],
  templateUrl: './country.component.html',
})
export default class CountryComponent {
  title = 'app';
  isDarkMode = signal(false);
  countries = signal<Country[]>([]);
  countryName = signal('');
  checked = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private countriesService: CountriesService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode.set(localStorage.getItem('theme') === 'dark');
      this.toggleTheme(this.isDarkMode());
    }
  }

  countriesResource = rxResource({
    request: () => ({ name: this.countryName() }),
    loader: ({ request }) =>
      request.name
        ? this.countriesService.searchCountriesByName(request.name)
        : this.countriesService.getCountries(),
  });

  onSearch(searchTerm: string) {
    this.countryName.set(searchTerm);
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
