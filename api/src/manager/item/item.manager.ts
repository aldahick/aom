import { singleton } from "tsyringe";
import { Item } from "../../model/Item";
import { DatabaseService } from "../../service/database";
import { LeagueService } from "../../service/league";

@singleton()
export class ItemManager {
  constructor(
    private db: DatabaseService,
    private league: LeagueService
  ) { }

  async getAll() {
    return this.db.items.find();
  }

  async update() {
    const items = await this.league.getAllItems();
    await this.db.items.deleteMany({});
    await this.db.items.insertMany(items.map(i => new Item({
      _id: i.id,
      ...i
    })));
  }
}
