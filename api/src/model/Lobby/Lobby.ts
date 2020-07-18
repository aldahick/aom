import { MongoService } from "@athenajs/core";
import { prop } from "@typegoose/typegoose";
import { LobbyMember } from "./LobbyMember";

export class Lobby {
  @MongoService.idProp()
  _id!: string;

  @prop({ required: true })
  createdAt!: Date;

  @prop({ required: true, type: LobbyMember })
  members!: LobbyMember[];

  constructor(init?: Omit<Lobby, "_id">) {
    Object.assign(this, init);
  }
}
