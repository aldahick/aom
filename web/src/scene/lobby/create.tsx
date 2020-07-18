import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { IMutation } from "../../graphql/types";
import gql from "graphql-tag";
import { Grid, Button } from "@material-ui/core";
import { useStores } from "../../hook/useStores";
import { callMutationSafe } from "../../util/graphql";
import { Redirect } from "react-router";

const MUTATION_CREATE_LOBBY = gql`
mutation Web_CreateLobby {
  lobby: createLobby {
    _id
  }
}
`;

export const CreateLobbyScene: React.FC = () => {
  const [createLobby] = useMutation<{ lobby: IMutation["createLobby"] }>(MUTATION_CREATE_LOBBY);
  const [lobbyId, setLobbyId] = useState<string>();
  const { statusStore } = useStores();

  const create = async () => {
    try {
      const { lobby } = await callMutationSafe(createLobby, {});
      setLobbyId(lobby._id);
    } catch (err) {
      statusStore.setErrorMessage(err.message);
    }
  };

  if (lobbyId) {
    return <Redirect to={`/lobby/${lobbyId}`} />;
  }

  return (
    <Grid container>
      <Grid item>
        <Button variant="contained" onClick={create}>Create Lobby</Button>
      </Grid>
    </Grid>
  );
};
