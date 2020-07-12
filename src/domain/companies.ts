interface Company {
  name: string;
  domain: string;
}

const companies: { [name: string]: Company } = {
  "British Airways": { name: "British Airways", domain: "britishairways.com" },
  Eurostar: { name: "Eurostar", domain: "eurostar.com" },
};

export default companies;
