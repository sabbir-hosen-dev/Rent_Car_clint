
// import { useState } from "react";

import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../Hook/useAuthContext";
import { Helmet } from "react-helmet";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import animation from "../../LottieFiles/login.json"
import Lottie from "lottie-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [eyes , setEyes] = useState(false)
   

  const { googleSignIn,setUser,user,loginUser } = useAuthContext();

  const handleGoogle = () => {
    googleSignIn()
    .then(user => {
      const {displayName,photoURL,email} = user.user

      setUser({
        ...user,
        name: displayName,
        email: email,
        photo: photoURL
      })

      // Swal.fire({
      //   title: "Sign In Successful!",
      //   text: "You’ve signed in with Google. Welcome back!",
      //   icon: "success",
      //   confirmButtonText: "Proceed",
      // });
      
      navigate(`${location?.state?.form || "/"}`)
    })
    .catch(err => console.log(err))
  }
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    loginUser(email,password)
    .then(data => {
      const {displayName,email,photoURL} = data.user
      setUser({
        ...user,
        name: displayName,
        email: email,
        photo: photoURL
      });

      // Swal.fire({
      //   title: "Welcome Back!",
      //   text: `Hi ${name}, you're logged in successfully.`,
      //   icon: "success",
      //   confirmButtonText: "Continue",
      // });
      
      
      form.reset();

      navigate(`${location?.state?.form || "/"}`)

    })
    .catch((error) => {
      console.error("Login error:", error.message);

      // Swal.fire({
      //   title: "Login Failed",
      //   text: error.message,
      //   icon: "error",
      //   confirmButtonText: "Try Again",
      // });
    });

  };

  

  return (
    <section
      className="bg-cover bg-center"
    >
            <Helmet >
        <title>Login | Rent Car</title>
      </Helmet>
      <div className=" wrap border grid grid-cols-1  xl:grid-cols-2 my-20 rounded-2xl">
        <div className="">
          <Lottie
            loop={true}
            animationData={animation}
          />
        </div>
        <div className="w-full m-auto  rounded-lg shadow dark:shadow-stone-300 sm:max-w-md xl:p-0 bg-bg border-base-300">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl ">
              Login to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-text font-medium "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="  bg-input border border-gray-300 text-text  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  ref={emailRef}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-text "
                >
                  Password
                </label>

                <div className="relative">
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    {eyes ? (
                      <AiOutlineEye
                        onClick={() => setEyes(false)}
                        className="hover:text-pin"
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => setEyes(true)}
                        className="hover:text-pin"
                      />
                    )}
                  </div>
                <input
                  type={!eyes ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="  bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
                </div>
                <Link state={{ email: emailRef.current?.value || "" }} to="/reset"><small className="hover:text-pin/50">Forget Password</small></Link>
              </div>

              
              <button
                type="submit"
                className="w-full bg-pin text-white hover:bg-pin/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full border border-neutral-400 hover:bg-pin duration-300 hover:border-pin text-text font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center gap-2"
              >
                <FcGoogle className="w-5 h-5" />
                Sign in with Google
              </button>
              <p className="text-sm font-light text-text ">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  <span className="text-blue-400">Sign Up here</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;