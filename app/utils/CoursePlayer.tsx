import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

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
      .post(
        `https://study-sync-server.vercel.app/api/v1/course/getVdoCipherOTP`,
        {
          videoId: videoUrl,
        }
      )
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
  return (
    <div
      style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : videoData && videoData.otp && videoData.playbackInfo ? (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=CxyucGm71WyTpmuY`}
          style={{
            border: 0,
            width: "100%",
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
