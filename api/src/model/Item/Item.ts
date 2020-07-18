import { prop } from "@typegoose/typegoose";

export class Item {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  isBoots!: boolean;

  @prop({ required: true })
  isFinal!: boolean;

  @prop({ required: true })
  isConsumed!: boolean;

  @prop({ required: true })
  imageUrl!: string;

  @prop({ required: true, type: String })
  mapIds!: string[];

  constructor(init?: Item) {
    Object.assign(this, init);
  }
}
