import { notFound } from "next/navigation";
import Link from "next/link";
import { MODULES, PILOT_COUNTRIES } from "@/data/registry";
import { UI, isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = UI[locale];
  return (
    <>
      <p>{t.intro}</p>
      <h2>{t.modules}</h2>
      <ol>{MODULES.map(([id, title]) => (
        <li key={id}><Link href={`/${locale}/modules/${id}`}><strong>{id}</strong> — {title}</Link></li>
      ))}</ol>
      <h2>{t.countries}</h2>
      <ul>{PILOT_COUNTRIES.map((c) => <li key={c}>{c}</li>)}</ul>
      <small>{t.noScores}</small>
    </>
  );
}
