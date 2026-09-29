export type StateSlug =
  | "burgenland"
  | "kaernten"
  | "niederoesterreich"
  | "oberoesterreich"
  | "salzburg"
  | "steiermark"
  | "tirol"
  | "vorarlberg"
  | "wien";

export interface State {
  slug: StateSlug;
  name: string;
  cityCount: number;
  plzCount: number;
  capital: string;
  climate: string;
  neighbours: StateSlug[];
}

export interface City {
  slug: string;
  name: string;
  state: StateSlug;
  plz: string;
  lat: number;
  lon: number;
}

export const PRICE_PER_100 = 128.78;
export const PRICE_PREMIUM_PER_100 = 133.16;
export const MIN_LITERS = 1500;
export const SAMPLE_LITERS = 3000;
export const DELIVERY_DAYS = 7;
export const REVIEW_SCORE = "4,9";
export const REVIEW_COUNT = "25.000";

export const STATES: State[] = [
  { slug: "burgenland", name: "Burgenland", capital: "Eisenstadt", cityCount: 172, plzCount: 166, climate: "im pannonischen Osten mit warmen Sommern und kühlen Wintern", neighbours: ["niederoesterreich", "steiermark"] },
  { slug: "kaernten", name: "Kärnten", capital: "Klagenfurt am Wörthersee", cityCount: 138, plzCount: 218, climate: "zwischen Kärntner Becken und alpinen Tälern mit unterschiedlichen Temperaturen", neighbours: ["steiermark", "salzburg", "tirol"] },
  { slug: "niederoesterreich", name: "Niederösterreich", capital: "St. Pölten", cityCount: 589, plzCount: 662, climate: "zwischen Waldviertel, Donautal und Wiener Becken mit unterschiedlichen Heizperioden", neighbours: ["oberoesterreich", "steiermark", "burgenland", "wien"] },
  { slug: "oberoesterreich", name: "Oberösterreich", capital: "Linz", cityCount: 449, plzCount: 454, climate: "zwischen Donautal, Mühlviertel und Salzkammergut mit unterschiedlichen Höhenlagen", neighbours: ["niederoesterreich", "salzburg", "steiermark"] },
  { slug: "salzburg", name: "Salzburg", capital: "Salzburg", cityCount: 126, plzCount: 149, climate: "zwischen Flachgau und Alpenraum mit kühleren Berglagen", neighbours: ["oberoesterreich", "steiermark", "kaernten", "tirol"] },
  { slug: "steiermark", name: "Steiermark", capital: "Graz", cityCount: 298, plzCount: 387, climate: "zwischen Grazer Becken und Obersteiermark mit wechselnden Klimazonen", neighbours: ["burgenland", "niederoesterreich", "oberoesterreich", "salzburg", "kaernten"] },
  { slug: "tirol", name: "Tirol", capital: "Innsbruck", cityCount: 283, plzCount: 291, climate: "in den Alpen mit großen Temperaturunterschieden zwischen Tal und Höhenlage", neighbours: ["vorarlberg", "salzburg", "kaernten"] },
  { slug: "vorarlberg", name: "Vorarlberg", capital: "Bregenz", cityCount: 105, plzCount: 101, climate: "zwischen Bodensee und alpinen Tälern mit wechselnden Wetterlagen", neighbours: ["tirol"] },
  { slug: "wien", name: "Wien", capital: "Wien", cityCount: 1, plzCount: 128, climate: "in einer dicht bebauten Stadtregion mit kühlen Wintern", neighbours: ["niederoesterreich"] },
];

export const STATE_BY_SLUG: Record<string, State> = Object.fromEntries(STATES.map((s) => [s.slug, s]));
export function stateName(slug: string): string { return STATE_BY_SLUG[slug]?.name ?? slug; }
export const euro = (value: number) => value.toLocaleString("de-AT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const num = (value: number) => value.toLocaleString("de-AT");
export const sampleTotal = () => (PRICE_PER_100 / 100) * SAMPLE_LITERS;
export const pricePerLiter = () => PRICE_PER_100 / 100;
export function todayStamp(): string { return new Date().toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }); }
export function variantIndex(seed: string, buckets: number): number { let h = 0; for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 100000; return h % buckets; }
