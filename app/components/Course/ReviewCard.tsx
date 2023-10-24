// import Ratings from "@/app/utils/Ratings";
// import Image from "next/image";
// import React from "react";

// type Props = {
//   item: any;
// };

// const ReviewCard = (props: Props) => {
//   return (
//     <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffffid] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
//       <div className="flex w-full">
//         <Image
//           src={props?.item.avatar}
//           alt=""
//           width={50}
//           height={50}
//           className="w-[50px] h-[50px] rounded-full object-cover"
//         />
//         <div className="w-full flex justify-between">
//           <div className="pl-4">
//             <h5 className="text-20px text-black dark:text-white">
//               {props.item.name}
//             </h5>
//             <h6 className="text-16px text-#000 dark:text-[#ffffffab]">
//               {props.item.profession}
//             </h6>
//           </div>
//           <Ratings rating={props.item.ratings} />
//         </div>
//         {/* for mobile */}
//         <div className="hidden 800px:flex justify-between w-full flex-col">
//           <div className="pl-4">
//             <h5 className="text-20px text-black dark:text-white">
//               {props.item.name}
//             </h5>
//             <h6 className="text-16px text-#000 dark:text-[#ffffffab]">
//               {props.item.profession}
//             </h6>
//           </div>
//           <Ratings rating={props.item.ratings} />
//         </div>
//       </div>
//       <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
//         {props?.item?.comment}
//       </p>
//     </div>
//   );
// };

// export default ReviewCard;
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 mb-4">
      <div className="flex items-center">
        <div className="mr-4">
          <Image
            src={props?.item.avatar}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">
            {props.item.name}
          </h3>
          <p className="text-lg text-gray-400">{props.item.profession}</p>
          <div className="mt-2">
            <Ratings rating={5} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-300">{props?.item?.comment}</p>
    </div>
  );
};

export default ReviewCard;
