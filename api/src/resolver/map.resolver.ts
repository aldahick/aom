import { mutation,query } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IMutation,IQuery } from "../graphql/types";
import { MapManager } from "../manager/map";

@singleton()
export class MapResolver {
  constructor(
    private mapManager: MapManager
  ) { }

  @query()
  async maps(): Promise<IQuery["maps"]> {
    return this.mapManager.getAll();
  }

  @mutation()
  async updateMaps(): Promise<IMutation["updateMaps"]> {
    await this.mapManager.update();
    return true;
  }
}
