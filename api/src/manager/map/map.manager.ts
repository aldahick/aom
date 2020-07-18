import { singleton } from "tsyringe";
import { Map } from "../../model/Map";
import { DatabaseService } from "../../service/database";
import { LeagueService } from "../../service/league";

@singleton()
export class MapManager {
  constructor(
    private db: DatabaseService,
    private league: LeagueService
  ) { }

  async getAll() {
    return this.db.maps.find();
  }

  async update() {
    const maps = await this.league.getAllMaps();
    await this.db.maps.deleteMany({});
    await this.db.maps.insertMany(maps.map(m => new Map({
      _id: m.id,
      name: m.name
    })));
  }
}
