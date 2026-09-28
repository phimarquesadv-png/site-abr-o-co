// Copia o Decap CMS do node_modules para public/admin/ antes do build.
// Assim o painel não depende de CDN externa e a versão é a do package.json.
import { copyFileSync, mkdirSync } from "node:fs";
mkdirSync("public/admin", { recursive: true });
copyFileSync("node_modules/decap-cms/dist/decap-cms.js", "public/admin/decap-cms.js");
