import { DefaultTheme } from "vitepress";
import fs from "fs";
import { md2json, type Element } from "@tinymd/md2json";
import glob from "tiny-glob";

export async function getSidebar(): Promise<DefaultTheme.SidebarMulti> {
  const files = await glob(`./**/_sidebar.md`, { cwd: `./docs/snowcutieowo` });

  const docList = files.map((file) => file.split(/[\/\\\\]/g)[0]);

  // @ts-ignore: Damn declarations
  function flatmap(tree: any[], parent?: string) {
    return tree.map((item) => {
      if (item.tag === "li" && Array.isArray(item.contents)) {
        if (item.contents.length === 1) {
          const target = item.contents[0].contents[0];
          const href = item.contents[0].contents[0].props.href;
          return {
            link: parent + "/" + href.replace(/.md$/, ""),
            text: target.contents.join(""),
          };
        } else {
          const text = item.contents[0].contents[0];
          return {
            text: typeof text === "string" ? text : item.contents[0].contents[0].contents[0],
            items: flatmap(item.contents[1].contents, parent),
          };
        }
      }
    });
  }

  // sidebar data
  const sbData = docList.reduce((acc, cur) => {
    const markdownString = fs.readFileSync(`./docs/snowcutieowo/${cur}/_sidebar.md`, "utf-8");
    const blocks: Element[] = md2json(markdownString);
    const contents = (blocks.find((block) => block.tag === "ul")?.contents as Element[]) ?? [];
    return Object.assign(acc, { [`/${cur}`]: flatmap(contents, `/${cur}`) });
  }, {});

  fs.writeFileSync(`./a-sbData.json`, JSON.stringify(sbData, null, 2));
  return sbData;
}
