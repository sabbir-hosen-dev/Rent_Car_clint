import { BiBlock } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import useAuthContext from '../Hook/useAuthContext';
import { useAxiosSecure } from '../Hook/useAxios';
import toast from 'react-hot-toast';

import { differenceInDays} from 'date-fns';
import IsLodding from './IsLodding';

const BookingRequest = () => {
  const axiosIntSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = () => {
    setLoading(true);
    axiosIntSecure
      .get(`/booking/request?email=${user.email}`)
      .then(res => {
        setBookings(res.data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        toast.error('Failed to fetch bookings');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatus = (id, status, carId) => {
    axiosIntSecure
      .patch(`/booking/${id}?status=${status}&carId=${carId}`)
      .then(() => {
        toast.success('Status Update');
        fetchBookings();
      });
  };

  // Function to calculate the price based on start and end date
  const calculatePrice = (startDate, endDate, pricePerDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days
    return diffDays * pricePerDay;
  };

  if (loading) return <IsLodding />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="wrap py-6">
      <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Car Image
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Hirer Name
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Car Model
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Booking Date
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Total Price
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Status
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking, index) => (
              <tr
                key={booking?._id}
                className={`hover:bg-green-50 dark:hover:bg-gray-700 ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                <td className="px-4 py-4">
                  <img
                    src={booking?.image}
                    alt={booking?.model}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-4">{booking?.hirer?.name}</td>
                <td className="px-4 py-4">{booking?.model}</td>
                <td className="px-4 py-4">
                  {booking?.bookingDate && booking?.bookingEndDate && (
                    <>
                      <div>
                        {differenceInDays(
                          new Date(booking?.bookingEndDate),
                          new Date(booking?.bookingDate)
                        )}{' '}
                        days
                      </div>
                    </>
                  )}
                </td>

                <td className="px-4 py-4">
                  {/* Calculate total price based on start and end date */}
                  {booking?.bookingDate && booking?.bookingEndDate && (
                    <span>
                      $
                      {calculatePrice(
                        booking.bookingDate,
                        booking.bookingEndDate,
                        booking.price
                      )}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="inline-block">
                    <span
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        booking.bookingStatus === 'Confirmed'
                          ? 'bg-green-300 text-green-600'
                          : booking.bookingStatus === 'Pending'
                          ? 'bg-orange-100 text-orange-600'
                          : booking.bookingStatus === 'Canceled'
                          ? 'bg-red-300 text-red-600'
                          : 'bg-gray-500 text-gray-100'
                      }`}>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          booking.bookingStatus === 'Confirmed'
                            ? 'bg-green-500'
                            : booking.bookingStatus === 'Pending'
                            ? 'bg-orange-500'
                            : booking.bookingStatus === 'Canceled'
                            ? 'bg-red-500'
                            : 'bg-gray-400'
                        }`}></span>
                      {booking.bookingStatus}
                    </span>
                  </div>
                </td>
                <td className="px-4 flex flex-col items-center justify-center gap-2 max-w-[170px] py-4">
                  <div className="flex flex-col gap-2 items-center gap-x-4">
                    <button
                      disabled={booking.bookingStatus === 'Confirmed'}
                      className="flex btn-sm items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-400 hover:bg-green-200 w-full transition"
                      onClick={() =>
                        handleStatus(booking._id, 'Confirmed', booking?.carId)
                      }>
                      <AiOutlineCheckCircle />
                      <div className="sapn hidden md:block"> Confirm</div>
                    </button>

                    <button
                      disabled={booking.bookingStatus === 'Canceled'}
                      className="flex btn-sm items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-400 hover:bg-red-200 transition"
                      onClick={() =>
                        handleStatus(booking._id, 'Canceled', booking?.carId)
                      }>
                      <BiBlock className="font-xl" />
                      <div className="sapn hidden md:block">Canceled</div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingRequest;
