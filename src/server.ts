import { Server } from "http";
import app from "./app";
import config from "./app/modules/config";

const main = async () => {
  const server: Server = app.listen(config.port, () => {
    console.log(`app is listening on port `, config.port);
  });
};

main();
