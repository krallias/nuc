import { notFound } from "next/navigation";
import Link from "next/link";
import { MODULES } from "@/data/registry";
import { LOCALES, UI, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => MODULES.map(([id]) => ({ locale, id })));
}

export default async function ModulePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const mod = MODULES.find(([m]) => m === id);
  if (!isLocale(locale) || !mod) notFound();
  const t = UI[locale];
  return (
    <>
      <p><small>{mod[0]}</small></p>
      <h1>{mod[1]}</h1>
      <p>{t.pending}</p>
      <p><Link href={`/${locale}`}>{t.back}</Link></p>
    </>
  );
}
