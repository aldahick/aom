import { prop } from "@typegoose/typegoose";

export class Item {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  isFinal!: boolean;

  @prop({ required: true })
  isConsumed!: boolean;

  @prop({ required: true })
  imageUrl!: string;

  @prop({ required: true, type: String })
  mapIds!: string[];

  @prop()
  cost?: number;

  @prop({ required: true, type: String })
  tags!: string[];

  @prop({ required: true, type: String })
  metadata!: string[];

  constructor(init?: Item) {
    Object.assign(this, init);
  }
}
