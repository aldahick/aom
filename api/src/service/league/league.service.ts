import axios from "axios";
import { singleton } from "tsyringe";
import { LolApi } from "twisted";
import { ConfigService } from "../config";

const DATA_DRAGON_URL = "https://ddragon.leagueoflegends.com/cdn";

@singleton()
export class LeagueService {
  constructor(
    private config: ConfigService
  ) { }

  async getAllChampions() {
    const res = await this.getApiInstance().DataDragon.getChampion();
    return Object.values(res.data).map(c => ({
      ...c,
      avatarUrl: `${DATA_DRAGON_URL}/${c.version}/img/champion/${c.image.full}`
    }));
  }

  async getChampionSpells(id: string, version: string) {
    const { data: { data } } = await axios.get<{
      data: {
        [key: string]: {
          spells: {
            id: string;
            name: string;
            description: string;
            maxrank: number;
            image: {
              full: string;
            };
          }[];
        };
      };
    }>(`${DATA_DRAGON_URL}/${version}/data/en_US/champion/${id}.json`);
    return {
      ...data[id],
      spells: data[id].spells.map(s => ({
        ...s,
        imageUrl: `${DATA_DRAGON_URL}/${version}/img/spell/${s.image.full}`
      }))
    };
  }

  async getAllItems() {
    const version = await this.getCurrentVersion();
    const { data: { data } } = await axios.get<{
      data: {
        [id: string]: {
          name: string;
          tags: string[];
          into?: string[];
          image: {
            full: string;
          };
        };
      };
    }>(`${DATA_DRAGON_URL}/${version}/data/en_US/item.json`);
    return Object.entries(data).map(([id, item]) => ({
      id,
      name: item.name,
      isBoots: item.tags.includes("Boots"),
      isFinal: (item.into?.length || 0) === 0,
      imageUrl: `${DATA_DRAGON_URL}/${version}/img/item/${item.image.full}`
    }));
  }

  async getCurrentVersion(): Promise<string> {
    const versions = await this.getApiInstance().DataDragon.getVersions();
    return versions[0];
  }

  private getApiInstance() {
    return new LolApi({
      key: this.config.leagueKey
    });
  }
}
