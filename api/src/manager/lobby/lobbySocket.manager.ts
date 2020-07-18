import { HttpError,WebsocketRegistry } from "@athenajs/core";
import { singleton } from "tsyringe";
import { ILobbyServerMembersPayload } from "../../graphql/types";
import { Lobby, LobbyMember } from "../../model/Lobby";
import { ChampionManager } from "../champion";
import { ItemManager } from "../item";
import { LobbyDataManager } from "./lobbyData.manager";

@singleton()
export class LobbySocketManager {
  constructor(
    private championManager: ChampionManager,
    private itemManager: ItemManager,
    private lobbyDataManager: LobbyDataManager,
    private websocketRegistry: WebsocketRegistry
  ) { }

  private get io(): SocketIO.Server {
    return this.websocketRegistry.io;
  }

  setLobbyId(socket: SocketIO.Socket, lobbyId: string): void {
    (socket as any).lobbyId = lobbyId;
  }

  getLobbyId(socket: SocketIO.Socket): string | undefined {
    return (socket as any).lobbyId;
  }

  async getLobby(socket: SocketIO.Socket): Promise<Lobby> {
    return this.lobbyDataManager.get(this.getLobbyId(socket));
  }

  getMember(lobby: Lobby, socket: SocketIO.Socket): LobbyMember {
    const member = lobby.members.find(m => m.socketId === socket.id);
    if (!member) {
      throw HttpError.notFound(`Lobby member socketId=${socket.id}`);
    }
    return member;
  }

  async sendMembers(lobbyId: string): Promise<void> {
    const lobby = await this.lobbyDataManager.get(lobbyId);
    const champions = await this.championManager.getAll();
    const items = await this.itemManager.getAll({ isFinal: true });

    const payload: ILobbyServerMembersPayload = {
      members: lobby.members.map(m => {
        const champion = m.championId ? champions.find(c => c._id === m.championId) : undefined;
        return {
          summonerName: m.summonerName,
          champion,
          spell: (champion && m.spellId) ? champion.spells.find(s => s._id === m.spellId) : undefined,
          items: m.itemIds ? m.itemIds.map(id => items.find(i => i._id === id)!) : undefined
        };
      })
    };

    for (const member of lobby.members) {
      this.io.to(member.socketId).emit("lobby.server.members", payload);
    }
  }
}
