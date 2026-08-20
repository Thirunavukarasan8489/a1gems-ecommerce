import { BottomNav } from "@/components/layout/bottom-nav";
import { CartToast } from "@/components/cart/cart-toast";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />

      {/* Clears the fixed mobile tab bar so the footer is fully scrollable to. */}
      <div aria-hidden className="pb-tabbar bg-plum-950 lg:hidden" />

      <BottomNav />
      <WhatsappFab />
      <CartToast />
    </>
  );
}
