import { MongoService } from "@athenajs/core";
import { ReturnModelType } from "@typegoose/typegoose";
import { singleton } from "tsyringe";
import { Champion } from "../../model/Champion";
import { ConfigService } from "../config";

@singleton()
export class DatabaseService {
  champions!: ReturnModelType<typeof Champion>;

  constructor(
    private config: ConfigService,
    private mongo: MongoService
  ) { }

  async init() {
    await this.mongo.init(this.config.mongoUrl);

    this.champions = this.mongo.getModel(Champion, "champions");
  }
}
