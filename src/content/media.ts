/**
 * Golf Star Motors (جولف ستار للسيارات) — evergreen media only.
 *
 * Every photograph kept here is undated: no price, deposit, monthly
 * instalment or date is printed on any of them. Specific advertised pricing
 * has been removed from the site entirely — ask the showroom directly for
 * current rates.
 */

export type CarPhoto = {
  src: string;
  make: string;
  model: string;
};

/** Representative cars across the makes carried on the floor. */
export const LINEUP: CarPhoto[] = [
  { src: "/media/car-mg-zs.jpg", make: "MG", model: "ZS" },
  { src: "/media/car-peugeot-408.jpg", make: "Peugeot", model: "408" },
  { src: "/media/car-nissan-sunny.jpg", make: "Nissan", model: "Sunny" },
  { src: "/media/car-mg-hs.jpg", make: "MG", model: "HS" },
  { src: "/media/car-fiat-tipo.jpg", make: "Fiat", model: "Tipo" },
  { src: "/media/car-citroen-c4.jpg", make: "Citroën", model: "C4" },
  { src: "/media/car-kia-xceed.jpg", make: "Kia", model: "XCeed" },
  { src: "/media/car-mg-5.jpg", make: "MG", model: "5" },
  { src: "/media/car-byd-f3.jpg", make: "BYD", model: "F3" },
];

/** Makes carried across the floor. */
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
  { src: "/media/hero-road.jpg", key: "road" },
  { src: "/media/scene-lot.jpg", key: "lot" },
  { src: "/media/scene-desert.jpg", key: "desert" },
];

export const KEYS_FRAME = "/media/keys.jpg";
export const TEASER_FRAME = "/media/car-mg-zs.jpg";
export const LOT_FRAME = "/media/scene-lot.jpg";
