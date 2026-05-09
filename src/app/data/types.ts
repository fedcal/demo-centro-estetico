// Tipi TypeScript per i dati mock del centro estetico

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziAttivita {
  primaVisitaSconto: boolean;
  scontoPercentuale: number;
  giftCard: boolean;
  pacchetti: boolean;
  abbonamenti: boolean;
  accessibileDisabili: boolean;
  wifiGratuito: boolean;
  parcheggioConvenzionato: boolean;
  parcheggioPubblico: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziAttivita;
  metaSeo: MetaSeo;
}

export interface CategoriaTrattamento {
  id: string;
  nome: string;
  ordine: number;
}

export interface Trattamento {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  durata: number;
  prezzo: number;
  featured: boolean;
}

export interface Listino {
  categorie: CategoriaTrattamento[];
  trattamenti: Trattamento[];
}

export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  image: string;
  specializzazione: string;
  certificazioni: string[];
}

export interface Team {
  team: MembroTeam[];
}

export interface GalleryItem {
  id: number;
  caption: string;
  emoji: string;
  category: string;
}

export interface Gallery {
  gallery: GalleryItem[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
