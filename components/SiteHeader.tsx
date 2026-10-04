import Link from "next/link";
import { MODULES } from "@/data/registry";
import { UI, type Locale } from "@/lib/i18n";
import LocaleSwitch from "./LocaleSwitch";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = UI[locale];
  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="mark" aria-label="NUC.">NUC<span>.</span></Link>
      <details className="modnav">
        <summary>{t.modules}</summary>
        <nav aria-label={t.modules}>
          <ol>
            {MODULES.map(([id, title]) => (
              <li key={id}><Link href={`/${locale}/modules/${id}`}><strong>{id}</strong> {title}</Link></li>
            ))}
          </ol>
        </nav>
      </details>
      <LocaleSwitch locale={locale} label={t.language} />
    </header>
  );
}
