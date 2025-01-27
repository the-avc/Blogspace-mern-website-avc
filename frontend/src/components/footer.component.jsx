import { useContext } from 'react';
import { Link } from 'react-router-dom';
import darkLogo from "../imgs/logo-dark.png";
import lightLogo from "../imgs/logo-light.png";
import {ThemeContext } from '../App';
import FullLogo from '../imgs/full-logo-light.png';

const Footer = () => {
    // let [theme, setTheme] = useContext(ThemeContext);
    return (
        <footer className="bg-gray-900 text-white py-10 px-5">
            <div className="container mx-auto grid md:grid-cols-3 gap-8 text-[#ebf0f4]">
                {/* Logo and Blog Name */}
                <div className="flex flex-col items-center md:items-start">
                    {/* Logo Icon */}
                    <div className="flex items-center space-x-2">
                        <img src={FullLogo} alt="Logo" className='w-64' />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col space-y-4">
                    <h3 className="font-semibold text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
                        <li><a href="/documentation" className="hover:text-blue-400">Documentation</a></li>
                        <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
                        <li><a href="/terms" className="hover:text-blue-400">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-semibold text-lg">Follow Us</h3>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://instagram.com" target="_blank" className="hover:text-blue-400">
                        <i className="fi fi-brands-instagram text-2xl"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400">
                        <i className="fi fi-brands-linkedin text-2xl"></i>
                        </a>
                        <a href="https://github.com/the-avc" target="_blank" className="hover:text-blue-400">
                        <i className="fi fi-brands-github text-2xl"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 pt-6 mt-6 text-center">
                <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Blogspace. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
