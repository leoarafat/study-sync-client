/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layouts/layoutsApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setTitle(data?.data?.banner.title);
      setImage(data?.data?.banner?.image?.url);
      setSubTitle(data?.data?.banner.subTitle);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMsg = error as any;
        toast.error(errorMsg?.data?.message);
      }
    }
  }, [data, error, isSuccess]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    // Added '=' here
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full border rounded-lg py-2 px-3  focus:outline-none focus:border-blue-500"
            type="text"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subtitle"
          >
            Subtitle
          </label>
          <textarea
            className="w-full border rounded-lg py-2 px-3  h-32 resize-none focus:outline-none focus:border-blue-500"
            id="subtitle"
            placeholder="Enter subtitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="banner"
          >
            Upload Image
          </label>
          <div className="relative">
            <img
              src={image}
              alt=""
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <label
              htmlFor="banner"
              className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-300"
            >
              <AiOutlineCamera className="w-6 h-6" />
            </label>
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleEdit}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
              !title || !subTitle || !image
                ? "cursor-not-allowed bg-gray-300"
                : "hover:bg-blue-600 transition duration-300"
            }`}
            disabled={!title || !subTitle || !image}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
