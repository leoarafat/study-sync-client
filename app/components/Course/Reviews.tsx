import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "./ReviewCard";
import { reviews } from "../Shared/MockData";

type Props = {};

const Reviews = (props: Props) => {
  return (
    <div className="bg-opacity-50 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-[90%] 800px:w-[85%] m-auto">
        <div className="w-full 800px:flex items-center">
          <div className="800px:w-[50%] w-full">
            <Image
              src={require("../../../public/assests/Online Review-pana.png")}
              alt="business"
              width={700}
              height={700}
            />
          </div>
          <div className="800px:w-[50%] w-full">
            <h3 className={`${styles.title} 800px:!text-[40px]`}>
              Our Students Are{" "}
              <span className="text-gradient">Our Strength</span> <br /> See
              What They Say About Us
            </h3>
            <br />
            <p className={styles.label}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              unde voluptatum dignissimos, nulla perferendis dolorem voluptate
              nemo possimus magni deleniti natus accusamus officiis quasi nihil
              commodi, praesentium quidem, quis doloribus?
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[25px] border-0 ">
          {reviews &&
            reviews.map((item, index) => (
              <div className="" key={index}>
                <ReviewCard item={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
