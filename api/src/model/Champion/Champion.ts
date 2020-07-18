import { MongoService } from "@athenajs/core";
import { prop } from "@typegoose/typegoose";

export class Champion {
  @MongoService.idProp()
  _id!: string;

  @prop({ required: true })
  name!: string;
}
