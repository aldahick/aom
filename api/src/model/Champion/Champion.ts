import { prop } from "@typegoose/typegoose";
import { ChampionSpell } from "./ChampionSpell";

export class Champion {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  imageUrl!: string;

  @prop({ required: true, type: ChampionSpell, _id: false })
  spells!: ChampionSpell[];

  constructor(init?: Champion) {
    Object.assign(this, init);
  }
}
