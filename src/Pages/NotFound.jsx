import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full h-screen flex  justify-center items-center  flex-col">
      <div className="flex flex-col  ">
        <img
          className="w-[350px] m-auto"
          src="https://assets.dochipo.com/editor/animations/404-error/36342188-38b5-4d0e-b134-e713b9027592.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 ">
        <h1 className="m-auto font-bold text-3xl text-primaryP ">
          Page Not Found
        </h1>
        <Link to="/" className="my-btn inline-block m-auto ">GO HOME</Link>
      </div>
    </div>
  );
}

export default NotFound;
