import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layouts/layoutsApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const Faq = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.data?.faq);
    }
  }, [data]);

  const toggleQuestion = async (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="bg-opacity-50 bg-gradient-to-b from-black to-gray-900">
      <div className="w-[90%] 800px:w-[80]% m-auto ">
        <h1 className={`${styles.title} text-5xl 800px:text-[40px]`}>
          Frequently Asked Questions
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions?.map((q: any) => (
              <div
                key={q._id}
                className={`${
                  q._id !== questions[0]?._id && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q.id)}
                  >
                    <span className="font-medium text-white">{q.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q.id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base font-Poppins text-white">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Faq;
