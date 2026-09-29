import { DELIVERY_DAYS, MIN_LITERS, PRICE_PER_100, PRICE_PREMIUM_PER_100, SAMPLE_LITERS, euro, num, sampleTotal, todayStamp, type City, type State } from "./regions";

export interface CopyBlock { heading: string; paragraphs: string[] }
const price = () => `${euro(PRICE_PER_100)} €`;
const total = () => `${euro(sampleTotal())} €`;

export function stateBlocks(state: State): CopyBlock[] {
  return [
    { heading: `Deutsches Heizöl in ${state.name}`, paragraphs: [
      `Heizöl Austria bietet deutsches Heizöl für Lieferadressen in ${state.name} an. In unserem Ortsverzeichnis finden Sie ${num(state.cityCount)} Gemeinden und ${num(state.plzCount)} erfasste Postleitzahl-Bereiche. Geben Sie Ihre vierstellige PLZ ein, um ein Angebot für Ihre Adresse zu erhalten.`,
      `Deutsches Heizöl kann in Österreich günstiger angeboten werden. Vergleichen Sie den angezeigten Endpreis für Ihre Lieferadresse und Ihre gewünschte Menge, bevor Sie bestellen.`,
    ] },
    { heading: `Heizölpreis in ${state.name} berechnen`, paragraphs: [
      `Der angezeigte Richtpreis beginnt bei ${price()} pro 100 Liter (Stand: ${todayStamp()}). Für ${num(SAMPLE_LITERS)} Liter ergibt das rechnerisch etwa ${total()}. Der tatsächliche Preis hängt von Lieferadresse, Menge und Auswahl im Preisrechner ab.`,
      `Die Mindestbestellmenge beträgt ${num(MIN_LITERS)} Liter. Wählen Sie Ihre Gemeinde oder berechnen Sie den Preis direkt mit Ihrer Postleitzahl.`,
    ] },
    { heading: `Lieferung nach ${state.name}`, paragraphs: [
      `Die Lieferbedingungen und verfügbaren Termine sehen Sie im Bestellablauf. ${state.name} liegt klimatisch ${state.climate}; geben Sie bei Ihrer Bestellung Zufahrt und benötigte Schlauchlänge an.`,
      `Heizöl Austria verkauft deutsches Heizöl an Kundinnen und Kunden in Österreich. Vor dem Abschluss sehen Sie den Gesamtpreis und die angebotenen Zahlungsarten.`,
    ] },
  ];
}

export function stateFaq(state: State): { q: string; a: string }[] {
  return [
    { q: `Was kostet Heizöl in ${state.name}?`, a: `Der Richtpreis beginnt bei ${price()} pro 100 Liter (Stand: ${todayStamp()}). Den konkreten Gesamtpreis für Ihre vierstellige PLZ sehen Sie im Preisrechner.` },
    { q: `Woher kommt das Heizöl für ${state.name}?`, a: `Heizöl Austria bietet deutsches Heizöl für Lieferadressen in Österreich an. Prüfen Sie den Endpreis für Ihre Adresse im Preisrechner.` },
    { q: `Wie viel Heizöl kann ich in ${state.name} bestellen?`, a: `Die Mindestbestellmenge beträgt ${num(MIN_LITERS)} Liter. Die gewünschte Menge geben Sie im Preisrechner ein.` },
    { q: `Wann wird in ${state.name} geliefert?`, a: `Verfügbare Termine und das Lieferfenster werden Ihnen während der Bestellung angezeigt.` },
  ];
}

export function cityBlocks(city: City, state: State): CopyBlock[] {
  return [
    { heading: `Deutsches Heizöl für ${city.name}`, paragraphs: [
      `Heizöl Austria bietet deutsches Heizöl für ${city.name} in ${state.name} an. Die Postleitzahl ${city.plz} ist ein möglicher Ausgangspunkt für Ihren Preisvergleich. Falls Ihre Adresse eine andere PLZ hat, geben Sie diese im Preisrechner ein.`,
      `Der Richtpreis beginnt bei ${price()} pro 100 Liter (Stand: ${todayStamp()}); für ${num(SAMPLE_LITERS)} Liter entspricht das rechnerisch etwa ${total()}. Maßgeblich ist der Endpreis im Bestellablauf.`,
    ] },
    { heading: `Preisvorteil durch deutsches Heizöl`, paragraphs: [
      `Deutsches Heizöl kann für Kundinnen und Kunden in Österreich günstiger sein. Der genaue Preis hängt von der Lieferadresse, der Bestellmenge und der Heizölsorte ab. Vergleichen Sie Ihr persönliches Angebot vor der Bestellung.`,
      `Neben Standard-Heizöl steht Premium-Heizöl im Preisrechner ab ${euro(PRICE_PREMIUM_PER_100)} € pro 100 Liter zur Auswahl. Die Mindestmenge beträgt ${num(MIN_LITERS)} Liter.`,
    ] },
    { heading: `Lieferung in ${city.name}`, paragraphs: [
      `Für ${city.name} (${state.name}) können Sie Ihre vierstellige Postleitzahl und die gewünschte Literzahl eingeben. Verfügbare Liefertermine und Zahlungsarten werden im Bestellablauf angezeigt.`,
      `Bitte teilen Sie uns Besonderheiten zur Zufahrt und zur Schlauchlänge bei der Bestellung mit.`,
    ] },
  ];
}

export function cityFaq(city: City, state: State): { q: string; a: string }[] {
  return [
    { q: `Was kostet Heizöl in ${city.name}?`, a: `Der Richtpreis beginnt bei ${price()} pro 100 Liter (Stand: ${todayStamp()}). Den Endpreis für Ihre Adresse in ${state.name} sehen Sie im Preisrechner.` },
    { q: `Liefert Heizöl Austria nach ${city.name}?`, a: `Für ${city.name} können Sie mit Ihrer vierstelligen PLZ ein Angebot anfordern. Die Verfügbarkeit für Ihre konkrete Adresse sehen Sie im Bestellablauf.` },
    { q: `Woher stammt das Heizöl für ${city.name}?`, a: `Heizöl Austria bietet deutsches Heizöl zum Verkauf in Österreich an.` },
    { q: `Welche Mindestmenge gilt für ${city.name}?`, a: `Die Mindestbestellmenge beträgt ${num(MIN_LITERS)} Liter.` },
  ];
}
