import { useNavigate } from "react-router-dom";
import vedio from "../../assets/vedio.mp4"
import Navbar from './../Sheard/Navber';

function Banner() {
  const navigate = useNavigate();

  return (
  <div className="">
   
    <section className="relative w-full h-[80vh] overflow-hidden">
   
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={vedio} 
        autoPlay
        loop
        muted
        playsInline
      ></video>

        <div className="w-full backdrop-blur-lg shadow-lg z-50 fixed">
          <Navbar />
        </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Drive Your Dreams Today!
        </h1>
        <p className="mt-4 text-lg md:text-xl drop-shadow-md">
          Your next car awaits you.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-primaryP text-white font-medium rounded-lg hover:bg-primaryP/80 focus:ring-4 focus:ring-primaryP/50 shadow-lg transition duration-300"
          onClick={() => navigate("/available-cars")}
        >
          View Available Cars
        </button>
      </div>
    </section>
  </div>
  );
}

export default Banner;
