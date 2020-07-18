import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useStores } from "../../hook/useStores";

interface FetchUrlProps {
  children: (data: string) => JSX.Element;
  url: string;
}

export const FetchUrl: React.FC<FetchUrlProps> = ({ children, url }) => {
  const [data, setData] = useState<string>();
  const { statusStore } = useStores();

  if (!data) {
    axios.get(url)
      .then(r => setData(r.data))
      .catch(err => {
        console.error(err);
        statusStore.setErrorMessage(err.message);
      });
    return <Typography>Loading...</Typography>;
  }
  return children(data);
};