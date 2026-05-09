import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, combineLatest } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-prenota',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota un trattamento</h1>
        <p>Compila il form oppure contattaci via WhatsApp. Rispondiamo entro 30 minuti.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="vm$ | async as vm">
      <div class="prenota-grid">
        <section class="info-block">
          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + vm.info.contatti.telefono">{{ vm.info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(vm.info.contatti.whatsapp)" target="_blank" rel="noopener">{{ vm.info.contatti.whatsapp }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + vm.info.contatti.email">{{ vm.info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Dove siamo</h2>
          <address class="address-block">
            {{ vm.info.indirizzo.via }}<br>
            {{ vm.info.indirizzo.cap }} {{ vm.info.indirizzo.citta }} ({{ vm.info.indirizzo.provincia }})<br>
            {{ vm.info.indirizzo.regione }}
          </address>
          <p class="address-note">{{ vm.info.servizi.parcheggioPubblico }}</p>

          <h2>Orari</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ vm.info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ vm.info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ vm.info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ vm.info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ vm.info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ vm.info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ vm.info.orari.domenica }}</span></li>
          </ul>

          <div class="promo-box">
            <strong>Prima visita: -{{ vm.info.servizi.scontoPercentuale }}%</strong>
            <span> su tutti i trattamenti</span>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiesta di appuntamento</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input id="nome" type="text" formControlName="nome" required autocomplete="name" />
              <span class="field-error" *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">
                Inserisci il tuo nome (min. 2 caratteri)
              </span>
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" required autocomplete="email" />
              <span class="field-error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
                Inserisci un indirizzo email valido
              </span>
            </div>
            <div class="field">
              <label for="telefono">Telefono *</label>
              <input id="telefono" type="tel" formControlName="telefono" required autocomplete="tel" />
              <span class="field-error" *ngIf="form.get('telefono')?.invalid && form.get('telefono')?.touched">
                Inserisci un numero di telefono valido
              </span>
            </div>
            <div class="field">
              <label for="servizio">Servizio richiesto *</label>
              <select id="servizio" formControlName="servizio" required>
                <option value="">— Scegli un trattamento —</option>
                <optgroup *ngFor="let cat of vm.categorie" [label]="cat.nome">
                  <option *ngFor="let t of cat.trattamenti" [value]="t.id">
                    {{ t.nome }} — {{ t.prezzo }}€ ({{ t.durata }} min)
                  </option>
                </optgroup>
              </select>
              <span class="field-error" *ngIf="form.get('servizio')?.invalid && form.get('servizio')?.touched">
                Seleziona un trattamento
              </span>
            </div>
            <div class="field">
              <label for="estetista">Estetista preferita (opzionale)</label>
              <select id="estetista" formControlName="estetista">
                <option value="">— Nessuna preferenza —</option>
                <option *ngFor="let m of vm.team" [value]="m.id">{{ m.nome }} — {{ m.specializzazione }}</option>
              </select>
            </div>
            <div class="row">
              <div class="field">
                <label for="data">Data preferita *</label>
                <input id="data" type="date" formControlName="data" required [min]="minDate" />
                <span class="field-error" *ngIf="form.get('data')?.invalid && form.get('data')?.touched">
                  Seleziona una data
                </span>
              </div>
              <div class="field">
                <label for="ora">Orario preferito *</label>
                <select id="ora" formControlName="ora" required>
                  <option value="">— Orario —</option>
                  <option *ngFor="let slot of timeSlots" [value]="slot">{{ slot }}</option>
                </select>
                <span class="field-error" *ngIf="form.get('ora')?.invalid && form.get('ora')?.touched">
                  Seleziona un orario
                </span>
              </div>
            </div>
            <div class="field">
              <label for="note">Note (allergie, condizioni particolari, gravidanza)</label>
              <textarea id="note" formControlName="note" rows="3" placeholder="Indica eventuali allergie, pelle sensibile, gravidanza o altre note utili"></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la <a href="#" target="_blank">privacy policy</a> e il trattamento dei dati personali ai sensi del
                Reg. UE 2016/679 (GDPR) per la gestione della prenotazione. *
              </label>
            </div>
            <span class="field-error checkbox-error" *ngIf="form.get('privacy')?.invalid && form.get('privacy')?.touched">
              Devi accettare la privacy policy per procedere
            </span>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna prenotazione è realmente inviata. In un sito reale riceveresti
              conferma via email e SMS. Per prenotare contatta il numero indicato.
            </p>
          </form>
          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">🌸</span>
              <h3>Grazie {{ form.value['nome'] }}!</h3>
              <p>
                La tua richiesta per il {{ form.value['data'] }} alle {{ form.value['ora'] }} è stata simulata.
              </p>
              <p>In un sito reale riceveresti conferma email e promemoria SMS 24h prima.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .prenota-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.2rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
      }
      .address-block {
        font-style: normal;
        line-height: 1.7;
        color: var(--color-fg-default);
        margin-bottom: 0.25rem;
      }
      .address-note {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .promo-box {
        background: #fdf2f8;
        border: 1px solid #fbcfe8;
        border-radius: var(--radius-md);
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
        color: var(--color-accent);
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1.25rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field-error {
        font-size: 0.78rem;
        color: var(--color-danger);
        margin-top: 0.2rem;
      }
      .checkbox-error {
        margin-bottom: 0.75rem;
        display: block;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
        text-align: center;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        text-align: center;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-accent);
        margin: 0 0 1rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrenotaComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly submitted = signal(false);

  readonly minDate = new Date().toISOString().split('T')[0] as string;

  readonly timeSlots: readonly string[] = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  readonly vm$ = combineLatest({
    info: this.mockData.info$,
    team: this.mockData.team$.pipe(map((t) => t.team)),
    categorie: this.mockData.listino$.pipe(
      map((listino) =>
        listino.categorie
          .sort((a, b) => a.ordine - b.ordine)
          .map((cat) => ({
            id: cat.id,
            nome: cat.nome,
            trattamenti: listino.trattamenti.filter((t) => t.categoria === cat.id)
          }))
      )
    )
  });

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    servizio: ['', Validators.required],
    estetista: [''],
    data: ['', Validators.required],
    ora: ['', Validators.required],
    note: [''],
    privacy: [false, Validators.requiredTrue]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    } else {
      this.form.markAllAsTouched();
    }
  }

  reset(): void {
    this.form.reset({ estetista: '', privacy: false });
    this.submitted.set(false);
  }
}
