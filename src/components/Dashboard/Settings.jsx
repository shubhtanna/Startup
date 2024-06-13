import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { updateDisplayImage } from "../../Services/Operation/settingsAPI";
import DeleteProfile from "./DeleteProfile";
import { ShopDetails } from "./ShopDetails";

const Settings = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayImage(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  const location = useLocation();
  return (
    <div className=" bg-[#DCE2DE]">
      <div className=" text-xl font-medium font-roboto">
        Home / dashboard /{" "}
        <span className=" text-[#F19A3E]">
          {location.pathname.split("/").slice(-1)}
        </span>
      </div>

      <div>
        <div className="mt-16">
          <p className=" font-roboto font-semibold text-4xl">
            Update your profile here!
          </p>
        </div>

        <div className=" bg-[#fff] rounded-[60px] pb-14">
          <div className=" max-w-[90%] mx-auto">
            <div className="pt-16 mt-14">
              <p className=" font-roboto font-medium text-2xl">
                Edit Profile pic{" "}
              </p>

              <hr className=" border-t-2 border-black mt-2" />
            </div>

            <div className=" flex mt-8">
              <div className=" h-[100px] w-[100px] rounded-full">
                <img
                  src={previewSource || user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square w-[105px] rounded-full object-cover"
                />
              </div>

              <div className="flex gap-x-16 ml-12">
                <div className=" flex items-center gap-5">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className=" hidden "
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <div className="flex gap-4">
                    {/* <CiEdit size={40} className="mt-2"/> */}
                    <button
                      className='bg-[#F19A3E] text-2xl font-medium font-roboto px-10 py-3 text-white rounded-2xl'
                      onClick={handleClick}
                      disabled={loading}
                    >
                      Change
                    </button>
                    {/* <button className='bg-[#F19A3E] text-2xl font-medium font-roboto px-10 py-3 text-white rounded-2xl' onClick={() => navigate("/dashboard/my-profile")}>cancel</button> */}
                  </div>
                  <button className='bg-[#F19A3E] text-2xl font-medium font-roboto px-10 py-3 text-white rounded-2xl' onClick={handleFileUpload}>
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>

                {/* <div className=" flex items-center">
                  <RiDeleteBin6Line className="text-red-600" size={19} />
                  <button onClick={handleDelete} disabled={loading} className=" font-roboto text-red-600 text-[16px] font-medium">
                    Delete
                  </button>
                </div> */}
              </div>
            </div>

            <div>
              <div className=" mt-12">
                <p className=" font-roboto font-medium text-2xl">
                  Edit Profile information
                </p>

                <hr className=" border-t-2 border-black mt-2" />
              </div>

              <div>
                <EditProfile />
              </div>

              <hr className=" border-t-2 border-black mt-10" />

              {
                user.accountType === "Vendor" && (
                  <div>
                    <ShopDetails/>
                  </div>
                )
              }

              <div>
                <DeleteProfile />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
