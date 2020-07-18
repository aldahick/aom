import { prop } from "@typegoose/typegoose";

export class Map {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  name!: string;

  constructor(init: Map) {
    Object.assign(this, init);
  }
}
