import { IndexScene } from "./scene";
import { SceneDefinition } from "./util/SceneDefinition";
import { ChampionsScene } from "./scene/champions";

export const scenes: SceneDefinition[] = [
  {
    route: "/",
    component: IndexScene,
  },
  {
    route: "/champions",
    component: ChampionsScene,
    navbarTitle: "Champions"
  }
];
