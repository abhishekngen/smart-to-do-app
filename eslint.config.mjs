import {defineConfig} from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier";

export default defineConfig([
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: {js}, extends: ["js/recommended"]},
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: {globals: {...globals.browser, ...globals.node}}},
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        ignores: ['coverage', '**/public', '**/dist', 'pnpm-lock.yaml', 'pnpm-workspace.yaml']
    },
    eslintPluginPrettierRecommended
]);