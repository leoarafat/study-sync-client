/* eslint-disable @next/next/no-img-element */
import "./Factors.css";
import dynamic from "next/dynamic";

const Factors = () => {
  return (
    <div className="bg-opacity-50 bg-gradient-to-b from-gray-900 to-black pt-5">
      <div className="w-[90%] 800px:w-[80%] flex flex-col justify-center items-center m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-white 800px:leading-[60px] font-[700] tracking-tight">
          How Much Can You Develop{" "}
          <span className="text-gradient">Your Self</span>{" "}
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 xl:gap-[35px]  border-0 ">
          <div className="book w-full">
            <p className=" pl-10">
              You will get everything from the beginning of your journey until
              you get an internship or a full-time job.
            </p>
            <div className="cover flex flex-col">
              <h1 className="text-white font-semibold text-[25px]">
                Become a pro
              </h1>
              <img
                className="h-[280px]"
                src="https://res.cloudinary.com/arafatleo/image/upload/v1700665134/Courses/Superhero-pose-in-action-on-transparent-background-PNG-removebg-preview_txe3ej.png"
                alt="Pro"
              />
            </div>
          </div>
          <div className="book">
            <p className=" pl-10">
              Dedicated 17+ Job Placement Managers will help you to find a job
              locally and internationally.
            </p>
            <div className="cover flex flex-col">
              <h1 className="text-white font-semibold text-[25px] pb-6">
                Offer Jobs
              </h1>
              <img
                className="h-[280px]"
                src="https://res.cloudinary.com/arafatleo/image/upload/v1700665134/Courses/Work-Abroad-for-a-Year-removebg-preview_l8mlx6.png"
                alt="Pro"
              />
            </div>
          </div>
          <div className="book">
            <p className=" pl-10">
              You can Join one to one live support sessions three times a day.
              It is guaranteed to get answers to every question within 10 hours.
            </p>
            <div className="cover flex flex-col">
              <h1 className="text-white font-semibold text-[25px]">
                Unlimited Support
              </h1>
              <img
                className="w-[280px]"
                src="https://res.cloudinary.com/arafatleo/image/upload/v1700665134/Courses/pngtree-women-contact-support-flat-illustration-vector-png-image_2269867-removebg-preview_zesoa5.png"
                alt="Pro"
              />
            </div>
          </div>
          <div className="book">
            <p className=" pl-10">
              After completing the course seriously in time you will get access
              to (Redux, Node, Mongodb)
            </p>
            <div className="cover flex flex-col">
              <h1 className="text-white font-semibold text-[25px] mb-10">
                Crash Course
              </h1>
              <img
                className="h-[280px]"
                src="https://res.cloudinary.com/arafatleo/image/upload/v1700665135/Courses/png-transparent-video-production-freemake-video-er-video-icon-free-angle-text-rectangle-removebg-preview_xc6j7o.png"
                alt="Pro"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Factors;
export default dynamic(() => Promise.resolve(Factors), {
  ssr: false,
});
