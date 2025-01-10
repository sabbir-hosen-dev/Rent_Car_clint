const CallToAction = () => {
  return (
    <div className="relative py-16 px-6 transition-colors duration-300 dark:bg-[#000903] bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F04646] to-transparent opacity-10 dark:opacity-20"></div>

      {/* Main container */}
      <div className="max-w-4xl mx-auto text-center rounded-lg shadow-lg p-8 bg-gradient-to-br from-white via-[#FFF6F6] to-white dark:from-[#000903] dark:to-[#101214]">
        <h2 className="text-4xl font-extrabold text-[#F04646] dark:text-white mb-6">
          Drive Your Dreams Today!
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Discover the car of your dreams at unbeatable prices. Book now and hit the road with style!
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 font-semibold text-white bg-[#F04646] rounded-lg shadow-lg hover:bg-[#d03c3c] transform transition-all duration-300 hover:scale-105">
            Book Now
          </button>
          <button className="px-8 py-3 font-semibold border-2 border-[#F04646] text-[#F04646] rounded-lg hover:bg-[#F04646] hover:text-white transform transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
