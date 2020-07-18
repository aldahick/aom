import { websocketEvent, WebsocketPayload } from "@athenajs/core";
import { singleton } from "tsyringe";
import { ILobbyClientJoinPayload } from "../graphql/types";
import { LobbyManager } from "../manager/lobby";
import { Lobby } from "../model/Lobby";

@singleton()
export class LobbyWebsocketHandler {
  constructor(
    private lobbyManager: LobbyManager
  ) { }

  @websocketEvent("disconnect")
  async onDisconnect({ socket }: WebsocketPayload<void, any>) {
    let lobby: Lobby;
    try {
      lobby = await this.lobbyManager.socket.getLobby(socket);
    } catch (err) {
      // oh well
      return;
    }
    const member = this.lobbyManager.socket.getMember(lobby, socket);
    await this.lobbyManager.data.removeMember(lobby, member._id);
    await this.lobbyManager.socket.sendMembers(lobby._id);
  }

  @websocketEvent("lobby.client.join")
  async onJoin({ socket, data: { lobbyId, summonerName } }: WebsocketPayload<ILobbyClientJoinPayload, any>) {
    const lobby = await this.lobbyManager.data.get(lobbyId);
    await this.lobbyManager.data.join(lobby, summonerName, socket.id);
    this.lobbyManager.socket.setLobbyId(socket, lobby._id);
    // the client won't know they've joined until this returns - give them
    // a moment to prepare to receive events
    socket.emit("lobby.client.join", true);
    await this.lobbyManager.socket.sendMembers(lobby._id);
  }

  @websocketEvent("lobby.client.roll")
  async onRoll({ socket }: WebsocketPayload<void, any>) {
    const lobby = await this.lobbyManager.socket.getLobby(socket);
    const member = this.lobbyManager.socket.getMember(lobby, socket);
    await this.lobbyManager.data.roll(lobby, member._id);
    await this.lobbyManager.socket.sendMembers(lobby._id);
  }
}
