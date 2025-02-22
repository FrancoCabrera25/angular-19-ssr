import {
  Component,
  signal,
  HostBinding,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
  isDarkMode = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
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
