import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

const Teams = () => {

    const [projects, setProjects] = useState(0);
    const [hours, setHours] = useState(0);
    const [support, setSupport] = useState(0);

    const randomValues = {
        projects: Math.floor(Math.random() * 500),
        hours: Math.floor(Math.random() * 1000),
        support: 24,
    };

    const animateValue = (start, end, setter, duration = 1000) => {
        let current = start;
        const increment = (end - start) / (duration / 10);

        const interval = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(interval);
            }
            setter(Math.floor(current));
        }, 10);
    };

    const [images, setImages] = useState({
        harsh: '',
        shubh: '',
        shabbir: '',
        tarang: '',
        komal: '',
        hetashri: '',
    });

    useEffect(() => {

        animateValue(0, randomValues.projects, setProjects);
        animateValue(0, randomValues.hours, setHours);
        setSupport(randomValues.support);

        const fetchImages = async () => {
            const imagePaths = {
                harsh: 'E-Waste/Harsh.jpg',
                shubh: 'E-Waste/Shubh.jpg',
                shabbir: 'E-Waste/Shabbir.jpg',
                tarang: 'E-Waste/Tarang.jpg',
                komal: 'E-Waste/Komal.jpg',
                hetashri: 'E-Waste/Hetashrii.jpg',
            };
            try {
                const imagePromises = Object.entries(imagePaths).map(async ([key, path]) => {
                    const imageRef = ref(storage, `gs://t-music-be993.appspot.com/${path}`);
                    const url = await getDownloadURL(imageRef);
                    return [key, url];
                });
                const urls = await Promise.all(imagePromises);
                const updateImages = Object.fromEntries(urls);
                setImages(updateImages);
            } catch (error) {
                console.error('Error fetching images from Firebase Storage:', error);
            }
        };
        fetchImages();
    }, []);
    return (
        <div>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
                <div className="text-center pb-12">
                    <h2 className="text-base font-bold text-indigo-600">
                        We have the best equipment in the market
                    </h2>
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
                        Check our awesome team members
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-64">
                            <img
                                className="object-cover object-center w-full h-full"
                                src={images.harsh}
                                alt="profile"
                            />
                        </div>
                        <div className="w-full md:w-2/3 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl text-gray-700 font-bold">Harsh Agrawal</p>
                                    <p className="text-sm text-gray-500">Software Engineer Lead</p>
                                </div>
                                <div className="flex space-x-3">
                                    <a
                                        href="https://www.linkedin.com/in/harsh2810"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.078c.823-.55 1.78-.828 2.75-.828 2.485 0 4.5 2.015 4.5 4.5v5.25z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/HarshAg62381240"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.github.com/harsh6754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.637-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.681-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.85.004 1.705.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.202 2.392.099 2.645.64.698 1.028 1.59 1.028 2.681 0 3.841-2.339 4.687-4.566 4.934.359.31.678.921.678 1.855 0 1.339-.012 2.422-.012 2.75 0 .268.18.579.688.481C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                <p>
                                    As the Software Engineer Lead, he oversees the development and implementation of scalable, secure, and innovative solutions for the platform. With a strong background in full-stack development and a passion for sustainable technology, Harsh ensures the seamless integration of cutting-edge features like multilingual support, real-time tracking, and Web Authentication. His leadership fosters a collaborative environment where ideas transform into impactful solutions, making the platform a trusted marketplace for e-waste trading.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-64">
                            <img
                                className="object-cover object-center w-full h-full"
                                src={images.shubh}
                                alt="profile"
                            />
                        </div>
                        <div className="w-full md:w-2/3 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl text-gray-700 font-bold">Shubh Tanna</p>
                                    <p className="text-sm text-gray-500">Project Manager</p>
                                </div>
                                <div className="flex space-x-3">
                                    <a
                                        href="https://www.linkedin.com/in/harsh2810"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.078c.823-.55 1.78-.828 2.75-.828 2.485 0 4.5 2.015 4.5 4.5v5.25z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/HarshAg62381240"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.github.com/harsh6754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.637-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.681-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.85.004 1.705.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.202 2.392.099 2.645.64.698 1.028 1.59 1.028 2.681 0 3.841-2.339 4.687-4.566 4.934.359.31.678.921.678 1.855 0 1.339-.012 2.422-.012 2.75 0 .268.18.579.688.481C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                <p>
                                As the Project Manager, Shubh ensures that every aspect of the project aligns with its mission of creating a sustainable e-waste marketplace. With exceptional leadership and organizational skills, Shubh drives cross-functional collaboration, streamlines workflows, and ensures timely delivery of innovative features. His vision and dedication inspire the team to achieve excellence, making the platform a trusted and efficient solution for e-waste trading.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-64">
                            <img
                                className="object-cover object-center w-full h-full"
                                src={images.shabbir}
                                alt="profile"
                            />
                        </div>
                        <div className="w-full md:w-2/3 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl text-gray-700 font-bold">Shabbir Saiyad</p>
                                    <p className="text-sm text-gray-500">Frontend Lead</p>
                                </div>
                                <div className="flex space-x-3">
                                    <a
                                        href="https://www.linkedin.com/in/harsh2810"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.078c.823-.55 1.78-.828 2.75-.828 2.485 0 4.5 2.015 4.5 4.5v5.25z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/HarshAg62381240"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.github.com/harsh6754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.637-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.681-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.85.004 1.705.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.202 2.392.099 2.645.64.698 1.028 1.59 1.028 2.681 0 3.841-2.339 4.687-4.566 4.934.359.31.678.921.678 1.855 0 1.339-.012 2.422-.012 2.75 0 .268.18.579.688.481C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                <p>
                                As the Frontend Lead, Shabbir ensures that every interface element is not only aesthetically pleasing but also highly functional and responsive. With expertise in modern frameworks and design principles, he translates complex requirements into seamless user journeys. His commitment to detail and innovation ensures that the platform delivers a user-friendly experience across devices, empowering buyers and sellers to interact effortlessly.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-64">
                            <img
                                className="object-cover object-center w-full h-full"
                                src={images.tarang}
                                alt="profile"
                            />
                        </div>
                        <div className="w-full md:w-2/3 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl text-gray-700 font-bold">Ladumor Tarang</p>
                                    <p className="text-sm text-gray-500">Backend Developer</p>
                                </div>
                                <div className="flex space-x-3">
                                    <a
                                        href="https://www.linkedin.com/in/harsh2810"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.078c.823-.55 1.78-.828 2.75-.828 2.485 0 4.5 2.015 4.5 4.5v5.25z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/HarshAg62381240"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.github.com/harsh6754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.637-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.681-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.85.004 1.705.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.202 2.392.099 2.645.64.698 1.028 1.59 1.028 2.681 0 3.841-2.339 4.687-4.566 4.934.359.31.678.921.678 1.855 0 1.339-.012 2.422-.012 2.75 0 .268.18.579.688.481C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                <p>
                                Ladumor Tarang is a versatile and dynamic contributor to the E-Waste Trading Hub as the Full Stack Developer. With expertise in both frontend and backend technologies, Tarang ensures that the platform functions seamlessly from end to end. His ability to bridge the gap between design and functionality enables the development of robust features like secure user authentication, real-time notifications, and efficient data management. Driven by a passion for clean code and scalability, Tarang plays a key role in delivering a reliable and innovative platform for e-waste trading.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-64">
                            <img
                                className="object-cover object-center w-full h-full"
                                src={images.komal}
                                alt="profile"
                            />
                        </div>
                        <div className="w-full md:w-2/3 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl text-gray-700 font-bold">Komal Singh</p>
                                    <p className="text-sm text-gray-500">UI/UX Design Lead</p>
                                </div>
                                <div className="flex space-x-3">
                                    <a
                                        href="https://www.linkedin.com/in/harsh2810"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.078c.823-.55 1.78-.828 2.75-.828 2.485 0 4.5 2.015 4.5 4.5v5.25z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/HarshAg62381240"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.github.com/harsh6754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.637-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.681-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.85.004 1.705.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.202 2.392.099 2.645.64.698 1.028 1.59 1.028 2.681 0 3.841-2.339 4.687-4.566 4.934.359.31.678.921.678 1.855 0 1.339-.012 2.422-.012 2.75 0 .268.18.579.688.481C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                <p>
                                Komal Singh is the creative visionary behind the user-centric design of the E-Waste Trading Hub. As the UI/UX Design Lead, Komal ensures that the platform delivers an intuitive, seamless, and visually compelling experience for users. With a keen eye for aesthetics and a deep understanding of user behavior, Komal transforms complex workflows into accessible designs. Her innovative approach to problem-solving and dedication to enhancing usability play a pivotal role in making the platform engaging and efficient for buyers and sellers alike.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-64">
                            <img
                                className="object-cover object-center w-full h-full"
                                src={images.hetashri}
                                alt="profile"
                            />
                        </div>
                        <div className="w-full md:w-2/3 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl text-gray-700 font-bold">Hetashri Kansariwala</p>
                                    <p className="text-sm text-gray-500">Full Stack Developer Lead</p>
                                </div>
                                <div className="flex space-x-3">
                                    <a
                                        href="https://www.linkedin.com/in/harsh2810"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.078c.823-.55 1.78-.828 2.75-.828 2.485 0 4.5 2.015 4.5 4.5v5.25z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/HarshAg62381240"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.github.com/harsh6754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.637-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.681-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.026a9.564 9.564 0 012.5-.336c.85.004 1.705.114 2.5.336 1.91-1.295 2.75-1.026 2.75-1.026.545 1.375.202 2.392.099 2.645.64.698 1.028 1.59 1.028 2.681 0 3.841-2.339 4.687-4.566 4.934.359.31.678.921.678 1.855 0 1.339-.012 2.422-.012 2.75 0 .268.18.579.688.481C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                <p>
                                As the Full Stack Lead for the E-Waste Trade Hub project, I bring expertise in designing, developing, and optimizing scalable web applications. From crafting seamless user experiences to architecting robust backend solutions, I ensure every aspect of the platform aligns with our mission to revolutionize e-waste management. Leading the development team, I focus on delivering high-quality features, ensuring system security, and integrating innovative technologies to drive sustainability forward.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-11 px-6 bg-gray-50 rounded-lg shadow-lg border-2 mt-5 border-black">
                    {/* Projects */}
                    <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h1 className="text-5xl font-bold text-blue-600">{projects}</h1>
                        <p className="text-gray-600 text-lg mt-2">Projects</p>
                    </div>
                    {/* Hours */}
                    <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h1 className="text-5xl font-bold text-green-600">{hours}+</h1>
                        <p className="text-gray-600 text-lg mt-2">Hours</p>
                    </div>
                    {/* Support */}
                    <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h1 className="text-5xl font-bold text-purple-600">{support}/7</h1>
                        <p className="text-gray-600 text-lg mt-2">Support</p>
                    </div>
                </div>

            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-[23px] px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 md:text-left text-center mb-6 md:mb-0">
                        <p className="text-sm md:text-base text-gray-400">
                            Copyright 2024 &copy; E-Waste Trade Hub. All Rights Reserved.
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2">
                        <ul className="list-reset flex justify-center md:justify-end flex-wrap text-sm gap-4">
                            <li>
                                <a
                                    href="/termscontactUs"
                                    className="text-gray-400 hover:text-green-500 transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/term"
                                    className="text-gray-400 hover:text-green-500 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/review"
                                    className="text-gray-400 hover:text-green-500 transition-colors"
                                >
                                    Review
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/teams"
                                    className="text-gray-400 hover:text-green-500 transition-colors"
                                >
                                    Team Members
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Teams