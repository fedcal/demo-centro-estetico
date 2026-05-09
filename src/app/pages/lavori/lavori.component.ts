import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-lavori',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Gallery</h1>
        <p>Trattamenti, risultati e l'atmosfera di Aurea Beauty Studio. Foto placeholder — immagini reali su richiesta.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="gallery$ | async as data">
      <ul class="gallery-grid">
        <li *ngFor="let item of data.gallery" class="gallery-item" [attr.data-cat]="item.category">
          <div class="gallery-item__placeholder" [attr.aria-label]="item.caption">
            <span class="gallery-item__emoji" aria-hidden="true">{{ item.emoji }}</span>
          </div>
          <p class="gallery-item__caption">{{ item.caption }}</p>
        </li>
      </ul>

      <p class="disclaimer">
        Le immagini placeholder vengono sostituite con un servizio fotografico professionale dello studio,
        dei trattamenti e del team Aurea. Costo medio fotografo beauty/interior Milano: €400-700 per servizio completo.
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
      .content {
        padding: 3rem 1rem;
      }
      .gallery-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
      }
      .gallery-item {
        text-align: center;
      }
      .gallery-item__placeholder {
        aspect-ratio: 4 / 3;
        background: linear-gradient(135deg, #fdf2f8, #fce7f3);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        margin-bottom: 0.5rem;
        border: 1px solid #fbcfe8;
      }
      .gallery-item__caption {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .disclaimer {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 3rem auto 0;
        max-width: 720px;
        padding: 1rem;
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-md);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LavoriComponent {
  private readonly mockData = inject(MockDataService);

  readonly gallery$ = this.mockData.gallery$;
}
