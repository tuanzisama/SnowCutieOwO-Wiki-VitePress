import { defineConfig } from "vitepress";
import { getSidebar } from "./utils/vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "中文Wiki",
  ignoreDeadLinks: true,
  lastUpdated: true,
  srcDir: "docs",
  srcExclude: ["./README.md"],
  vite: {
    publicDir: "../public",
    assetsInclude: ["**/*.JPG", "**/*.PNG"],
  },
  rewrites: {
    "snowcutieowo/:pkg": ":pkg/overview.md",
    "snowcutieowo/:pkg/(.*)": ":pkg/(.*)",
  },
  themeConfig: {
    siteTitle: "中文Wiki",
    sidebar: await getSidebar(),
  },
});
