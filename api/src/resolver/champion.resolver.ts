import { mutation,query } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IMutation,IQuery,IQueryChampionArgs } from "../graphql/types";
import { ChampionManager } from "../manager/champion";

@singleton()
export class ChampionResolver {
  constructor(
    private championManager: ChampionManager
  ) { }

  @query()
  async champion(root: void, { id }: IQueryChampionArgs): Promise<IQuery["champion"]> {
    return this.championManager.get(id);
  }

  @query()
  async champions(): Promise<IQuery["champions"]> {
    return this.championManager.getAll();
  }

  @mutation()
  async updateChampions(): Promise<IMutation["updateChampions"]> {
    await this.championManager.update();
    return true;
  }
}
