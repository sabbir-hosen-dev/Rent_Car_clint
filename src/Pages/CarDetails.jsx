import { differenceInDays, format } from 'date-fns'; // For date formatting
import IsLodding from './IsLodding';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { axiosInt, useAxiosSecure } from '../Hook/useAxios';
import useAuthContext from '../Hook/useAuthContext';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user: curentUser } = useAuthContext();
  const locationRoute = useLocation();
  const navigate = useNavigate();

  const axiosIntSecure = useAxiosSecure();

  useEffect(() => {
    axiosInt
      .get(`/cars/${id}`)
      .then(res => {
        setCar(res.data);
        setLoading(false);

        // Set default start and end dates based on car's availability
        const carAvailability = new Date(res.data.availability);
        const currentDate = new Date();

        // If car availability is earlier than today, set startDate to today
        setStartDate(
          carAvailability > currentDate ? carAvailability : currentDate
        );

        // Set endDate to one day after the startDate by default
        const defaultEndDate = new Date(carAvailability);
        defaultEndDate.setDate(defaultEndDate.getDate() + 1);
        setEndDate(defaultEndDate);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <IsLodding />;
  }

  const {
    model,
    price,
    availability,
    features,
    description,
    image,
    location,
    owner,
    postDate,
  } = car;

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    // Ensure dates are selected and valid
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates.');
      return;
    }
    if (startDate >= endDate) {
      toast.error('End date must be after the start date.');
      return;
    }

    const bookingData = {
      carId: id,
      model,
      price,
      location,
      bookingDate: startDate,
      bookingEndDate: endDate,
      bookingStatus: 'Pending',
      owner: owner,
      hirer: curentUser,
      image,
    };

    if (curentUser?.email === owner?.email) {
      toast.error('You cannot book your own car!');
      setShowModal(false);
      return;
    }

    // Assuming axiosIntSecure is a configured Axios instance for secure requests
    axiosIntSecure
      .post(`/bookings?email=${curentUser.email}`, bookingData)
      .then(() => {
        toast.success('Booking confirmed!');
        navigate('/my-bokings'); // Navigate to the user's bookings page
        setShowModal(false); // Close the modal
      })
      .catch(err => {
        console.error(err);
        toast.error('Booking failed. Please try again later.');
        setShowModal(false);
      });
  };

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
          <p className="text-base text-text/80 mt-2">Location: {location}</p>
          <p className="text-base text-text/80 mt-2">
            Available from:{' '}
            {availability && format(new Date(availability), 'dd/MM/yyyy')}
          </p>

          {/* Features */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-text">Features:</h2>
            <ul className="list-disc pl-6 mt-2 text-text/80">
              {features.split(', ').map((feature, index) => (
                <li key={index} className="text-lg capitalize">
                  {feature.charAt(0).toUpperCase() +
                    feature.slice(1).toLowerCase()}
                </li>
              ))}
            </ul>
          </div>

          {/* Car Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Car Description:</h2>
            <p className="text-base text-text/80 mt-2">{description}</p>
          </div>

          {/* Owner Information */}
          <div className="mt-3">
            <h2 className="font-semibold">Owner Information:</h2>
            <div className="flex items-center gap-3 mt-3">
              <img
                src={owner?.photo}
                alt={owner?.name}
                className="w-16 h-16 rounded-full border-2 border-primaryP"
              />
              <div>
                <p className="text-xl font-semibold">{owner?.name}</p>
                <p className="text-base text-text/80">{owner?.email}</p>
              </div>
            </div>
          </div>

          {/* Post Date */}
          <div className="mt-4 text-base text-text/80">
            {postDate && (
              <p>Post Date: {format(new Date(postDate), 'dd/MM/yyyy')}</p>
            )}
          </div>

          {/* Book Now Button */}
          <div className="mt-6 flex gap-5">
            <button onClick={handleBooking} className="my-btn">
              Book Now
            </button>
            {locationRoute?.state?.page === 'myBooking' && (
              <Link to="/my-bookings" className="btn bg-prima text-text">
                My Bookings
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
{/* Booking Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg min-w-[400px] max-w-[500px]">
      <h2 className="text-lg font-semibold mb-4">Confirm Your Booking</h2>
      <p>
        <strong>Model:</strong> {model}
      </p>
      <div className="flex justify-between">
        <p>
          Price: <strong>${price}</strong>
        </p>
        <p>
          Location: <strong>{location}</strong>
        </p>
      </div>
      <div className="mt-4">
        <label>Total Price</label>
        <p className="font-semibold text-xl">
          ${differenceInDays(new Date(endDate), new Date(startDate)) * price}
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <label>Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          minDate={new Date(availability)} // Ensure the start date is not before the available date
          dateFormat="dd/MM/yyyy HH:mm"
          className="bg-input min-w-[224px] border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
        <label>End Date</label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          showTimeSelect
          minDate={startDate} // Ensure the end date is not before the start date
          dateFormat="dd/MM/yyyy HH:mm"
          className="bg-input min-w-[224px] border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-300 text-sm font-medium rounded-lg"
          onClick={() => setShowModal(false)}>
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
          onClick={handleConfirmBooking}>
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CarDetails;
