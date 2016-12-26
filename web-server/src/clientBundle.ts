import * as crypto from "crypto";
import {
    Express,
    static as staticMiddleware,
} from "express";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

const STATIC_CACHE_MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 1 year

export function configureClientBundle(server: Express): string {
    const BUNDLE_DIR = path.join(process.cwd(), "build", "web-server", "client-bundle");
    const bundleHash = crypto.createHash("md5");
    fs.readdirSync(BUNDLE_DIR).forEach((file) => {
        const content = fs.readFileSync(path.join(BUNDLE_DIR, file)).toString();
        bundleHash.update(content);
    });
    const bundleDigest = bundleHash.digest("hex");
    const bundleBaseUrl = `/static/${bundleDigest}`;
    server.use(bundleBaseUrl, staticMiddleware(BUNDLE_DIR, {
        maxAge: STATIC_CACHE_MAX_AGE,
    }));
    // tslint:disable:no-console
    console.log("Serving client-bundle:");
    console.log(`  Location: ${BUNDLE_DIR}`);
    console.log(`  Hash: ${bundleDigest}`);
    // tslint:enable:no-console
    return bundleBaseUrl;
}
