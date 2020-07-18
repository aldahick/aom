import { mutation } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IMutation, IMutationCreateLobbyArgs } from "../graphql/types";
import { LobbyManager } from "../manager/lobby";
import { MapManager } from "../manager/map";

@singleton()
export class LobbyResolver {
  constructor(
    private lobbyManager: LobbyManager,
    private mapManager: MapManager
  ) { }

  @mutation()
  async createLobby(root: void, { mapId }: IMutationCreateLobbyArgs): Promise<IMutation["createLobby"]> {
    const map = await this.mapManager.get(mapId);
    return this.lobbyManager.data.create(map);
  }
}
