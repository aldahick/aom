export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};


export type IChampion = {
  __typename?: 'Champion';
  _id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  spells: Array<IChampionSpell>;
};

export type IMutation = {
  __typename?: 'Mutation';
  updateChampions: Scalars['Boolean'];
  createLobby: ILobby;
};

export type IQuery = {
  __typename?: 'Query';
  champion: IChampion;
  champions: Array<IChampion>;
};


export type IQueryChampionArgs = {
  id: Scalars['String'];
};

export type IChampionSpell = {
  __typename?: 'ChampionSpell';
  _id: Scalars['String'];
  name: Scalars['String'];
  maxRank: Scalars['Int'];
  imageUrl: Scalars['String'];
};

export type ILobby = {
  __typename?: 'Lobby';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type ILobbyMember = {
  __typename?: 'LobbyMember';
  summonerName: Scalars['String'];
  champion?: Maybe<IChampion>;
  spell?: Maybe<IChampionSpell>;
};

/** lobby.client.join */
export type ILobbyClientJoinPayload = {
  __typename?: 'LobbyClientJoinPayload';
  lobbyId: Scalars['String'];
  summonerName: Scalars['String'];
};

/** lobby.server.members */
export type ILobbyServerMembersPayload = {
  __typename?: 'LobbyServerMembersPayload';
  members: Array<ILobbyMember>;
};

export enum ICacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

