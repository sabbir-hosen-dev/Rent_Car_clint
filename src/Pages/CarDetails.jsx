import { format } from 'date-fns'; // For date formatting
import IsLodding from './IsLodding';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInt } from '../Hook/useAxios';
import Swal from 'sweetalert2'; // SweetAlert2 for modal
import useAuthContext from '../Hook/useAuthContext';
import toast from 'react-hot-toast';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);
  const { user: curentUser } = useAuthContext();

  useEffect(() => {
    axiosInt
      .get(`/cars/${id}`)
      .then(res => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <IsLodding />;
  }

  const handleBookNow = () => {
    const { model, price, availability, location } = car;

    Swal.fire({
      title: 'Confirm Your Booking',
      html: `
        <div style="text-align: left;">
          <p><strong>Car Model:</strong> ${model}</p>
          <p><strong>Price Per Day:</strong> $${price}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Available from:</strong> ${
            availability && format(new Date(availability), 'dd/MM/yyyy')
          }</p>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm Booking',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        const bookingData = {
          carId: id,
          model,
          price,
          location,
          bookingDate: new Date().toISOString(),
          bookingStatus: 'panding',
        };

        if (curentUser?.email == user.email) {
          toast.error('Action not permitted!');
          return;
        }
        axiosInt
          .post('/bookings', bookingData)
          .then(() => {
            Swal.fire({
              title: 'Booking Confirmed!',
              text: `Your booking for ${model} has been confirmed.`,
              icon: 'success',
            });
          })
          .catch(err => {
            console.error(err);
            Swal.fire({
              title: 'Booking Failed!',
              text: 'Something went wrong. Please try again.',
              icon: 'error',
            });
          });
      }
    });
  };

  const {
    model,
    price,
    availability,
    features,
    description,
    image,
    location,
    user,
    postDate,
  } = car;

  return (
    <div className="bg-bg wrap bg-card p-5 rounded-lg shadow-lg my-20">
      <div className="grid xl:grid-cols-2 grid-cols-1 items-center gap-8">
        {/* Car Image */}
        <div className="relative">
          <img
            src={image}
            alt={model}
            className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-4xl font-extrabold">{model}</h1>
          <p className="text-base text-text/80 mt-2">
            Price Per Day:{' '}
            <span className="font-semibold text-green-600">${price}</span>
          </p>
          <p className=" text-base text-text/80 mt-2">Location: {location}</p>
          <p className=" text-base text-text/80 mt-2">
            Available from:{' '}
            {availability && format(new Date(availability), 'dd/MM/yyyy')}
          </p>

          {/* Features */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-text">Features:</h2>
            <ul className="list-disc pl-6 mt-2 text-text/80">
              {features.split(', ').map((feature, index) => (
                <li key={index} className="text-lg">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Car Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Car Description:</h2>
            <p className=" text-base text-text/80 mt-2">{description}</p>
          </div>

          {/* Owner Information */}
          <div className="mt-3">
            <h2 className="text font-semibold">Owner Information:</h2>
            <div className="flex items-center gap-3 mt-3">
              <img
                src={user.photo}
                alt={user.name}
                className="w-16 h-16 rounded-full border-2 border-primaryP"
              />
              <div>
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-base text-text/80">{user.email}</p>
              </div>
            </div>
          </div>
          {/* Booking Count & Post Date */}
          <div className="mt-4  text-base text-text/80">
            {postDate && (
              <p>Post Date: {format(new Date(postDate), 'dd/MM/yyyy')}</p>
            )}
          </div>

          {/* Book Now Button */}
          <div className="mt-6">
            <button onClick={handleBookNow} className="my-btn">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
