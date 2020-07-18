import React, { useState } from "react";
import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select,
} from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation, useQuery } from "react-apollo";
import { Redirect } from "react-router";
import { IMutation, IMutationCreateLobbyArgs, IQuery } from "../../graphql/types";
import { useStores } from "../../hook/useStores";
import { callMutationSafe, checkQueryResult } from "../../util/graphql";

const QUERY_MAPS = gql`
query Web_Maps {
  maps {
    _id
    name
  }
}
`;

const MUTATION_CREATE_LOBBY = gql`
mutation Web_CreateLobby($mapId: String!) {
  lobby: createLobby(mapId: $mapId) {
    _id
  }
}
`;

export const CreateLobbyScene: React.FC = () => {
  const [createLobby] = useMutation<{ lobby: IMutation["createLobby"] }, IMutationCreateLobbyArgs>(MUTATION_CREATE_LOBBY);
  const mapsResult = useQuery(QUERY_MAPS);

  const [lobbyId, setLobbyId] = useState<string>();
  const [mapId, setMapId] = useState<string>("");
  const { statusStore } = useStores();

  const create = async () => {
    if (!mapId) {
      statusStore.setErrorMessage("You must select a map!");
      return;
    }
    try {
      const { lobby } = await callMutationSafe(createLobby, {
        mapId,
      });
      setLobbyId(lobby._id);
    } catch (err) {
      statusStore.setErrorMessage(err.message);
    }
  };

  if (lobbyId) {
    return <Redirect to={`/lobby/${lobbyId}`} />;
  }

  return checkQueryResult<{ maps: IQuery["maps"] }>(({ maps }) => (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel>Map</InputLabel>
          <Select fullWidth value={mapId} onChange={evt => setMapId(evt.target.value as string)}>
            {maps.map(map => (
              <MenuItem key={map._id} value={map._id}>
                {map.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={create}>Create Lobby</Button>
      </Grid>
    </Grid>
  ))(mapsResult);
};
