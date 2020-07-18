import { HttpError } from "@athenajs/core";
import * as _ from "lodash";
import { singleton } from "tsyringe";
import { Item } from "../../model/Item";
import { Lobby, LobbyMember } from "../../model/Lobby";
import { DatabaseService } from "../../service/database";
import { ChampionManager } from "../champion";
import { ItemManager } from "../item";

@singleton()
export class LobbyDataManager {
  constructor(
    private championManager: ChampionManager,
    private db: DatabaseService,
    private itemManager: ItemManager
  ) { }

  async get(id: string | undefined): Promise<Lobby> {
    const lobby = id ? await this.db.lobbies.findById(id) : undefined;
    if (!lobby) {
      throw HttpError.notFound(`Lobby id=${id} not found`);
    }
    return lobby;
  }

  async create() {
    return this.db.lobbies.create(new Lobby({
      createdAt: new Date(),
      members: []
    }));
  }

  async join(lobby: Lobby, summonerName: string, socketId: string) {
    if (lobby.members.some(n => n.summonerName === summonerName)) {
      throw HttpError.conflict("Someone already has that name!");
    }
    await this.db.lobbies.updateOne({
      _id: lobby._id
    }, {
      $push: {
        members: new LobbyMember({
          summonerName,
          socketId,
          joinedAt: new Date()
        })
      }
    });
  }

  async removeMember(lobby: Lobby, memberId: string): Promise<void> {
    await this.db.lobbies.updateOne({
      _id: lobby._id
    }, {
      $pull: {
        members: {
          _id: memberId
        }
      }
    });
  }

  async roll(lobby: Lobby, memberId: string): Promise<void> {
    const champions = await this.championManager.getAll();
    const allItems = await this.itemManager.getAll();

    const champion = champions[_.random(champions.length - 1)];
    const spell = champion.spells[_.random(champion.spells.length - 1)];

    const boots = allItems.filter(i => i.isBoots);
    const items: Item[] = [boots[_.random(boots.length - 1)]];

    const nonBoots = allItems.filter(i => !i.isBoots);
    _.range(5).forEach(() => {
      const index = _.random(nonBoots.length - 1);
      items.push(nonBoots.splice(index, 1)[0]);
    });

    const memberIndex = lobby.members.findIndex(m => m._id === memberId);
    await this.db.lobbies.updateOne({
      _id: lobby._id
    }, {
      $set: {
        [`members.${memberIndex}.championId`]: champion._id,
        [`members.${memberIndex}.spellId`]: spell._id,
        [`members.${memberIndex}.itemIds`]: items.map(i => i._id)
      }
    });
  }
}
