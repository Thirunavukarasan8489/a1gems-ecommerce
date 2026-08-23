import Link from "next/link";
import { Phone, Search } from "lucide-react";
import { AnnouncementBar } from "@/components/public/layout/announcement-bar";
import { CartButton } from "@/components/public/layout/cart-button";
import { Logo } from "@/components/public/layout/logo";
import { MobileDrawer } from "@/components/public/layout/mobile-drawer";
import { PrimaryNav } from "@/components/public/layout/primary-nav";
import { business } from "@/lib/data/nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />

      <div className="border-b border-ivory-300 bg-ivory-100/85 backdrop-blur-md">
        <div className="shell gutter flex h-15 items-center gap-2 lg:h-18 lg:gap-8">
          <MobileDrawer />

          <Logo className="mr-auto lg:mr-0" />

          <PrimaryNav />

          <div className="flex shrink-0 items-center gap-1">
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-plum-800 transition-colors hover:bg-plum-900/6 xl:inline-flex"
            >
              <Phone size={16} strokeWidth={2.25} />
              {business.phone}
            </a>

            <Link
              href="/search"
              aria-label="Search products"
              className="grid size-10 place-items-center rounded-full text-plum-800 transition-colors hover:bg-plum-900/6"
            >
              <Search size={20} strokeWidth={2} />
            </Link>

            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
