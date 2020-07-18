import { BaseConfigService, ConfigUtils } from "@athenajs/core";
import { singleton } from "tsyringe";

@singleton()
export class ConfigService extends BaseConfigService {
  mongoUrl = ConfigUtils.required("MONGO_URL");
}
