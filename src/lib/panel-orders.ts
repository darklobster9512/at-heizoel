import type { ConfirmationAddress, OrderDraft } from "@/lib/order-draft";

export const PANEL_ORDER_ENDPOINT =
  "https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/create-order";

export const BRANDING_ID = "def740bf-9e8a-4dd1-acf0-bc82afbd8570";

export type PanelOrderInput = {
  draft: OrderDraft;
  slot?: { date: string; period: "vormittag" | "nachmittag" | "telefon" } | undefined;
  email: string;
  phone: string;
  delivery: ConfirmationAddress;
  billing?: ConfirmationAddress | undefined;
  notes: string;
  payment: string;
  placedAt: string;
};

export type PanelOrderResult = {
  orderNumber: string;
  orderId?: string;
};

const address = (a: ConfirmationAddress) => ({
  salutation: a.salutation || null,
  company: a.company?.trim() ? a.company.trim() : null,
  firstName: a.firstName?.trim() ? a.firstName.trim() : null,
  lastName: a.lastName?.trim() ? a.lastName.trim() : null,
  street: a.street?.trim() ? a.street.trim() : null,
  streetNo: a.streetNo?.trim() ? a.streetNo.trim() : null,
  plz: a.plz?.trim() ? a.plz.trim() : null,
  city: a.city?.trim() ? a.city.trim() : null,
});

export function buildPanelOrderPayload(input: PanelOrderInput) {
  const { draft, slot } = input;
  return {
    brandingId: BRANDING_ID,
    variant: draft.variant,
    liters: Math.round(draft.liters),
    deliveryPoints: draft.points > 0 ? Math.round(draft.points) : 1,
    hose: draft.hose || null,
    truck: draft.truck || null,
    pricePer100: draft.pricePer100,
    total: draft.total,
    earliestDate: draft.earliestDate || null,
    slotDate: slot && slot.period !== "telefon" ? slot.date : null,
    slotPeriod: slot ? slot.period : null,
    email: input.email.trim(),
    phone: input.phone.trim() || null,
    deliveryAddress: address(input.delivery),
    billingAddress: input.billing ? address(input.billing) : null,
    notes: input.notes.trim() ? input.notes.trim() : null,
    paymentMethod: input.payment || null,
    placedAt: input.placedAt,
  };
}

export async function submitPanelOrder(input: PanelOrderInput): Promise<PanelOrderResult> {
  let response: Response;
  try {
    response = await fetch(PANEL_ORDER_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildPanelOrderPayload(input)),
    });
  } catch {
    throw new Error(
      "Die Bestellung konnte nicht übermittelt werden. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    );
  }

  let body: { ok?: boolean; orderNumber?: string | number; orderId?: string; error?: string } = {};
  try {
    body = (await response.json()) as typeof body;
  } catch {
    /* keine JSON-Antwort */
  }

  if (!response.ok || body.ok !== true || !body.orderNumber) {
    throw new Error(
      body.error ||
        "Die Bestellung konnte gerade nicht gespeichert werden. Bitte versuchen Sie es in einem Moment erneut.",
    );
  }

  return {
    orderNumber: String(body.orderNumber),
    ...(body.orderId ? { orderId: body.orderId } : {}),
  };
}
