import { singleton } from "tsyringe";
import { LolApi } from "twisted";
import { ConfigService } from "../config";

@singleton()
export class LeagueService {
  constructor(
    private config: ConfigService
  ) { }

  async getChampions() {
    const res = await this.getApiInstance().DataDragon.getChampion();
    return Object.values(res.data).map(c => ({
      ...c,
      avatarUrl: `https://ddragon.leagueoflegends.com/cdn/${c.version}/img/champion/${c.image.full}`
    }));
  }

  private getApiInstance() {
    return new LolApi({
      key: this.config.leagueKey
    });
  }
}
