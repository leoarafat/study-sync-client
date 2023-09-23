import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState<{
    otp: "";
    playbackInfo: "";
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/v1/course/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("Unable to load video data");
        setLoading(false);
      });
  }, [videoUrl]);
  console.log(videoData);
  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : videoData && videoData.otp && videoData.playbackInfo ? (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=i1a4J9832sQFnqV9`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      ) : (
        <p>Error: Invalid video data</p>
      )}
    </div>
  );
};

export default CoursePlayer;
