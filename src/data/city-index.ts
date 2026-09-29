import { CITIES } from "./cities";
import type { City, StateSlug } from "./regions";

export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c]),
);

const grouped = new Map<StateSlug, City[]>();
for (const c of CITIES) {
  const list = grouped.get(c.state) ?? [];
  list.push(c);
  grouped.set(c.state, list);
}

/** Orte eines Bundeslands, nach Ortsnamen */
export function citiesOfState(state: StateSlug): City[] {
  return grouped.get(state) ?? [];
}

/** Städte eines Bundeslands, alphabetisch */
export function citiesOfStateAlpha(state: StateSlug): City[] {
  return [...citiesOfState(state)].sort((a, b) => a.name.localeCompare(b.name, "de"));
}

/** Nachbarorte: geografisch nächstliegende Orte im gleichen Bundesland */
export function nearbyCities(city: City, count = 10): City[] {
  const others = citiesOfState(city.state).filter((c) => c.slug !== city.slug);
  const rad = Math.PI / 180;
  const baseLat = city.lat * rad;
  return others
    .map((c) => ({ c, d: Math.acos(Math.min(1, Math.max(-1, Math.sin(baseLat) * Math.sin(c.lat * rad) + Math.cos(baseLat) * Math.cos(c.lat * rad) * Math.cos((city.lon - c.lon) * rad)))) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((e) => e.c);
}

export { CITIES };
