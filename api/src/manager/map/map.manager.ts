import { HttpError } from "@athenajs/core";
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

  async get(id: string): Promise<Map> {
    const map = await this.db.maps.findById(id);
    if (!map) {
      throw HttpError.notFound(`Map id=${id} not found`);
    }
    return map;
  }

  async getAll(): Promise<Map[]> {
    return this.db.maps.find();
  }

  async update(): Promise<void> {
    const maps = await this.league.getAllMaps();
    await this.db.maps.deleteMany({});
    await this.db.maps.insertMany(maps.map(m => new Map({
      _id: m.id,
      name: m.name
    })));
  }
}
