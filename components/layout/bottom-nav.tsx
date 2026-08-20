"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gem, Home, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/products", label: "Shop", icon: Gem },
  { href: "/search", label: "Search", icon: Search },
  { href: "/contact", label: "Enquire", icon: MessageCircle },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
];

/**
 * Thumb-reachable primary navigation. Most of this store's traffic is mobile,
 * so the five highest-intent destinations live at the bottom of the screen
 * rather than behind the hamburger.
 */
export function BottomNav() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();

  return (
    <nav
      aria-label="Primary"
      className="safe-b fixed inset-x-0 bottom-0 z-50 border-t border-ivory-300 bg-ivory-50/92 backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-16 flex-col items-center justify-center gap-1 text-[0.625rem] font-semibold tracking-wide transition-colors",
                  active ? "text-plum-950" : "text-plum-500",
                )}
              >
                <span className="relative">
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.4 : 1.9}
                    className={active ? "text-gold-600" : undefined}
                  />
                  {href === "/cart" && hydrated && count > 0 && (
                    <span className="absolute -top-1.5 -right-2 grid min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[0.5625rem] font-bold text-plum-950 tabular-nums">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </span>
                {label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gold-500"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
