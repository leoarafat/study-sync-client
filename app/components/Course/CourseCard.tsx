import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const courseLink = !isProfile
    ? `/course/${item._id}`
    : `/course-access/${item._id}`;

  return (
    <Link href={courseLink}>
      <div className="w-full min-h-[35vh] bg-slate-500 bg-opacity-20 backdrop-blur border border-[#ffffff1d]  shadow-[bg-slate] rounded-lg p-3    shadow-inner">
        <Image
          src={item.thumbnail.url}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />
        <h1 className="font-Poppins text-[16px] text-[#fff]">{item.name}</h1>
        <div className="w-full flex items-center justify-between pt-2">
          Ratings: {item.ratings}/5
          <h5
            className={`text-[#fff] ${isProfile ? "hidden 800px:inline" : ""}`}
          >
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-[#fff]">{item.price ? "Free" : item.price}</h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-[#fff]">
              {item.estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-[#fff]">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
