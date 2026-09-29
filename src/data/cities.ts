// Orts- und PLZ-Daten: GeoNames AT postal codes (CC BY 4.0), Stand September 2026.
import type { City } from "./regions";
import places from "./cities.json";

export const CITIES: City[] = places as City[];
