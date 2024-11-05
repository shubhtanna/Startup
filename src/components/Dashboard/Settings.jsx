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
    <div className="bg-[#DCE2DE] p-4 sm:p-8 lg:p-16">
      <div className="text-base sm:text-lg lg:text-xl font-medium font-roboto mb-6">
        Home / dashboard /{" "}
        <span className="text-[#F19A3E]">
          {location.pathname.split("/").slice(-1)}
        </span>
      </div>

      <div>
        <div className="mt-6 sm:mt-12 lg:mt-16">
          <p className="font-roboto font-semibold text-2xl sm:text-3xl lg:text-4xl">
            Update your profile here!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg">
          <div className="max-w-[90%] mx-auto">
            <div className="pt-8 sm:pt-12 lg:pt-16 mt-6 lg:mt-14">
              <p className="font-roboto font-medium text-xl sm:text-2xl">
                Edit Profile pic{" "}
              </p>
              <hr className="border-t-2 border-black mt-2" />
            </div>

            <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 items-center">
              <div className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-full overflow-hidden">
                <img
                  src={previewSource || user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square w-full rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 sm:ml-12">
                <div className="flex items-center gap-5">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <button
                    className="bg-[#F19A3E] text-lg sm:text-xl font-medium font-roboto px-6 sm:px-10 py-2 sm:py-3 text-white rounded-2xl"
                    onClick={handleClick}
                    disabled={loading}
                  >
                    Change
                  </button>
                  <button
                    className="bg-[#F19A3E] text-lg sm:text-xl font-medium font-roboto px-6 sm:px-10 py-2 sm:py-3 text-white rounded-2xl"
                    onClick={handleFileUpload}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <p className="font-roboto font-medium text-xl sm:text-2xl">
                Edit Profile information
              </p>
              <hr className="border-t-2 border-black mt-2" />
            </div>

            <div>
              <EditProfile />
            </div>

            <hr className="border-t-2 border-black mt-10" />

            {user.accountType === "Vendor" && (
              <div>
                <ShopDetails />
              </div>
            )}

            <div>
              <DeleteProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
