# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Centro Estetico'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## Possibili sviluppi customizzabili

Oltre ai Tier standard, il template Centro Estetico supporta queste integrazioni:

1. **Before-After AI gallery**: LLaVA detecta volti, share automatico Instagram, watermark client protection
2. **Skin analysis AI**: Cliente carica foto viso → AI detect pori/rughe/inestetismi, suggerisce trattamenti
3. **Chatbot beauty advisor**: LLM locale (qwen2.5:14b) consiglia routine skincare personalizzate
4. **E-commerce skincare**: Vendita prodotti integrata con provvigioni operatore
5. **Gift card digital**: Generazione PDF, tracking validity, redemption QR code
6. **App mobile**: iOS/Android con loyalty card, agenda offline, push reminder
7. **Analytics dashboard**: Revenue per operatore, churn rate, cliente più fedele
8. **Multi-sede**: Riepilogo consolidato fatturato, gestione staff per filiale

Contatta Federico per valutazione effort e pricing addon.

---

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `centro-estetico` con nome cliente (`acme-bellezza`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account
