import { mutation,query } from "@athenajs/core";
import { singleton } from "tsyringe";
import { ChampionManager } from "../manager/champion";

@singleton()
export class ChampionResolver {
  constructor(
    private championManager: ChampionManager
  ) { }

  @query()
  async champions() {
    return this.championManager.getAll();
  }

  @mutation()
  async updateChampions() {
    await this.championManager.update();
    return true;
  }
}
