import React, { useEffect, useState } from "react";
import axios from "axios";

const EpisodeData = (props) => {
  const [episodeData, setEpisodeData] = useState();

  useEffect(() => {
    axios
      .get(props.data)
      .then((res) => {
        return setEpisodeData(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  useEffect(() => {}, [episodeData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
      }}
    >
      {episodeData ? (
        <div>
          <h5>Episode ID: {episodeData.id}</h5>
          <h5>Episode Name: {episodeData.name}</h5>
          <h5>Episode Air Date: {episodeData.air_date}</h5>
          <h5>Episode Code: {episodeData.episode}</h5>
        </div>
      ) : (
        <div>No available data</div>
      )}
    </div>
  );
};

export default EpisodeData;
