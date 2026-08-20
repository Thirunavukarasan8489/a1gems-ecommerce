import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { buttonStyles } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";
import { business, primaryNav, secondaryNav, whatsappLink } from "@/lib/data/nav";
import { policies } from "@/lib/data/policies";

const legal = policies.map((policy) => ({
  label: policy.title,
  href: `/policies/${policy.slug}`,
}));

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-plum-950 text-plum-200">
      <div className="shell gutter py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-plum-300">
              Natural, independently certified gemstones sourced at origin.
              Treatments always disclosed, pricing always explained.
            </p>
            <a
              href={whatsappLink("Hi A1 Gems, I would like a free consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({
                variant: "whatsapp",
                size: "sm",
                className: "mt-6",
              })}
            >
              <MessageCircle size={16} />
              Chat with a gemmologist
            </a>
          </div>

          <FooterColumn title="Shop">
            {categories.slice(0, 6).map((cat) => (
              <FooterLink
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                label={cat.name.split(" / ")[0]}
              />
            ))}
            <FooterLink href="/products" label="All products" />
          </FooterColumn>

          <FooterColumn title="Company">
            {primaryNav.slice(2).map((item) => (
              <FooterLink key={item.href} {...item} />
            ))}
            {secondaryNav.map((item) => (
              <FooterLink key={item.href} {...item} />
            ))}
          </FooterColumn>

          <FooterColumn title="Reach us">
            <li className="flex items-start gap-2.5 text-sm text-plum-300">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-500" />
              {business.address}
            </li>
            <li>
              <a
                href={business.phoneHref}
                className="flex items-center gap-2.5 text-sm text-plum-300 hover:text-gold-300"
              >
                <Phone size={16} className="shrink-0 text-gold-500" />
                {business.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2.5 text-sm text-plum-300 hover:text-gold-300"
              >
                <Mail size={16} className="shrink-0 text-gold-500" />
                {business.email}
              </a>
            </li>
            <li className="pt-1 text-sm text-plum-400">{business.hours}</li>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-plum-800 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-plum-400">
            © {new Date().getFullYear()} A1 Gems. All rights reserved. GSTIN
            33ABCDE1234F1Z5
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-plum-400 underline-offset-4 hover:text-plum-200 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-gold-500 uppercase">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-plum-300 underline-offset-4 transition-colors hover:text-gold-300"
      >
        {label}
      </Link>
    </li>
  );
}
