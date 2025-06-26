import { FaFacebook, FaLinkedin, FaGithub, FaAddressBook } from 'react-icons/fa';
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="bg-[#7c4ee4] text-white py-8">
            <div className="container flex flex-col justify-center items-center mx-auto px-4">
                {/* Navigation Links */}
                <p className='mb-5 text-lg text-gray-300'>Made with ‪‪❤︎‬ by Sanket</p>
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="/" className="text-gray-300 hover:text-white transition-colors">
                        Home
                    </a>
                    <a href="/blogs" className="text-gray-300 hover:text-white transition-colors">
                        Blog
                    </a>
                    <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                        About
                    </a>
                    <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                        Contact Us
                    </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://github.com/sanketyelugotla" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                        <FaGithub className="h-6 w-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/sanketyelugotla/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                        <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a href="https://leetcode.com/u/sanketyelugotla/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                        <SiLeetcode className="h-6 w-6" />
                    </a>
                    <a href="https://sanketyelugotla.vercel.app/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                        <FaAddressBook className="h-6 w-6" />
                    </a>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-4"></div>

                {/* Copyright */}
                <div className="text-center text-gray-400 text-sm">
                    <p>Copyright Ideapeel Inc © {new Date().getFullYear()}. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;