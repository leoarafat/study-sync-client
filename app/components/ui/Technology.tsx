/* eslint-disable @next/next/no-img-element */
import Marquee from "react-fast-marquee";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Technologies } from "../Shared/TechData";

const Technology = () => {
  return (
    <div className="bg-opacity-50 bg-gradient-to-b from-gray-900 to-black pt-5">
      <div className="w-[90%] 800px:w-[80%] flex flex-col justify-center items-center m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-white 800px:leading-[60px] font-[700] tracking-tight">
          What Will You Learn?
        </h1>
        <br />
        <br />
        <div>
          <Marquee>
            <div className="flex items-center">
              {Technologies?.map((logo) => (
                <div
                  key={logo.title}
                  className="group flex flex-col items-center p-4 transition-transform transform hover:scale-105 rounded-lg overflow-hidden cursor-pointer"
                >
                  <div className="mb-4">
                    <Image
                      width={200}
                      height={200}
                      src={logo.logo}
                      alt={logo.title}
                    />
                    <p className="text-lg font-semibold text-center mt-2">
                      {logo.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Technology), {
  ssr: false,
});
