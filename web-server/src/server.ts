import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import * as crypto from "crypto";
import * as compression from "compression";

const app = express();

app.set("view engine", "pug");
app.set("views", "./web-server/templates");
app.use(compression());

const BUNDLE_DIR = path.join(process.cwd(), "build", "web-server", "client-bundle");
const bundleHash = crypto.createHash("md5");
fs.readdirSync(BUNDLE_DIR).forEach((file) => {
    const content = fs.readFileSync(path.join(BUNDLE_DIR, file)).toString();
    bundleHash.update(content);
});
const bundleDigest = bundleHash.digest("hex");
const bundleBaseUrl = `/static/${bundleDigest}`;
app.use(bundleBaseUrl, express.static(BUNDLE_DIR, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
}));
// tslint:disable:no-console
console.info("Serving client-bundle:");
console.info(`  Location: ${BUNDLE_DIR}`);
console.info(`  Hash: ${bundleDigest}`);
// tslint:enable:no-console

// tslint:disable-next-line:variable-name
app.get("/", (_request: express.Request, response: express.Response) => {
    response.render("index", {
        bundleBaseUrl,
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    /* tslint:disable-next-line:no-console */
    console.log(`Started Overanalyzed server on port ${PORT}`);
});
