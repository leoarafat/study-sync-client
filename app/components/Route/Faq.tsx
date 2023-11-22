import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layouts/layoutsApi";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dynamic from "next/dynamic";

const Faq = () => {
  const { data } = useGetHeroDataQuery("FAQ", {});

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.data?.faq);
    }
  }, [data]);

  return (
    <div className="bg-opacity-50 bg-gradient-to-b from-black to-gray-900">
      <div className="w-[90%] 800px:w-[80]% m-auto ">
        <h1 className={`${styles.title} text-5xl 800px:text-[40px]`}>
          Frequently Asked Questions
        </h1>
        <div className="mt-12">
          {questions &&
            questions.map((faqItem: any, index: number) => (
              <Accordion
                className="bg-[#010313] text-white border border-gray-300 p-2 rounded-md"
                style={{
                  background: "#010313",
                  color: "white",
                }}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography>{faqItem?.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faqItem?.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Faq), {
  ssr: false,
});
