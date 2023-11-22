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
