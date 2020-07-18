import { prop } from "@typegoose/typegoose";

export class ChampionSpell {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  maxRank!: number;

  @prop({ required: true })
  imageUrl!: string;

  constructor(init?: ChampionSpell) {
    Object.assign(this, init);
  }
}
