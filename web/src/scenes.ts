import { IndexScene } from "./scene";
import { SceneDefinition } from "./util/SceneDefinition";
import { ChampionsScene } from "./scene/champions";
import { CreateLobbyScene } from "./scene/lobby/create";
import { LobbyScene } from "./scene/lobby/lobby";

export const scenes: SceneDefinition[] = [
  {
    route: "/",
    component: IndexScene,
  },
  {
    route: "/champions",
    component: ChampionsScene,
    navbarTitle: "Champions"
  },
  {
    route: "/lobby/create",
    component: CreateLobbyScene,
    navbarTitle: "Create Lobby"
  },
  {
    route: "/lobby/:lobbyId",
    component: LobbyScene
  }
];
