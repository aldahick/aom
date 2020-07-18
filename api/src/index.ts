import { Application, container } from "@athenajs/core";
import "reflect-metadata";
import * as resolvers from "./resolver";
import { DatabaseService } from "./service/database";

const main = async () => {
  const app = new Application();

  const db = container.resolve(DatabaseService);
  await db.init();

  await app.registry.resolver.register(Object.values(resolvers), {
    schemaDir: `${__dirname}/../graphql`
  });

  await app.start();
};

// eslint-disable-next-line no-console
main().catch(console.error);
