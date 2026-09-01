/**
 * Offers transcribed from Golf Star's own published posts. Deposit (مقدم) and
 * monthly instalment (القسط الشهري) are exactly as they advertised them; the UI
 * says plainly that these are as-published and subject to change.
 */
export type Offer = {
  src: string;
  make: string;
  model: string;
  /** Deposit in EGP, as advertised. */
  deposit?: number;
  /** Monthly instalment in EGP, as advertised. */
  monthly?: number;
  /** Advertised interest rate, where they published one. */
  rate?: string;
};

export const OFFERS: Offer[] = [
  { src: "/media/car-08.webp", make: "BYD", model: "F3", deposit: 120000 },
  { src: "/media/car-09.webp", make: "Nissan", model: "Sunny", deposit: 140000 },
  { src: "/media/car-02.webp", make: "Fiat", model: "Tipo", deposit: 210000 },
  { src: "/media/car-14.webp", make: "MG", model: "5", deposit: 265000 },
  { src: "/media/car-13.webp", make: "MG", model: "ZS", deposit: 290000 },
  { src: "/media/car-05.webp", make: "Citroën", model: "C4", deposit: 295000 },
  { src: "/media/car-24.jpg", make: "MG", model: "ZS", deposit: 315000, monthly: 19000 },
  { src: "/media/car-12.webp", make: "MG", model: "HS", deposit: 395000 },
  { src: "/media/car-04.webp", make: "Kia", model: "XCeed Topline", deposit: 400000 },
  { src: "/media/car-23.jpg", make: "MG", model: "7", deposit: 495000, monthly: 31000 },
  { src: "/media/car-03.webp", make: "Peugeot", model: "408", deposit: 560000 },
  { src: "/media/car-18.jpg", make: "Peugeot", model: "3008", deposit: 660000, monthly: 42000 },
];

/** Makes named across their own posts. */
export const MAKES = [
  "MG",
  "Peugeot",
  "Citroën",
  "Kia",
  "Fiat",
  "Nissan",
  "BYD",
  "Chery",
];

/** Wide, atmospheric frames used for the full-bleed WebGL transition. */
export const SCENES = [
  { src: "/media/car-15.webp", key: "road" },
  { src: "/media/car-22.jpg", key: "lot" },
  { src: "/media/car-33.jpg", key: "desert" },
  { src: "/media/car-19.jpg", key: "collection" },
];

export const KEYS_FRAME = "/media/car-27.jpg";
export const TEASER_FRAME = "/media/car-07.webp";
export const LOT_FRAME = "/media/car-22.jpg";
