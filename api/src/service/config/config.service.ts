import { BaseConfigService, ConfigUtils } from "@athenajs/core";
import { singleton } from "tsyringe";

@singleton()
export class ConfigService extends BaseConfigService {
  leagueKey = ConfigUtils.required("LEAGUE_KEY");

  mongoUrl = ConfigUtils.required("MONGO_URL");
}
