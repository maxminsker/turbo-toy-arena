export type VehicleKind = "street" | "monster" | "special";

export type Vehicle = {
  id: string;
  name: string;
  shortName: string;
  kind: VehicleKind;
  speed: number;
  power: number;
  grip: number;
  colors: {
    body: string;
    roof: string;
    glass: string;
    stripe: string;
    glow: string;
  };
  badge: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "grave-digger",
    name: "Grave Digger",
    shortName: "Digger",
    kind: "monster",
    speed: 83,
    power: 100,
    grip: 78,
    colors: {
      body: "#171b1a",
      roof: "#37ff62",
      glass: "#a8fff4",
      stripe: "#a94dff",
      glow: "#37ff62",
    },
    badge: "Skull",
  },
  {
    id: "hanks-hammer",
    name: "Hank's Hammer",
    shortName: "Hammer",
    kind: "monster",
    speed: 78,
    power: 94,
    grip: 74,
    colors: {
      body: "#ff3232",
      roof: "#ffd44d",
      glass: "#bff8ff",
      stripe: "#111111",
      glow: "#ff3232",
    },
    badge: "H",
  },
  {
    id: "perrys-pouncer",
    name: "Perry's Pouncer",
    shortName: "Pouncer",
    kind: "monster",
    speed: 76,
    power: 91,
    grip: 86,
    colors: {
      body: "#2b6dff",
      roof: "#f4fbff",
      glass: "#d9f7ff",
      stripe: "#ffb02e",
      glow: "#33b7ff",
    },
    badge: "P",
  },
  {
    id: "bone-crusher",
    name: "Bone Crusher",
    shortName: "Crusher",
    kind: "monster",
    speed: 72,
    power: 96,
    grip: 70,
    colors: {
      body: "#e6e1d3",
      roof: "#1f1d1a",
      glass: "#b9fff4",
      stripe: "#c94141",
      glow: "#fff2ad",
    },
    badge: "Bones",
  },
  {
    id: "neon-ninja",
    name: "Neon Ninja",
    shortName: "Ninja",
    kind: "street",
    speed: 97,
    power: 64,
    grip: 88,
    colors: {
      body: "#15121f",
      roof: "#f61aff",
      glass: "#83fff1",
      stripe: "#37ff62",
      glow: "#f61aff",
    },
    badge: "N",
  },
  {
    id: "tokyo-tiger",
    name: "Tokyo Tiger",
    shortName: "Tiger",
    kind: "street",
    speed: 95,
    power: 68,
    grip: 91,
    colors: {
      body: "#ff8c1a",
      roof: "#111827",
      glass: "#c8f6ff",
      stripe: "#f8f047",
      glow: "#ff8c1a",
    },
    badge: "T",
  },
  {
    id: "rocket-pop",
    name: "Rocket Pop",
    shortName: "Rocket",
    kind: "street",
    speed: 99,
    power: 58,
    grip: 72,
    colors: {
      body: "#f7f7ff",
      roof: "#ea245f",
      glass: "#aeeeff",
      stripe: "#225cff",
      glow: "#ea245f",
    },
    badge: "Blast",
  },
  {
    id: "shark-bite",
    name: "Shark Bite",
    shortName: "Shark",
    kind: "street",
    speed: 88,
    power: 72,
    grip: 80,
    colors: {
      body: "#4a6475",
      roof: "#d3efff",
      glass: "#9ce8ff",
      stripe: "#ff4f73",
      glow: "#38d5ff",
    },
    badge: "Chomp",
  },
  {
    id: "lava-lancer",
    name: "Lava Lancer",
    shortName: "Lava",
    kind: "street",
    speed: 91,
    power: 75,
    grip: 76,
    colors: {
      body: "#26151a",
      roof: "#ff3d00",
      glass: "#ffe1bf",
      stripe: "#ffd000",
      glow: "#ff3d00",
    },
    badge: "Hot",
  },
  {
    id: "cyber-taxi",
    name: "Cyber Taxi",
    shortName: "Taxi",
    kind: "street",
    speed: 86,
    power: 62,
    grip: 94,
    colors: {
      body: "#f5d328",
      roof: "#171717",
      glass: "#7af7ff",
      stripe: "#161616",
      glow: "#f5d328",
    },
    badge: "City",
  },
  {
    id: "gator-growler",
    name: "Gator Growler",
    shortName: "Gator",
    kind: "special",
    speed: 82,
    power: 87,
    grip: 88,
    colors: {
      body: "#1d7a43",
      roof: "#9eff4a",
      glass: "#bdfcff",
      stripe: "#f7db59",
      glow: "#9eff4a",
    },
    badge: "Snap",
  },
  {
    id: "rainbow-ripper",
    name: "Rainbow Ripper",
    shortName: "Rainbow",
    kind: "special",
    speed: 90,
    power: 66,
    grip: 84,
    colors: {
      body: "#7c3cff",
      roof: "#ff3d9a",
      glass: "#dbfdff",
      stripe: "#2fffd2",
      glow: "#ff3d9a",
    },
    badge: "Joy",
  },
];
