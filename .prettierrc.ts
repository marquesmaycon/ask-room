import { type Config } from "prettier";

const config: Config = {
  plugins: ["prettier-plugin-tailwindcss"],
  trailingComma: "none",
  semi: false,
  printWidth: 100
}

export default config;
