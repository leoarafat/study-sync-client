import toast from "react-hot-toast";
import { styles } from "../../../styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  courseContentData: any[];
  setCourseContentData: (data: any[]) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };
  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first.");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `United Section ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  return (
    <div className="w-80% m-auto  ">
      <form onSubmit={handleCourseSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              className={`w-[80%] m-auto mt-24 bg-gray-700 p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
              key={index}
            >
              {showSectionInput && (
                <div className="flex w-full items-center">
                  <input
                    type="text"
                    className={`text-[20px] ${
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    } font-Poppins cursor-pointer text-white  bg-transparent outline-none`}
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                  <BiSolidPencil className="cursor-pointer text-white " />
                </div>
              )}

              <div className="flex w-full items-center justify-between my-0 ">
                {isCollapsed[index] ? (
                  item.title ? (
                    <p className="font-Poppins text-white ">
                      {index + 1}. {item.title}
                    </p>
                  ) : (
                    <></>
                  )
                ) : (
                  <div></div>
                )}

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`text-[20px] mr-2 text-white ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className={`text-white `}
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="my-3 text-white">
                    <label className={`text-white ${styles.label}`}>
                      Video Title
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Project plan"
                      value={item.title}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  {/* Another div */}
                  <div className="my-3 text-white">
                    <label className={`text-white ${styles.label}`}>
                      Video Url
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Video Url"
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  <div className="my-3 text-white">
                    <label className={`text-white ${styles.label}`}>
                      Video Length (in minutes)
                    </label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="20"
                      value={item.videoLength}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoLength = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  {/* Another div */}
                  <div className="my-3 text-white">
                    <label className={`text-white ${styles.label}`}>
                      Video Description
                    </label>
                    <textarea
                      rows={8}
                      cols={30}
                      className={`${styles.input} !h-min py-2`}
                      placeholder="Write about the video"
                      value={item.description}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                    <br />
                  </div>
                  {item?.links?.map((link: any, linkIndex: number) => (
                    <div className="mb-3 block" key={linkIndex}>
                      <div className="w-full flex items-center justify-between">
                        <label className={`${styles.label} !text-white`}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-not-allowed text-gray-200"
                              : "cursor-pointer  text-white text-20px"
                          }`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      {/* Input */}
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Source code... (Link title)"
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        className={styles.input}
                        placeholder="Source code... (Link title)"
                        value={link.url}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}
                  <br />
                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-[18px] cursor-pointer text-white "
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" />
                      Add Link
                    </p>
                  </div>
                </>
              )}
              <br />
              {index === courseContentData.length - 1 && (
                <div>
                  <p
                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    onClick={(e: any) => newContentHandler(item)}
                  >
                    <AiOutlinePlusCircle className="mr-2 text-white" />{" "}
                    <span className="text-white">Add New Content</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <br />
        <div
          onClick={() => addNewSection()}
          className="flex items-center justify-center text-[20px] text-black cursor-pointer "
        >
          <AiOutlinePlusCircle className="mr-2 text-black" />{" "}
          <span className="text-black">Add New Section</span>
        </div>
      </form>
      <br />
      <div className="w-[80%] m-auto flex items-center justify-between ">
        <div
          className="w-[80%] 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-[80%] 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
