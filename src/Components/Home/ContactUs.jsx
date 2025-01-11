import { Fade, Slide } from 'react-awesome-reveal';

const ContactUs = () => {
  return (
    <div className="py-16 px-6 transition-colors duration-300 dark:bg-[#000903] bg-white">
      <div className="wrap grid grid-cols-1  flex-row-reverse  md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <Slide className="order-2" direction="left">
        <div className="order-2 md:order-1">
          <h2 className="text-4xl font-extrabold text-black dark:text-white mb-6">
            Contact Us
            <span className="block mt-2 w-16 h-1 bg-[#F04646]"></span>
          </h2>
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#101214] text-black dark:text-white focus:ring-2 focus:ring-[#F04646] outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black dark:text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#101214] text-black dark:text-white focus:ring-2 focus:ring-[#F04646] outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-black dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#101214] text-black dark:text-white focus:ring-2 focus:ring-[#F04646] outline-none"
                placeholder="Write your message here"
                required></textarea>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold text-white bg-[#F04646] rounded-lg shadow-lg hover:bg-[#d03c3c] transform transition-all duration-300 hover:scale-105">
                Send Message
              </button>
            </div>
          </form>
        </div>
        </Slide>

        {/* Right Side - Image */}

        <div className="order-1 md:order-2">
          <Fade duration="4000">
            <img
              src="https://i.ibb.co.com/sWcTWyM/Call-center-bro.png"
              alt="Contact Illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
