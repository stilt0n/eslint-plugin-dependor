import rules from "./rules";

const plugin = {
  meta: {
    name: "eslint-plugin-dependor",
    version: "0.1.0",
  },
  configs: {
    get recommended() {
      return recommended;
    },
  },
  rules,
};

const recommended = {
  plugins: {
    "eslint-plugin-dependor": plugin,
  },
  rules,
};

export default plugin;
