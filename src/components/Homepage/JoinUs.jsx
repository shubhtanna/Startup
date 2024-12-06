import React, { useState, useEffect } from 'react';
import JOIN_US from "../../assets/join_us_image.png";
import { useDispatch } from 'react-redux';
import { contactUs } from '../../Services/Operation/userAPI';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

const JoinUs = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        message: "",
    });

    const { email, message } = formData;
    const [joinUsImage, setJoinUsImage] = useState('');

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/join_us_image.png'); // Replace with the correct path in your Firebase Storage
                const url = await getDownloadURL(imageRef);
                setJoinUsImage(url);
            } catch (error) {
                console.error('Error fetching image from Firebase Storage:', error);
            }
        };
        fetchImage();
    }, []);

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(contactUs(email, message));
        setFormData({
            email: "",
            message: ""
        });
    }

    return (
        <div className="w-full px-4 sm:px-8 lg:px-16 py-8">
            <form onSubmit={handleOnSubmit} className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Form Section */}
                    <div className="text-center w-full lg:w-1/2">
                        <div className="p-4">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                {t("Feel free to ask any doubts")}!
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                {t("Please ask questions that help us provide clear and precise solutions tailored to your needs")}.
                            </p>
                        </div>
                        <div className="mt-6">
                            <input
                                className="bg-gray-100 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                type="email"
                                name="email"
                                value={email}
                                placeholder={t("Email")}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="mt-4">
                            <textarea
                                className="py-3 px-4 block w-full rounded-lg text-sm border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows="4"
                                name="message"
                                placeholder={t("Message")}
                                value={message}
                                onChange={handleOnChange}
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md w-full lg:w-1/2 tracking-wider hover:bg-green-700 transition duration-200"
                            >
                                {t("Submit")}
                            </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src={joinUsImage || JOIN_US}
                            alt="Join Us"
                            className="w-[80%] h-[380px] max-w-sm md:max-w-md lg:max-w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default JoinUs;
