import React from "react";
import { Grid, Typography } from "@material-ui/core";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { IQuery } from "../graphql/types";
import { checkQueryResult } from "../util/graphql";

const QUERY_CHAMPIONS = gql`
query Web_Champions {
  champions {
    name
    imageUrl
  }
}
`;

export const ChampionsScene: React.FC = () => checkQueryResult<{ champions: IQuery["champions"] }>(({ champions }) => (
  <Grid container>
    {champions.map(({ name, imageUrl }) => (
      <Grid item>
        <Typography>{name}</Typography>
        <img src={imageUrl} alt={`${name}'s avatar`} title={name} />
      </Grid>
    ))}
  </Grid>
))(useQuery(QUERY_CHAMPIONS));
