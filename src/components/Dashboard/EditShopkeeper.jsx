import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { EditProfile } from './EditProfile';
import { DeleteProfile } from './DeleteProfile';
import { useRef } from 'react';
import { ShopDetails } from './ShopDetails';

export const EditShopkeeper = () => {

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);


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

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };


  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  const location = useLocation();

  return (
    <div className='bg-[#DCE2DE]'>
      <div className="mt-6 ml-11 text-xl font-medium font-roboto">
        Home / dashboard /{" "}
        <span className=" text-[#F19A3E]">
          {location.pathname.split("/").slice(-1)}
        </span>
      </div>

      <div className='w-10/12 mx-auto mt-8'>

        <p className='text-2xl font-bold '>Update your profile here!</p>

        <div className='mt-12 bg-[#fff] flex flex-col rounded-md shadow-lg p-6 border-[1px] border-richblack-700'>

          {/* Edit your profile pic */}
          <div>

            <div>
              <p className=" font-roboto font-medium text-2xl">
                Edit Profile picture{" "}
              </p>

              <hr className="border-t-2 border-black mt-2" />
            </div>

            <div className=" flex mt-10">

              <div className=" h-[100px] w-[100px] rounded-full">
                <img
                  src={previewSource}
                  alt={`profile-Image`}
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
                    <button
                      className='bg-[#F19A3E] text-[18px] font-medium font-roboto px-6 py-2 text-white rounded-md'
                      onClick={handleClick}
                    >
                      Change
                    </button>

                  </div>

                  <button className='bg-[#F19A3E] text-[18px] font-medium font-roboto px-6 py-2 text-white rounded-md'>
                    {loading ? "Uploading..." : "Upload"}
                  </button>

                </div>


              </div>

            </div>

          </div>


          {/* Edit your profile info */}
          <div className="mt-6">
            <p className=" font-roboto font-medium text-2xl">
              Edit Profile information
            </p>

            <hr className=" border-t-2 border-black mt-2" />
          </div>

          <div>
            <EditProfile />
          </div>


          <div>
            <ShopDetails />
          </div>

          <hr className=" border-t-2 border-black mt-12" />

          <div>
            <DeleteProfile />
          </div>


        </div>

      </div>

    </div>
  )
}
