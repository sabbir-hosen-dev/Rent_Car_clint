import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className=" text-text py-8">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-center">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-4 mb-6 lg:mb-0">
          <Link to="/" className="flex items-center  gap-3">
            <img className="w-[100px]" src={logo} alt="" />
            <h2 className="font-bold text-2xl">
              R<span className="text-primaryP">en</span>TC
              <span className="text-primaryP">ar</span>
            </h2>
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primaryP transition-all duration-200">
            <FaFacebook size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primaryP transition-all duration-200">
            <FaInstagram size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primaryP transition-all duration-200">
            <FaTwitter size={28} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primaryP transition-all duration-200">
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>

      {/* Copyright Information */}
      <div className="mt-6 text-center border-t border-input pt-4">
        <p className="text-sm text-text">
          © {new Date().getFullYear()} YourWebsiteName. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
