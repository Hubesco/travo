interface Company {
  name: string;
  domain: string;
  type: "plane" | "shopping" | "train";
}

const companies: { [name: string]: Company } = {
  // Plane
  "Air France": {
    name: "Air France",
    domain: "airfrance.com",
    type: "plane",
  },
  "British Airways": {
    name: "British Airways",
    domain: "britishairways.com",
    type: "plane",
  },
  "Eastern Airways": {
    name: "Eastern Airways",
    domain: "easternairways.com",
    type: "plane",
  },
  easyJet: { name: "easyJet", domain: "easyjet.com", type: "plane" },
  Jet2: { name: "Jet2", domain: "jet2.com", type: "plane" },
  Loganair: { name: "Loganair", domain: "loganair.co.uk", type: "plane" },
  Nowegian: { name: "Norwegian", domain: "norwegian.com", type: "plane" },
  Ryanair: { name: "Ryanair", domain: "ryanair.com", type: "plane" },
  "Virgin Atlantic": {
    name: "Virgin Atlantic",
    domain: "virginatlantic.com",
    type: "plane",
  },
  "Wizz Air": { name: "Wizz Air", domain: "wizzair.com", type: "plane" },

  // Shopping
  Amazon: {
    name: "Amazon",
    domain: "amazon.co.uk",
    type: "shopping",
  },
  Ocado: {
    name: "Ocado",
    domain: "ocado.com",
    type: "shopping",
  },
  "Sainsbury's": {
    name: "Sainsbury's",
    domain: "sainsburys.co.uk",
    type: "shopping",
  },
  Tesco: {
    name: "Tesco",
    domain: "tesco.com",
    type: "shopping",
  },
  "Waitrose & Partners": {
    name: "Waitrose & Partners",
    domain: "waitrose.com",
    type: "shopping",
  },

  // Train
  "Arriva Rail": {
    name: "Arriva Rail",
    domain: "arrivaraillondon.co.uk",
    type: "train",
  },
  "Avanti West Coast": {
    name: "Avanti West Coast",
    domain: "avantiwestcoast.co.uk",
    type: "train",
  },
  c2c: { name: "c2c", domain: "c2c-online.co.uk", type: "train" },
  "Caledonian Sleeper": {
    name: "Caledonian Sleeper",
    domain: "sleeper.scot",
    type: "train",
  },
  CrossCountry: {
    name: "CrossCountry",
    domain: "crosscountrytrains.co.uk",
    type: "train",
  },
  "East Midlands Railway": {
    name: "East Midlands Railway",
    domain: "eastmidlandsrailway.co.uk",
    type: "train",
  },
  Eurostar: { name: "Eurostar", domain: "eurostar.com", type: "train" },
  "Grand Central Rail": {
    name: "Grand Central Rail",
    domain: "grandcentralrail.com",
    type: "train",
  },
  "Greater Anglia": {
    name: "Greater Anglia",
    domain: "greateranglia.co.uk",
    type: "train",
  },
  "Great Western Railway": {
    name: "Great Western Railway",
    domain: "gwr.com",
    type: "train",
  },
  "Heathrow Express": {
    name: "Heathrow Express",
    domain: "heathrowexpress.com",
    type: "train",
  },
  "Hull Trains": {
    name: "Hull Trains",
    domain: "hulltrains.co.uk",
    type: "train",
  },
  "London North Eastern Railway": {
    name: "London North Eastern Railway",
    domain: "lner.co.uk",
    type: "train",
  },
  Merseyrail: { name: "Merseyrail", domain: "merseyrail.org", type: "train" },
  "Nothern Rail": {
    name: "Nothern Rail",
    domain: "northernrailway.co.uk",
    type: "train",
  },
  Southeastern: {
    name: "Southeastern",
    domain: "southeasternrailway.co.uk",
    type: "train",
  },
  "South Western Railway": {
    name: "South Western Railway",
    domain: "southwesternrailway.com",
    type: "train",
  },
  "Transport for London": {
    name: "Transport for London",
    domain: "tfl.gov.uk",
    type: "train",
  },
  "TransPennine Express": {
    name: "TransPennine Express",
    domain: "tpexpress.co.uk",
    type: "train",
  },
  "Transport for Wales": {
    name: "Transport for Wales",
    domain: "tfwrail.wales",
    type: "train",
  },
  "West Midlands Railway": {
    name: "West Midlands Railway",
    domain: "westmidlandsrailway.co.uk",
    type: "train",
  },
};

export default companies;
