/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/style";
import React, { useState, FC } from "react";

type Props = {
  CourseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  CourseInfo,
  setActive,
  setCourseInfo,
  active,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...CourseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCourseInfo({ ...CourseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={styles.label}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="text"
            name=""
            required
            value={CourseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...CourseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with Next.js"
            className={styles.input}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label} text-black`}>
            Course Description
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} h-min py-2`}
            value={CourseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...CourseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label} text-black`}>Course Price</label>
            <input
              type="number"
              name=""
              required
              value={CourseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...CourseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`${styles.input} h-min py-2`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name="estimatedPrice"
              value={CourseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...CourseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div>
          <label className={`${styles.label}`} htmlFor="tags">
            Course Tags
          </label>
          <input
            type="text"
            required
            name="tags"
            value={CourseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...CourseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN, Next 13, Socket io, tailwind css, LMS"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label} text-black`}>Course Level</label>
            <input
              type="text"
              name=""
              required
              value={CourseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...CourseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/InterMediate/Expert"
              className={`${styles.input} h-min py-2`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name=""
              value={CourseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...CourseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="demoUrl"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Drag-and-Drop Container */}
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {CourseInfo.thumbnail ? (
              <img
                src={CourseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
