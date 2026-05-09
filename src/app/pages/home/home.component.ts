import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Bellezza e benessere a Milano</h1>
        <p class="hero-tagline">Aurea Beauty Studio — Via Brera, dal 2015. 40 trattamenti, 5 estetiste specializzate.</p>
        <div class="hero-actions">
          <a routerLink="/trattamenti" class="btn btn-primary">Scopri i trattamenti</a>
          <a routerLink="/prenota" class="btn btn-secondary">Prenota ora</a>
        </div>
        <p class="hero-promo">Prima visita: <strong>-20%</strong> su tutti i trattamenti</p>
      </div>
    </section>

    <section class="stats demo-container">
      <ul class="stats-grid">
        <li class="stat-item">
          <span class="stat-number">40+</span>
          <span class="stat-label">Trattamenti</span>
        </li>
        <li class="stat-item">
          <span class="stat-number">5</span>
          <span class="stat-label">Estetiste specializzate</span>
        </li>
        <li class="stat-item">
          <span class="stat-number">9+</span>
          <span class="stat-label">Anni di esperienza</span>
        </li>
        <li class="stat-item">
          <span class="stat-number">1.200+</span>
          <span class="stat-label">Clienti soddisfatte</span>
        </li>
      </ul>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Aurea</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🌸</span>
          <h3>Trattamenti personalizzati</h3>
          <p>Ogni trattamento è adattato alla tua pelle e alle tue esigenze. Anamnesi gratuita alla prima visita.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔬</span>
          <h3>Tecnologie avanzate</h3>
          <p>Laser diodico 808nm, radiofrequenza, LED therapy, pressoterapia. Apparecchiature certificate CE.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎓</span>
          <h3>Estetiste certificate</h3>
          <p>CIDESCO, CIDESCO, Vodder, abilitazione laser. Aggiornamento professionale continuo.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎁</span>
          <h3>Gift card e pacchetti</h3>
          <p>Gift card da €25 senza scadenza. Pacchetti da 6 trattamenti con sconto 15%. Abbonamenti mensili.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredTrattamenti$ | async as trattamenti">
      <div class="section-header">
        <h2>I trattamenti più richiesti</h2>
        <a routerLink="/trattamenti" class="link-more">Tutto il listino →</a>
      </div>
      <ul class="trattamenti-grid">
        <li *ngFor="let t of trattamenti" class="trattamento-card">
          <div class="trattamento-card__head">
            <h3>{{ t.nome }}</h3>
            <span class="trattamento-card__price">{{ t.prezzo | currency: 'EUR' }}</span>
          </div>
          <p class="trattamento-card__desc">{{ t.descrizione }}</p>
          <p class="trattamento-card__meta">{{ t.durata }} min</p>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Prenota la tua esperienza di bellezza</h2>
        <p>Disponibili dal martedì al sabato. WhatsApp attivo 09:00 – 20:00.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prenota online</a>
          <a href="https://wa.me/393481234567" target="_blank" rel="noopener" class="btn btn-secondary">WhatsApp</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
      }
      .hero-promo {
        margin: 1.5rem 0 0;
        font-size: 0.95rem;
        color: var(--color-fg-muted);
        background: #fdf2f8;
        border: 1px solid #fbcfe8;
        border-radius: var(--radius-md);
        display: inline-block;
        padding: 0.4rem 1rem;
      }
      .hero-promo strong {
        color: var(--color-accent);
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #9d174d;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .stats {
        padding: 3rem 1rem;
        border-bottom: 1px solid var(--color-border);
      }
      .stats-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1.5rem;
        text-align: center;
      }
      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .stat-number {
        font-size: 2.25rem;
        font-weight: 700;
        color: var(--color-accent);
        line-height: 1;
      }
      .stat-label {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-default);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .trattamenti-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .trattamento-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .trattamento-card__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
      }
      .trattamento-card__head h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .trattamento-card__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
      }
      .trattamento-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }
      .trattamento-card__meta {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredTrattamenti$ = this.mockData.listino$.pipe(
    map((listino) => listino.trattamenti.filter((t) => t.featured).slice(0, 3))
  );
}
