import { MODULES, PILOT_COUNTRIES } from "@/data/registry";

export default function Home() {
  return (
    <main>
      <p className="mark">NUC<span>.</span></p>
      <p>Foundation sprint 1 — εφαρμογή σε εξέλιξη (Nuclear World + Science World).</p>
      <h2>Modules (public pilot)</h2>
      <ol>{MODULES.map(([id, title]) => <li key={id}><strong>{id}</strong> — {title}</li>)}</ol>
      <h2>Χώρες πιλότου</h2>
      <ul>{PILOT_COUNTRIES.map((c) => <li key={c}>{c}</li>)}</ul>
      <small>Δεν εμφανίζονται scores: δεν υπάρχουν ακόμη verified δεδομένα.</small>
    </main>
  );
}
