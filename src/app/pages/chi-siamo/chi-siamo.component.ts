import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Un team di 5 estetiste appassionate — bellezza autentica dal 2015.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Aurea Beauty Studio</h2>
        <p>
          Valentina Greco fonda Aurea nel 2015 nel cuore di Milano, in via Brera, con una convinzione chiara:
          la bellezza nasce dal benessere autentico. Non dal rituale veloce, ma dalla cura personalizzata,
          dall'ascolto, dalla competenza tecnica applicata alla persona specifica che si ha davanti.
        </p>
        <p>
          Oggi il team di Aurea conta 5 professioniste con specializzazioni diverse: trattamenti anti-age,
          depilazione laser avanzata, nail art, massaggi terapeutici e rituali spa. Ogni estetista si aggiorna
          costantemente e segue corsi di certificazione internazionale.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Personalizzazione</h3>
            <p>Ogni cliente riceve una scheda individuale. I trattamenti si adattano alla pelle, non il contrario.</p>
          </li>
          <li>
            <h3>Competenza tecnica</h3>
            <p>Certificazioni CIDESCO, abilitazioni laser CE, Vodder per drenaggio. La formazione è continua.</p>
          </li>
          <li>
            <h3>Prodotti selezionati</h3>
            <p>Solo cosmetici dermatologicamente testati, cruelty-free dove possibile, professionali certificati.</p>
          </li>
          <li>
            <h3>Riservatezza e comfort</h3>
            <p>Cabine private, ambiente rilassante, rispetto totale per lo spazio personale di ogni cliente.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as team">
        <h2>Il team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of team.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__spec">{{ m.specializzazione }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__certs">
              <li *ngFor="let c of m.certificazioni">{{ c }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq-section" *ngIf="faq$ | async as faq">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faq.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 4rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.25rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__spec {
        margin: 0 0 0.75rem;
        font-size: 0.85rem;
        font-style: italic;
        color: var(--color-fg-muted);
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__certs {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__certs li {
        font-size: 0.7rem;
        background: #fdf2f8;
        color: var(--color-accent);
        border: 1px solid #fbcfe8;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
      }
      .faq-section h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 1.25rem;
      }
      .faq-item {
        padding: 1.25rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
