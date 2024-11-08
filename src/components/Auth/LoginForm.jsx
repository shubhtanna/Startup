import React, { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Services/Operation/authAPI';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        dispatch(login(email, password, navigate));
    };

    return (
        <div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 mt-3 font-medium text-xl text-gray-900">{t("Email")}</label>
                    <div className="relative">
                        <input 
                            type="email"
                            name="email"
                            className="bg-loginfieldbg transition-all duration-200 hover:scale-105 font-roboto w-full p-2"
                            value={formData.email}
                            onChange={handleOnChange}
                            placeholder={t("Email")}
                            required
                        />
                        <MdOutlineEmail className="absolute right-3 top-[18px] opacity-20 cursor-pointer" size={30} />
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="password" className="block mb-2 text-xl font-medium text-gray-900">{t("Password")}</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="bg-loginfieldbg transition-all duration-200 hover:scale-105 font-roboto w-full p-2"
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder="**********"
                        required
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[45px] cursor-pointer opacity-20"
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={30} /> : <AiOutlineEye size={30} />}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <Link to="/forgot-password" className="text-sm font-medium text-[#2378C7] hover:underline">{t("Forgot password?")}</Link>
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="bg-register-rgba m-auto p-4 rounded-3xl w-[50%] transition-all duration-200 hover:scale-105 text-white text-2xl font-semibold font-roboto"
                    >
                        {t("Login")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
