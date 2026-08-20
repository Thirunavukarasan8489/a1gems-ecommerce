/** Editable from the admin Content module in Phase 15 (§28). */
export interface Policy {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping Policy",
    summary:
      "How and when we dispatch, what insurance covers, and what shipping costs.",
    updated: "1 August 2026",
    sections: [
      {
        heading: "Dispatch times",
        paragraphs: [
          "In-stock items are dispatched within 2 working days of payment confirmation. Made-to-size bracelets and malas are strung to order and dispatch within 3 to 4 working days.",
          "Orders paid by bank transfer are dispatched only after the transfer has been confirmed in our account, which can take an additional working day.",
        ],
      },
      {
        heading: "Coverage and insurance",
        paragraphs: [
          "We currently ship across India only. Every shipment is fully insured for its invoiced value and requires a signature on delivery.",
          "If a parcel arrives with damaged or tampered packaging, refuse delivery and contact us the same day. Once a signature is given for an intact parcel, insurance no longer applies.",
        ],
      },
      {
        heading: "Charges",
        paragraphs: [
          "A flat insured shipping fee applies to all orders and is waived on orders with a subtotal above ₹25,000. The exact amount is shown at checkout before payment.",
          "We do not add handling, packaging or fuel surcharges on top of the displayed shipping fee.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & Refunds",
    summary:
      "The 7-day return window, what is excluded, and how refunds are processed.",
    updated: "1 August 2026",
    sections: [
      {
        heading: "Return window",
        paragraphs: [
          "Unworn stones may be returned within 7 days of delivery, in their original sealed packaging, with the laboratory certificate intact and undamaged.",
          "Made-to-size bracelets and malas, and any stone that has been set, drilled or altered, are not returnable.",
        ],
      },
      {
        heading: "How to start a return",
        paragraphs: [
          "Contact us with your order number and the reason for return. Once approved, we arrange an insured pickup at our cost if the return is due to a misdescription on our part, or at your cost if you have simply changed your mind.",
          "Returned items are inspected against the original certificate on arrival. Inspection takes up to 3 working days.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          "Approved refunds are issued to the original payment method within 5 to 7 working days of inspection. Shipping fees are refunded only when the return is due to an error on our side.",
          "Cash on delivery orders are refunded by bank transfer to an account in the name of the person who placed the order.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "What we collect, why we collect it, and what we never do with it.",
    updated: "1 August 2026",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "For enquiries we collect your name, phone number, email, optional WhatsApp number and city. For orders we additionally collect billing and shipping addresses, and GST details where you supply them.",
          "We store a temporary cart identifier in your browser so your cart survives a page refresh. It contains no personal information.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "Enquiry details are used to respond to you and to follow up on that enquiry. Order details are used to fulfil, invoice and support the order, and to meet our tax obligations.",
          "We do not sell, rent or share your contact details with third parties for their marketing. Courier partners and payment providers receive only the minimum data needed to deliver or process your order.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can ask us to delete your enquiry record at any time by writing to us. Order records are retained for the period required by Indian tax law.",
          "Marketing messages, if you opt into them, always carry an unsubscribe route and we honour it immediately.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    summary: "The terms you agree to when you buy from or enquire with us.",
    updated: "1 August 2026",
    sections: [
      {
        heading: "Product descriptions",
        paragraphs: [
          "We describe every stone as accurately as we can, including all known treatments. Photographs and rendered artwork are indicative; natural stones vary and colour reproduction differs between screens.",
          "Where a laboratory report exists, the report is the authoritative description of the stone and takes precedence over anything on this website.",
        ],
      },
      {
        heading: "Pricing and availability",
        paragraphs: [
          "Prices are in Indian Rupees and inclusive of applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to decline or cancel an order where a listing was materially wrong, in which case any payment is refunded in full.",
          "Stock is limited and, for one-of-a-kind stones, quantities of one. Adding an item to your cart does not reserve it; inventory is reserved only at checkout.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, and the courts at Chennai have exclusive jurisdiction over any dispute arising from them.",
        ],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
