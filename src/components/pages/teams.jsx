import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaGithub, FaLeaf, FaRecycle, FaUsers } from 'react-icons/fa';

const Teams = () => {
    const [projects, setProjects] = useState(0);
    const [hours, setHours] = useState(0);
    const [support, setSupport] = useState(0);
    const [activeProfile, setActiveProfile] = useState(null);

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

    const teamMembers = [
        {
            id: 'harsh',
            name: 'Harsh Agrawal',
            role: 'Software Engineer Lead',
            image: images.harsh,
            bio: 'As the Software Engineer Lead, he oversees the development and implementation of scalable, secure, and innovative solutions for the platform. With a strong background in full-stack development and a passion for sustainable technology, Harsh ensures the seamless integration of cutting-edge features like multilingual support, real-time tracking, and Web Authentication.',
            linkedin: 'https://www.linkedin.com/in/harsh2810',
            twitter: 'https://x.com/HarshAg62381240',
            github: 'https://www.github.com/harsh6754',
        },
        {
            id: 'shubh',
            name: 'Shubh Tanna',
            role: 'Project Manager',
            image: images.shubh,
            bio: 'As the Project Manager, Shubh ensures that every aspect of the project aligns with its mission of creating a sustainable e-waste marketplace. With exceptional leadership and organizational skills, Shubh drives cross-functional collaboration, streamlines workflows, and ensures timely delivery of innovative features.',
            linkedin: 'https://www.linkedin.com/in/harsh2810',
            twitter: 'https://x.com/HarshAg62381240',
            github: 'https://www.github.com/harsh6754',
        },
        {
            id: 'shabbir',
            name: 'Shabbir Saiyad',
            role: 'Frontend Lead',
            image: images.shabbir,
            bio: 'As the Frontend Lead, Shabbir ensures that every interface element is not only aesthetically pleasing but also highly functional and responsive. With expertise in modern frameworks and design principles, he translates complex requirements into seamless user journeys.',
            linkedin: 'https://www.linkedin.com/in/harsh2810',
            twitter: 'https://x.com/HarshAg62381240',
            github: 'https://www.github.com/harsh6754',
        },
        {
            id: 'tarang',
            name: 'Ladumor Tarang',
            role: 'Backend Developer',
            image: images.tarang,
            bio: 'Ladumor Tarang is a versatile and dynamic contributor to the E-Waste Trading Hub as the Full Stack Developer. With expertise in both frontend and backend technologies, Tarang ensures that the platform functions seamlessly from end to end.',
            linkedin: 'https://www.linkedin.com/in/harsh2810',
            twitter: 'https://x.com/HarshAg62381240',
            github: 'https://www.github.com/harsh6754',
        },
        {
            id: 'komal',
            name: 'Komal Singh',
            role: 'UI/UX Design Lead',
            image: images.komal,
            bio: 'Komal Singh is the creative visionary behind the user-centric design of the E-Waste Trading Hub. As the UI/UX Design Lead, Komal ensures that the platform delivers an intuitive, seamless, and visually compelling experience for users.',
            linkedin: 'https://www.linkedin.com/in/harsh2810',
            twitter: 'https://x.com/HarshAg62381240',
            github: 'https://www.github.com/harsh6754',
        },
        {
            id: 'hetashri',
            name: 'Hetashri Kansariwala',
            role: 'Full Stack Developer Lead',
            image: images.hetashri,
            bio: 'As the Full Stack Lead for the E-Waste Trade Hub project, I bring expertise in designing, developing, and optimizing scalable web applications. From crafting seamless user experiences to architecting robust backend solutions, I ensure every aspect of the platform aligns with our mission.',
            linkedin: 'https://www.linkedin.com/in/harsh2810',
            twitter: 'https://x.com/HarshAg62381240',
            github: 'https://www.github.com/harsh6754',
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-[#174B3A] to-[#277158] text-white overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
                    {/* Decorative elements */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-5"></div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white opacity-5"></div>
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10 backdrop-blur-sm">
                            <FaUsers className="text-2xl text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Our <span className="text-green-300">Team</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-green-100 leading-relaxed">
                            Meet the passionate individuals behind E-Waste Trade Hub working 
                            together to create a sustainable future.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-14 -mt-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Projects Card */}
                        <motion.div 
                            variants={item}
                            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition hover:scale-105"
                        >
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                <FaRecycle className="text-2xl text-[#174B3A]" />
                            </div>
                            <h2 className="text-5xl font-bold text-gray-800 mb-2">{projects}</h2>
                            <p className="text-gray-600 text-lg">Projects Completed</p>
                        </motion.div>
                        
                        {/* Hours Card */}
                        <motion.div 
                            variants={item}
                            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition hover:scale-105"
                        >
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-[#174B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-5xl font-bold text-gray-800 mb-2">{hours}+</h2>
                            <p className="text-gray-600 text-lg">Hours of Dedication</p>
                        </motion.div>
                        
                        {/* Support Card */}
                        <motion.div 
                            variants={item}
                            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition hover:scale-105"
                        >
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                <FaLeaf className="text-2xl text-[#174B3A]" />
                            </div>
                            <h2 className="text-5xl font-bold text-gray-800 mb-2">{support}/7</h2>
                            <p className="text-gray-600 text-lg">Days of Support</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-3 py-1 text-sm font-medium bg-[#174B3A]/10 text-[#174B3A] rounded-full mb-4">
                            Our Experts
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Meet the Minds Behind E-Waste Trade Hub
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600">
                            Our diverse team brings together expertise in technology, design, and sustainability 
                            to revolutionize electronic waste management.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {teamMembers.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={item}
                                className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 ${
                                    activeProfile === member.id ? 'ring-2 ring-[#174B3A] ring-offset-2' : ''
                                }`}
                                onClick={() => setActiveProfile(activeProfile === member.id ? null : member.id)}
                            >
                                <div className="relative h-72 overflow-hidden">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                        <div className="p-6 w-full">
                                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                            <p className="text-green-300 text-sm">{member.role}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className={`overflow-hidden transition-all duration-300 ${
                                        activeProfile === member.id ? 'max-h-72' : 'max-h-24'
                                    }`}>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                    
                                    {member.bio.length > 150 && (
                                        <button 
                                            className="mt-3 text-[#174B3A] text-sm font-medium hover:underline focus:outline-none"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveProfile(activeProfile === member.id ? null : member.id);
                                            }}
                                        >
                                            {activeProfile === member.id ? 'Read Less' : 'Read More'}
                                        </button>
                                    )}
                                    
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center space-x-4">
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaLinkedinIn />
                                        </a>
                                        <a
                                            href={member.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-400 hover:bg-blue-100 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaTwitter />
                                        </a>
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaGithub />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#174B3A] to-[#277158] text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
                        <p className="text-lg text-green-100 mb-8">
                            Passionate about sustainability and technology? We're always looking 
                            for talented individuals to help us transform e-waste management.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-white text-[#174B3A] font-medium rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Get in Touch
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 md:text-left text-center mb-6 md:mb-0">
                        <p className="text-sm md:text-base text-gray-400">
                            Copyright 2024 &copy; E-Waste Trade Hub. All Rights Reserved.
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2">
                        <ul className="flex justify-center md:justify-end flex-wrap gap-6">
                            <li>
                                <a
                                    href="/contactUs"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/term"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/review"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Review
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/teams"
                                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                >
                                    Team Members
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Teams;