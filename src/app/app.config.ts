import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { withFetch, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServerRouting } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({
      scrollPositionRestoration: 'enabled'
    })),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideServerRouting(serverRoutes),
    provideHttpClient(withFetch()),
    provideAnimations()
  ],
};
