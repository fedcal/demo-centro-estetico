import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Trattamento } from '../../data/types';

interface ListinoView {
  categorie: { id: string; nome: string; trattamenti: Trattamento[] }[];
}

@Component({
  selector: 'app-trattamenti',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri trattamenti</h1>
        <p>40 trattamenti professionali — viso, corpo, depilazione, mani e piedi, rituali spa</p>
      </div>
    </section>

    <article class="demo-container" *ngIf="view$ | async as view">
      <section *ngFor="let cat of view.categorie" class="listino-category" [id]="cat.id">
        <h2>{{ cat.nome }}</h2>
        <ul class="trattamenti-list">
          <li *ngFor="let t of cat.trattamenti" class="trattamento-item">
            <div class="trattamento-item__head">
              <h3>{{ t.nome }}</h3>
              <span class="trattamento-item__price">{{ t.prezzo | currency: 'EUR' }}</span>
            </div>
            <p class="trattamento-item__desc">{{ t.descrizione }}</p>
            <p class="trattamento-item__meta">Durata: {{ t.durata }} min</p>
          </li>
        </ul>
      </section>

      <p class="disclaimer">
        I prezzi sono indicativi e possono variare in base alla valutazione personalizzata. Prima visita: sconto 20%.
        Per allergie o condizioni particolari, indica sempre tutto al momento della prenotazione.
      </p>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: linear-gradient(180deg, #fdf2f8 0%, var(--color-bg-subtle) 100%);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .listino-category {
        padding: 3rem 1rem 1.5rem;
      }
      .listino-category h2 {
        font-size: 1.5rem;
        margin: 0 0 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .trattamenti-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .trattamento-item {
        padding: 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .trattamento-item__head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 0.5rem;
      }
      .trattamento-item__head h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .trattamento-item__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
      }
      .trattamento-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }
      .trattamento-item__meta {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0;
      }
      .disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 3rem 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrattamentiComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.listino$.pipe(
    map((listino) => ({
      categorie: listino.categorie
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat) => ({
          id: cat.id,
          nome: cat.nome,
          trattamenti: listino.trattamenti.filter((t) => t.categoria === cat.id)
        }))
    } as ListinoView))
  );
}
