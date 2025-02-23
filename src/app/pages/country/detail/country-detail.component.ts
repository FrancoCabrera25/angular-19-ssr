import { Component, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../../shared/interface/country.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../../core/countries.service';
import { SkeletonModule } from 'primeng/skeleton';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink, SkeletonModule, NgOptimizedImage],
  template: `
    <div class="container mx-auto p-4">
      <p-button
        routerLink="/"
        icon="pi pi-arrow-left"
        label="Volver"
        class="w-fit mb-10"
      >
      </p-button>

      @if (countryResource.isLoading()) {
      <p-card class="mt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <p-skeleton height="300px" styleClass="mb-2"></p-skeleton>
          <div class="flex flex-col gap-4">
            <p-skeleton height="2rem" width="70%"></p-skeleton>
            <p-skeleton height="1.5rem" width="50%"></p-skeleton>
            <div class="grid grid-cols-2 gap-4">
              @for (_ of [1,2,3,4]; track $index) {
              <div>
                <p-skeleton height="1.5rem" width="60%"></p-skeleton>
                <p-skeleton height="1rem" width="40%"></p-skeleton>
              </div>
              }
            </div>
          </div>
        </div>
      </p-card>
      } @else if (countryResource.value()) {
      <p-card>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              [ngSrc]="countryResource.value()!.flags!.svg"
              [alt]="countryResource.value()?.flags?.alt || countryResource.value()?.name?.common"
              width="400" height="200"
              priority
              class="w-full rounded-lg shadow-lg"
            />
          </div>
          <div class="flex flex-col gap-4">
            <h1 class="text-3xl font-bold">{{ countryResource.value()?.name?.common }}</h1>
            <h2 class="text-xl text-gray-600">{{ countryResource.value()?.name?.official }}</h2>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold">Capital</h3>
                <p>{{ countryResource.value()?.capital?.[0] || 'N/A' }}</p>
              </div>
              <div>
                <h3 class="font-semibold">Región</h3>
                <p>{{ countryResource.value()?.region }}</p>
              </div>
              <div>
                <h3 class="font-semibold">Población</h3>
                <p>{{ countryResource.value()?.population | number }}</p>
              </div>
              <div>
                <h3 class="font-semibold">Área</h3>
                <p>{{ countryResource.value()?.area | number }} km²</p>
              </div>
            </div>

            @if (countryResource.value()?.languages) {
            <div>
              <h3 class="font-semibold">Idiomas</h3>
              <p>{{ languages() }}</p>
            </div>
            } @if (countryResource.value()?.currencies) {
            <div>
              <h3 class="font-semibold">Monedas</h3>
              <p>{{ currencies() }}</p>
            </div>
            } @if (countryResource.value()?.borders) {
            <div>
              <h3 class="font-semibold">Países limítrofes</h3>
              <div class="flex flex-wrap gap-2 mt-2">
                @for (border of countryResource.value()?.borders; track border) {
                <p-button
                  [routerLink]="['/country', border]"
                  styleClass="p-button-outlined p-button-sm"
                >
                  {{ border }}
                </p-button>
                }
              </div>
            </div>
            }
          </div>
        </div>
      </p-card>
      } @else {
      <p-card>
        <div class="text-center py-8">
          <i
            class="pi pi-exclamation-triangle text-4xl mb-4 text-yellow-500"
          ></i>
          <p class="text-xl">País no encontrado</p>
        </div>
      </p-card>
      }
    </div>
  `,
})
export default class CountryDetailComponent {
  private route = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);

  countryCode = signal<string>(this.route.snapshot.params['code']);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode() }),
    loader: ({ request }) =>
      this.countriesService.getCountryByCode(request.code),
  });

  languages = linkedSignal(() =>
    Object.values(this.countryResource.value()?.languages || {}).join(', ')
  );
  currencies = linkedSignal(() =>
    Object.values(this.countryResource.value()?.currencies || {})
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(', ')
  );
}
