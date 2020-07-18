import { singleton } from "tsyringe";
import { Champion } from "../../model/Champion";
import { DatabaseService } from "../../service/database";
import { LeagueService } from "../../service/league";

@singleton()
export class ChampionManager {
  constructor(
    private db: DatabaseService,
    private league: LeagueService
  ) { }

  async getAll() {
    return this.db.champions.find();
  }

  async update() {
    const champions = await this.league.getChampions();
    await this.db.champions.deleteMany({});
    await this.db.champions.insertMany(champions.map(c => new Champion({
      _id: c.id,
      name: c.name,
      imageUrl: c.avatarUrl
    })));
  }
}
