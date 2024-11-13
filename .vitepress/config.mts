import { defineConfig } from "vitepress";
import { getSidebar } from "./utils/vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "中文Wiki",
  ignoreDeadLinks: true,
  lastUpdated: true,
  srcDir: "docs",
  srcExclude: ["./README.md", "**/_navbar.md", "**/_sidebar.md", "snowcutieowo/ExcellentCrates/home.md", "snowcutieowo/ExcellentEnchants/home.md"],
  vite: {
    publicDir: "../public",
    assetsInclude: ["**/*.JPG", "**/*.PNG"],
    plugins: [
      {
        name: "SnowCutieOwO-transformer",
        enforce: "pre",
        transform(code, id, options) {
          if (id.endsWith(".md")) {
            let rtnCode = code
              .replace(/\</g, "&gt;")
              .replace(/\>/g, "&lt;")
              .replace(/\/images\//g, "./images/")
              .replace(/,/g, "@");

            if (id.endsWith("developers.create-your-own-mechanic.md")) {
              rtnCode = rtnCode
              .replace('$bukkitdamage', '```\n$1')
              .replace('realMaxDurability}}}$', '$1\n```')
            }

            return rtnCode;
          }
        },
      },
    ],
  },
  markdown: {
    languageAlias: {
      Java: "java",
      linux: "shell",
    },
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
