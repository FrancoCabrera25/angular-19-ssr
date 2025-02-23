import { Component, signal, output, EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputTextModule, CommonModule, FormsModule],
  template: `
    <div class="flex justify-center mb-4">
      <span class="p-input-icon-left w-full md:w-1/2">
        <i class="pi pi-search"></i>
        <input
          type="text"
          pInputText
          class="w-full"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearch($event)"
          placeholder="Buscar país..." />
      </span>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
  `]
})
export class SearchComponent {
  private searchSubject = new Subject<string>();
  searchTerm = '';
  searchChange = output<string>();

  constructor() {
    this.setupSearch();
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 3 || term.length === 0),
    ).subscribe(term => {
      this.searchChange.emit(term);
    });
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }
}
