// import React, { FC, useEffect, useState } from "react";
// import axios from "axios";
// type Props = {
//   videoUrl: string;
//   title: string;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl }) => {
//   const [videoData, setVideoData] = useState({
//     otp: "",
//     playbackInfo: "",
//   });
//   useEffect(() => {
//     axios
//       .post(`http://localhost:5000/api/v1/course/getVdoCipherOTP`, {
//         videoId: videoUrl,
//       })
//       .then((res) => {
//         console.log("API Response:", res.data);
//         setVideoData({
//           otp: res.data.data.otp,
//           playbackInfo: res.data.data.playbackInfo,
//         });
//       });
//   }, [videoUrl]);
//   console.log(videoData, "Video data");
//   return (
//     <div style={{ paddingTop: "41%", position: "relative" }}>
//       <iframe
//         src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=i1a4J9832sQFnqV9`}
//         style={{
//           border: 0,
//           width: "90%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//         allowFullScreen={true}
//         allow="encrypted-media"
//       ></iframe>
//     </div>
//   );
// };

// export default CoursePlayer;
// // import React, { FC, useEffect, useState } from "react";
// // import axios from "axios";

// // type Props = {
// //   videoUrl: string;
// //   title: string;
// // };

// // const CoursePlayer: FC<Props> = ({ videoUrl }) => {
// //   const [videoData, setVideoData] = useState<{
// //     otp: "20160313versASE323q9ClyDbuCxqLqxSsl5gDXWI6IEhS3xeO0CM39Vtz4bRWXv";
// //     playbackInfo: "eyJ2aWRlb0lkIjoiMTg5MzNmNWFjMjllNGNjMmIwZDQwODliMzVmOTgzMGUifQ==";
// //   } | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     axios
// //       .post(`http://localhost:5000/api/v1/course/getVdoCipherOTP`, {
// //         videoId: videoUrl,
// //       })
// //       .then((res) => {
// //         setVideoData(res.data);
// //         setLoading(false);
// //       })
// //       .catch((error) => {
// //         console.error("API Error:", error);
// //         setError("Unable to load video data");
// //         setLoading(false);
// //       });
// //   }, [videoUrl]);
// //   console.log(videoData);
// //   return (
// //     <div style={{ paddingTop: "41%", position: "relative" }}>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : error ? (
// //         <p>{error}</p>
// //       ) : videoData && videoData.otp && videoData.playbackInfo ? (
// //         <iframe
// //           src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=i1a4J9832sQFnqV9`}
// //           style={{
// //             border: 0,
// //             width: "90%",
// //             height: "100%",
// //             position: "absolute",
// //             top: 0,
// //             left: 0,
// //           }}
// //           allowFullScreen={true}
// //           allow="encrypted-media"
// //         ></iframe>
// //       ) : (
// //         <p>Error: Invalid video data</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CoursePlayer;
import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState<{
    otp: string;
    playbackInfo: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/v1/course/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData({
          otp: res.data.data.otp || "",
          playbackInfo: res.data.data.playbackInfo || "",
        });
        setLoading(false); // Set loading to false when data is available
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false); // Set loading to false on error as well
      });
  }, [videoUrl]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "0",
        paddingTop: "56.25%",
      }}
    >
      {loading ? (
        // Centered loader using flexbox
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional background overlay
          }}
        >
          <p>Loading...</p>
        </div>
      ) : videoData && videoData.otp && videoData.playbackInfo ? (
        // Render the iframe when you have valid data
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=i1a4J9832sQFnqV9`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      ) : (
        // Render an error message if data is still not available
        <p>Error: Invalid video data</p>
      )}
    </div>
  );
};

export default CoursePlayer;
