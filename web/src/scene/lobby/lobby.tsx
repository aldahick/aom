import React, { useState } from "react";
import { useRouteMatch } from "react-router";
import { useStores } from "../../hook/useStores";
import { LobbyJoinForm } from "../../component/lobby/LobbyJoinForm";
import { LobbyMembers } from "../../component/lobby/LobbyMembers";
import { Grid, makeStyles } from "@material-ui/core";
import { LobbyRollButton } from "../../component/lobby/LobbyRollButton";

export const LobbyScene: React.FC = () => {
  const { params: { lobbyId } } = useRouteMatch<{ lobbyId: string }>();
  const [joined, setJoined] = useState(false);
  const { socketStore } = useStores();

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