import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoAttivita, Listino, Team, Gallery, Faq } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoAttivita> = this.http
    .get<InfoAttivita>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly listino$: Observable<Listino> = this.http
    .get<Listino>('/assets/mock/listino.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<Team> = this.http
    .get<Team>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly gallery$: Observable<Gallery> = this.http
    .get<Gallery>('/assets/mock/gallery.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<Faq> = this.http
    .get<Faq>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
