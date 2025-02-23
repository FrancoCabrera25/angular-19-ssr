import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { CountriesService } from './core/countries.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'country/:code',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const countriesService = inject(CountriesService);
      const ids = await countriesService.getPrerenderParams();
      return ids.map(({code }) => ({ code }));
    },
  },
];
