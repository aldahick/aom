import { singleton } from "tsyringe";
import { LobbyDataManager } from "./lobbyData.manager";
import { LobbySocketManager } from "./lobbySocket.manager";

@singleton()
export class LobbyManager {
  constructor(
    readonly data: LobbyDataManager,
    readonly socket: LobbySocketManager
  ) { }
}
