import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useRouteMatch } from "react-router";
import { LobbyJoinForm } from "../../component/lobby/LobbyJoinForm";
import { LobbyMembers } from "../../component/lobby/LobbyMembers";
import { LobbyRollButton } from "../../component/lobby/LobbyRollButton";

export const LobbyScene: React.FC = () => {
  const { params: { lobbyId } } = useRouteMatch<{ lobbyId: string }>();
  const [joined, setJoined] = useState(false);

  if (!joined) {
    return <LobbyJoinForm lobbyId={lobbyId} onJoin={() => setJoined(true)} />;
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <LobbyRollButton />
      </Grid>
      <Grid item>
        <LobbyMembers />
      </Grid>
    </Grid>
  );
};
