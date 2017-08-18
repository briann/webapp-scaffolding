import * as bodyparser from "body-parser";
import * as compression from "compression";
import * as config from "config";
import * as express from "express";

import { configureClientBundle } from "./clientBundle";

const server = express();
server.set("view engine", "pug");
server.set("views", "./web-server/templates");
server.use(compression());
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: true}));
const bundleBaseUrl = configureClientBundle(server);

// tslint:disable-next-line:variable-name
server.get("/", (_request: express.Request, response: express.Response) => {
    response.render("index", {
        bundleBaseUrl,
    });
});

const port = config.get("server.port");
server.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
