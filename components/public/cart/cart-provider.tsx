"use client";

import * as React from "react";
import type { CartLine, Product } from "@/lib/types";

const STORAGE_KEY = "a1gems.cart.v1";

/**
 * Client-side temporary cart.
 *
 * §11.1 of the spec puts the temporary cart in MongoDB keyed by a cookie so it
 * survives across devices and can be TTL-expired. That arrives in Phase 07;
 * until the API exists this keeps the same line shape (including the price
 * snapshot) in localStorage so the swap is a change of transport only.
 */

type CartContextValue = {
  lines: CartLine[];
  /** False during SSR and the hydration render, so both agree on empty UI. */
  hydrated: boolean;
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number, variantName?: string, variantPrice?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  lastAdded: CartLine | null;
  dismissLastAdded: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    // Corrupt or unavailable storage: start with an empty cart.
    return [];
  }
}

/**
 * `hydrated` flips to true only after React has finished hydrating, without an
 * effect: getServerSnapshot feeds both SSR and the hydration render, so the
 * first client paint provably matches the server HTML even though `lines` was
 * already restored from localStorage by the state initialiser below.
 */
const noopSubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const hydrated = React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const [lines, setLines] = React.useState<CartLine[]>(readStoredLines);
  const [lastAdded, setLastAdded] = React.useState<CartLine | null>(null);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Private mode / quota exceeded — the cart still works for this session.
    }
  }, [lines, hydrated]);

  const add = React.useCallback((product: Product, quantity = 1, variantName?: string, variantPrice?: number) => {
    const line: CartLine = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      gemColor: product.gemColor,
      unitPrice: variantPrice ?? product.sellingPrice,
      quantity,
      variantName,
    };

    setLines((current) => {
      const existing = current.find((l) => l.productId === product.id && l.variantName === variantName);
      if (!existing) return [...current, line];
      return current.map((l) =>
        (l.productId === product.id && l.variantName === variantName)
          ? { ...l, quantity: l.quantity + quantity }
          : l,
      );
    });
    setLastAdded(line);
  }, []);

  const setQuantity = React.useCallback(
    (productId: string, quantity: number) => {
      setLines((current) =>
        quantity <= 0
          ? current.filter((l) => l.productId !== productId)
          : current.map((l) =>
              l.productId === productId ? { ...l, quantity } : l,
            ),
      );
    },
    [],
  );

  const remove = React.useCallback((productId: string) => {
    setLines((current) => current.filter((l) => l.productId !== productId));
  }, []);

  const clear = React.useCallback(() => setLines([]), []);
  const dismissLastAdded = React.useCallback(() => setLastAdded(null), []);

  const value = React.useMemo<CartContextValue>(
    () => ({
      lines,
      hydrated,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0),
      add,
      setQuantity,
      remove,
      clear,
      lastAdded,
      dismissLastAdded,
    }),
    [
      lines,
      hydrated,
      add,
      setQuantity,
      remove,
      clear,
      lastAdded,
      dismissLastAdded,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
