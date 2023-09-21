import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assests/user2.png";
import { styles } from "../../styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, isLoading, error }] =
    useUpdateAvatarMutation();
  const [
    updateProfile,
    {
      isSuccess: updateSuccess,
      error: updateError,
      isError: isProfileError,
      isLoading: updateLoading,
    },
  ] = useUpdateProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    console.log(e);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatars = fileReader.result;
        updateAvatar(avatars);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      setLoadUser(true);
    }
    if (error) {
      console.error(error || updateError);
    }
    if (updateSuccess) {
      toast.success("Profile updated successfully");
    }
    if (isProfileError) {
      // toast.error(updateError)
    }
  }, [isSuccess, error, updateSuccess, updateError, isProfileError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await updateProfile({
        name,
      });
    }
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          {isLoading ? (
            "Uploading.."
          ) : (
            <>
              {" "}
              <Image
                src={
                  user.avatar || avatar
                    ? user.avatar?.url || avatar
                    : avatarIcon
                }
                alt=""
                width={120}
                height={120}
                className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
              />
              <input
                type="file"
                name=""
                id="avatar"
                className="hidden"
                onChange={imageHandler}
                accept="image/png, image/jpg, image/jpeg, image/webp"
              />
            </>
          )}
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} w-full mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} w-full mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value={updateLoading ? "Updating.." : "Update"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
