import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { FC, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Loader from "../Loader/Loader";
import defaultUser from "../../../public/assests/user2.png";
import Image from "next/image";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import Ratings from "@/app/utils/Ratings";
type Props = {
  user: any;
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  refetch: any;
};

const CourseContentMedia: FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  //!
  const [question, setQuestion] = useState("");
  const [activeBar, setActiveBar] = useState(0);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  //!
  const [
    addNewQuestion,
    { isLoading: questionCreationLoading, isSuccess, error },
  ] = useAddNewQuestionMutation();
  //!
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  //!
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  //!

  const { data: course, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  //!
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    //
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review successfully");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [
    answerError,
    answerSuccess,
    error,
    isSuccess,
    refetch,
    reviewError,
    reviewSuccess,
    courseRefetch,
  ]);

  if (!data || !data[activeVideo]?.videoUrl || !data[activeVideo]?.title) {
    return <Loader />;
  }
  console.log(course?.data?.reviews);
  // console.log(data[0]._id);
  const isReviewExists = course?.data?.reviews?.find(
    (item: any) => item._id === user?._id
  );

  //!
  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      // console.log(question, id, data[0]._id);
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  //!
  const handleAnswerSubmit = () => {
    console.log(answer, id, data[activeVideo]?._id, questionId);
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]?._id,
      questionId,
    });
  };
  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({
        review,
        rating,
        courseId: id,
      });
    }
  };
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white  !flex items-center !w-[unset]  !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-not-allowed opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } text-white  !flex items-center !w-[unset] !min-h-[40px] !py-[unset] ${
            data?.length - 1 === activeVideo &&
            "!cursor-not-allowed opacity-[.8]"
          }`}
          onClick={() => {
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            );
          }}
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="dark:text-white text-black pt-2 text-[25px] font-[600]">
        {data[activeVideo]?.title}
      </h1>
      <br />
      <div className=" w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="dark:text-white text-black text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                {item.title && item.title}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user?.avatar ? user?.avatar?.url : defaultUser}
              alt={user?.name}
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover "
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your questions"
              className="outline-none bg-transparent ml-3 border border-[#fffff57] 800px:text-[18px] font-Poppins rounded w-[100%] "
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              onClick={questionCreationLoading ? () => {} : handleQuestion}
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              } `}
            >
              {questionCreationLoading ? "Loading...." : "Submit"}
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#fffff3b] "></div>
          <div>
            <QuestionReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          {!isReviewExists && (
            <>
              {" "}
              <div className="flex w-full">
                <Image
                  src={user.avatar ? user.avatar.url : defaultUser}
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                    Give a Rating <span className="text-red-500">*</span>
                  </h5>
                  <div className="flex w-full ml-2 pb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <React.Fragment key={i}>
                        {rating >= i ? (
                          <AiFillStar
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <textarea
                    name=""
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id=""
                    cols={40}
                    rows={5}
                    placeholder="Write your comment"
                    className="outline-none bg-transparent ml-3 border border-[#fffff57] 800px:text-[18px] font-Poppins rounded w-[100%] "
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div
                  className={`${
                    styles.button
                  } !w-[120px] !h-[40px] text-[18px] mt-5  ${
                    reviewCreationLoading && "cursor-not-allowed"
                  } `}
                  onClick={
                    reviewCreationLoading ? () => {} : handleReviewSubmit
                  }
                >
                  Submit
                </div>
              </div>
            </>
          )}
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div className="w-full">
            {course?.data?.reviews &&
              [...course.data.reviews]
                .reverse()
                .map((item: any, index: number) => (
                  <div className="w-full my-5" key={index}>
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : defaultUser
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className="text-[#ffffff83]">
                          {format(item.createdAt)} .
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

const QuestionReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <div className="w-full my-3">
      {data[activeVideo]?.questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVideo={activeVideo}
          item={item}
          index={index}
          answer={answer}
          setAnswer={setAnswer}
          setQuestionId={setQuestionId}
          handleAnswerSubmit={handleAnswerSubmit}
          answerCreationLoading={answerCreationLoading}
        />
      ))}
    </div>
  );
};
const CommentItem = ({
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  // console.log(item._id);
  return (
    <>
      {" "}
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item?.user?.avatar ? item?.user?.avatar?.url : defaultUser}
              alt={item?.user?.name}
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover "
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px] text-white">{item?.user?.name}</h5>
            <p className="text-white">{item?.question}</p>
            <small className="text-[#ffffff83]">
              {format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex ">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2 "
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item?._id);
            }}
          >
            {!replyActive
              ? item?.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Reply"}
          </span>
          <BiMessage size={20} className="cursor-pointer" fill="#ffffff83" />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        <>
          {replyActive && (
            <>
              {item?.questionReplies.map((item: any) => (
                <div
                  className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                  key={item._id}
                >
                  <div>
                    <Image
                      src={
                        item?.user?.avatar
                          ? item?.user?.avatar?.url
                          : defaultUser
                      }
                      width={50}
                      height={50}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                  </div>
                  <div className="pl-3">
                    <div className="flex items-center">
                      {" "}
                      <h5 className="text-[20px]">{item?.user?.name}</h5>{" "}
                      {item?.user?.role === "admin" && (
                        <MdVerified className="ml-1 text-[#50c750]" />
                      )}
                    </div>
                    <p>{item?.answer}</p>
                    <small className="text-[#ffffff83]">
                      {format(item?.createdAt)}.
                    </small>
                  </div>
                </div>
              ))}
              {/* Reply Input */}
              <div className="w-full flex relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter your reply..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%] ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  } `}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === " " || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          )}
        </>
      </div>
    </>
  );
};

export default CourseContentMedia;
