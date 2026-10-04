// DEV-03 locale scaffold. Greek is the authored master; no English adaptation is approved yet,
// so English routes show English UI labels only and keep Greek module titles (marked pending).
export const LOCALES = ["el", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "el";

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export const UI = {
  el: {
    skip: "Μετάβαση στο περιεχόμενο", modules: "Ενότητες", countries: "Χώρες πιλότου",
    intro: "Foundation sprint 1 — εφαρμογή σε εξέλιξη (Nuclear World + Science World).",
    noScores: "Δεν εμφανίζονται scores: δεν υπάρχουν ακόμη verified δεδομένα.",
    pending: "Το εγκεκριμένο περιεχόμενο δεν έχει εισαχθεί ακόμη (placeholder).",
    back: "Επιστροφή στην αρχική", language: "Γλώσσα",
  },
  en: {
    skip: "Skip to content", modules: "Modules", countries: "Pilot countries",
    intro: "Foundation sprint 1 — work in progress (Nuclear World + Science World).",
    noScores: "No scores are shown: there is no verified data yet.",
    pending: "Approved content is not available yet (placeholder). English adaptation is pending scientific review; Greek titles are shown.",
    back: "Back to home", language: "Language",
  },
} as const;
