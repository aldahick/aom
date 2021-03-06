import axios from "axios";
import * as _ from "lodash";
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
          consumed?: boolean;
          tags: string[];
          into?: string[];
          from?: string[];
          colloq?: string;
          image: {
            full: string;
          };
          maps: {[key: string]: boolean};
          gold: {
            total: number;
            purchasable: boolean;
          };
        };
      };
    }>(`${DATA_DRAGON_URL}/${version}/data/en_US/item.json`);
    return Object.entries(data).map(([id, item]) => ({
      id,
      name: item.name,
      tags: item.tags,
      metadata: _.uniq(_.compact(item.colloq?.split(";").map(t => t.toLowerCase().trim()))).sort(),
      cost: item.gold.purchasable ? item.gold.total : undefined,
      isFinal: item.from ? item.from.length > 0 : false,
      isConsumed: !!item.consumed,
      imageUrl: `${DATA_DRAGON_URL}/${version}/img/item/${item.image.full}`,
      mapIds: Object.entries(item.maps).filter(([, isActive]) => isActive).map(([mapId]) => mapId)
    }));
  }

  async getAllMaps() {
    const maps = await this.getApiInstance().DataDragon.getMaps();
    const items = await this.getAllItems();
    const mapIds = _.uniq(_.flatten(items.map(i => i.mapIds)));
    console.log(mapIds, maps);
    return maps.map(m => ({
      id: m.mapId.toString(),
      name: m.mapName
    })).filter(m => mapIds.includes(m.id));
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
