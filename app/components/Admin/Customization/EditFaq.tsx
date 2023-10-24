import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layouts/layoutsApi";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const [
    editLayout,
    { isLoading: editLoading, isSuccess: layOutSuccess, error },
  ] = useEditLayoutMutation();
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [questions, setQuestions] = useState<any[]>([]);
  console.log(questions, "Faq data");
  useEffect(() => {
    if (data) {
      setQuestions(data?.data?.faq);
    }
    if (layOutSuccess) {
      refetch();
      toast.success("FAQ Updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, error, layOutSuccess, refetch]);

  //!
  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions?.map((q) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };
  //!
  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions?.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  //!
  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions?.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };
  //!
  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };
  //!
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };
  //!
  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => !q.question || !q.answer);
  };
  //!
  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data?.data?.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };
  //!
  const handleDelete = async (id: any) => {
    console.log("g");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-90% 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions?.map((q) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start text-white  justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        value={q.question}
                        className={`${styles.input} border-none`}
                        onChange={(e) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder="Add your question..."
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder="Add your answer..."
                        className={`${styles.input} border-none`}
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="text-white  text-18 cursor-pointer"
                          onClick={() => handleDelete(q._id)}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
            <div
              className={`${
                styles.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]  ${
                areQuestionsUnchanged(data?.data?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              } !rounded absolute bottom-12 right-12`}
              onClick={
                areQuestionsUnchanged(data?.data?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? () => null
                  : handleEdit
              }
            >
              {editLoading ? "Saving.." : "Save"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
