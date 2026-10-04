import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { LOCALES, UI, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div lang={locale}>
      <a className="skip" href="#main">{UI[locale].skip}</a>
      <SiteHeader locale={locale} />
      <main id="main">{children}</main>
    </div>
  );
}
