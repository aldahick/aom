import { mutation } from "@athenajs/core";
import { singleton } from "tsyringe";
import { IMutation } from "../graphql/types";
import { LobbyManager } from "../manager/lobby";

@singleton()
export class LobbyResolver {
  constructor(
    private lobbyManager: LobbyManager
  ) { }

  @mutation()
  async createLobby(): Promise<IMutation["createLobby"]> {
    return this.lobbyManager.data.create();
  }
}
