import { Application, container } from "@athenajs/core";
import "reflect-metadata";
import * as resolvers from "./resolver";
import { DatabaseService } from "./service/database";
import * as websocketHandlers from "./websocket";

const main = async () => {
  const app = new Application();

  const db = container.resolve(DatabaseService);
  await db.init();

  await app.registry.resolver.register(Object.values(resolvers), {
    schemaDir: `${__dirname}/../graphql`
  });

  await app.start();

  app.registry.websocket.register(Object.values(websocketHandlers));
};

// eslint-disable-next-line no-console
main().catch(console.error);
