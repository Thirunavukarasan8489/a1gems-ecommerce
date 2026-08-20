/**
 * §12.6 Shipping Flow — shipping is fixed-price and the amount must be
 * configurable from Admin Settings. Until the Settings module exists (Phase 20)
 * these are the defaults the checkout reads.
 */
export const commerceSettings = {
  /** Flat insured shipping fee, in paise. */
  flatShippingFee: 20000,
  /** Order subtotal at or above which shipping is waived, in paise. */
  freeShippingThreshold: 2_500_000,
  currency: "INR",
} as const;

export function shippingFor(subtotalPaise: number) {
  if (subtotalPaise <= 0) return 0;
  return subtotalPaise >= commerceSettings.freeShippingThreshold
    ? 0
    : commerceSettings.flatShippingFee;
}
