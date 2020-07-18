import { prop } from "@typegoose/typegoose";

export class Champion {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  imageUrl!: string;

  constructor(init?: Champion) {
    Object.assign(this, init);
  }
}
