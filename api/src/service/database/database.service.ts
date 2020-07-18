import { MongoService } from "@athenajs/core";
import { ReturnModelType } from "@typegoose/typegoose";
import { singleton } from "tsyringe";
import { Champion } from "../../model/Champion";
import { Item } from "../../model/Item";
import { Lobby } from "../../model/Lobby";
import { ConfigService } from "../config";

@singleton()
export class DatabaseService {
  champions!: ReturnModelType<typeof Champion>;
  items!: ReturnModelType<typeof Item>;
  lobbies!: ReturnModelType<typeof Lobby>;

  constructor(
    private config: ConfigService,
    private mongo: MongoService
  ) { }

  async init() {
    await this.mongo.init(this.config.mongoUrl);

    this.champions = this.mongo.getModel(Champion, "champions");
    this.items = this.mongo.getModel(Item, "items");
    this.lobbies = this.mongo.getModel(Lobby, "lobbies");
  }
}
