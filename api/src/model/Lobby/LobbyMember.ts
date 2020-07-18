import { MongoService } from "@athenajs/core";
import { prop } from "@typegoose/typegoose";
import * as randomstring from "randomstring";

export class LobbyMember {
  @MongoService.idProp()
  _id!: string;

  @prop({ required: true })
  summonerName!: string;

  @prop({ required: true })
  socketId!: string;

  @prop({ required: true })
  joinedAt!: Date;

  @prop()
  championId?: string;

  @prop()
  spellId?: string;

  @prop({ type: String })
  itemIds?: string[];

  constructor(init?: Omit<LobbyMember, "_id">) {
    Object.assign(this, {
      _id: randomstring.generate(),
      ...init
    });
  }
}
