"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

export default function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const path = usePathname() ?? `/${locale}`;
  const rest = path.split("/").slice(2).join("/");
  return (
    <nav aria-label={label} className="locales">
      {LOCALES.map((l) => (
        <Link key={l} href={`/${l}${rest ? `/${rest}` : ""}`} lang={l}
          aria-current={l === locale ? "true" : undefined}>{l.toUpperCase()}</Link>
      ))}
    </nav>
  );
}
