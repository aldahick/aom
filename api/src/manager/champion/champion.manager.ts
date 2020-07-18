import { HttpError,LoggerService } from "@athenajs/core";
import { singleton } from "tsyringe";
import { Champion, ChampionSpell } from "../../model/Champion";
import { DatabaseService } from "../../service/database";
import { LeagueService } from "../../service/league";

@singleton()
export class ChampionManager {
  constructor(
    private db: DatabaseService,
    private league: LeagueService,
    private logger: LoggerService
  ) { }

  async get(id: string): Promise<Champion> {
    const champion = await this.db.champions.findById(id);
    if (!champion) {
      throw HttpError.notFound(`Champion id=${id} not found`);
    }
    return champion;
  }

  async getAll(): Promise<Champion[]> {
    return this.db.champions.find();
  }

  async update(): Promise<void> {
    const rawChampions = await this.league.getAllChampions();
    await this.db.champions.deleteMany({});
    for (const { id, name, avatarUrl, version } of rawChampions) {
      const { spells } = await this.league.getChampionSpells(id, version);
      await this.db.champions.create(new Champion({
        _id: id,
        name,
        imageUrl: avatarUrl,
        spells: spells.map(s => new ChampionSpell({
          _id: s.id,
          name: s.name,
          maxRank: s.maxrank,
          imageUrl: s.imageUrl
        }))
      }));
      this.logger.trace({ championName: name }, "championManager.update");
    }
  }
}
