import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { Link, useNavigate } from 'react-router-dom';

import { updateProfile } from 'firebase/auth';
import { Helmet } from 'react-helmet';
import useAuthContext from '../../Hook/useAuthContext';
import auth from '../../Firebase/Firebase.config';

function SignUp() {
  const { createUser, setUser, user, googleSignIn } = useAuthContext();

  const [eye, setEye] = useState(true);
  const [eyes, setEyes] = useState(false);

  const navigate = useNavigate();

  const handleGoogle = () => {
    googleSignIn()
      .then(user => {
        const { displayName, photoURL, email } = user.user;
        setUser({
          ...user,
          name: displayName,
          email: email,
          photo: photoURL,
        });

        Swal.fire({
          title: 'Sign In Successful!',
          text: 'You’ve signed in with Google. Welcome back!',
          icon: 'success',
          confirmButtonText: 'Proceed',
        });

        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const [message, setMessage] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (name.trim().length < 2) {
      setMessage('Name must be at least 2 characters long.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    const isValidUrl =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-.,@?^=%&:/~+#]*)?$/.test(photo);
    if (!isValidUrl) {
      setMessage('Please enter a valid url');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(password)) {
      setMessage(
        'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setMessage(null);

    createUser(email, password).then(() => {
      setUser({
        ...user,
        name: name,
        email: email,
        photo: photo,
      });

      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      // Swal.fire({
      //   title: "Account Created Successfully!",
      //   text: `Welcome to ${name}! Start exploring now.`,
      //   icon: "success",
      //   confirmButtonText: "Let's Go!",
      // });

      form.reset();

      navigate('/login');
    });

    console.log(name, email, password, confirmPassword);
  };
  return (
    <section
      className="bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/5d/c3/50/5dc350fb8ef7a2c3dbdb1e3d4bc44083.gif')",
      }} // Replace with your actual image path
    >
      <Helmet>
        <title>Sign Up | Play Rev</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full border-neutral  rounded-lg shadow dark:border sm:max-w-md xl:p-0 bg-bg">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl ">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-text">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="Name"
                  placeholder="Name"
                  className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-text">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-text ">
                  Photo Url
                </label>
                <input
                  type="text"
                  name="photo"
                  id="url"
                  placeholder="Photo Url"
                  className="  bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-text">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    {eye ? (
                      <AiOutlineEyeInvisible
                        onClick={() => setEye(false)}
                        className="hover:text-pin"
                      />
                    ) : (
                      <AiOutlineEye
                        onClick={() => setEye(true)}
                        className="hover:text-pin"
                      />
                    )}
                  </div>
                  <input
                    type={eye ? 'password' : 'text'}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-text">
                  Confirm password
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
                    type={eyes ? 'password' : 'text'}
                    name="confirm-password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
              </div>
              <div className="">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4  h-4 border border-gray-300 rounded-xl bg-input "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-text">
                      I accept the{' '}
                      <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className="">
                  {message && <small className="text-red-500">{message}</small>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-pin text-text hover:bg-pin/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">
                Create an account
              </button>
              <button
                onClick={() => handleGoogle()}
                type="button"
                className="w-full border border-neutral-400 hover:bg-pin duration-300 hover:border-pin text-text font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center gap-2">
                <FcGoogle className="w-5 h-5" />
                Sign in with Google
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline">
                  <span className="text-blue-400">Login here</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
