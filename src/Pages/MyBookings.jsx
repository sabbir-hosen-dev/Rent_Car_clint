import { useEffect, useState } from 'react';
import useAuthContext from '../Hook/useAuthContext';
import { axiosInt, useAxiosSecure } from '../Hook/useAxios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { differenceInDays, format } from 'date-fns';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import IsLodding from './IsLodding';
import { Link } from 'react-router-dom';
import DataNotFound from '../Components/DataNotFound';

const MyBookings = () => {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const axiosIntSecure = useAxiosSecure();

  const fetchBookings = () => {
    setLoading(true);
    axiosIntSecure
      .get(`/my-bookings/${user.email}`)
      .then(res => {
        setBookings(res.data);
        // console.log(res.data)
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

  const handleCancelBooking = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        axiosInt
          .delete(`/bookings/${id}`)
          .then(() => {
            toast.success('Booking canceled successfully');
            fetchBookings();
          })
          .catch(err => toast.error(err.message));
      }
    });
  };
  const getDefaultDate = (date1, date2) => (date2 ? new Date(date2) : date1);
  const handleModifyDate = booking => {
    setSelectedBooking(booking);
    const startDateValue = booking.bookingDate
      ? new Date(booking.bookingDate)
      : null;
    setStartDate(startDateValue);
    setEndDate(getDefaultDate(startDateValue, booking.endDate));
    setShowModal(true);
  };

  const handleSaveDateChanges = () => {
    // Validate start and end dates
    if (!startDate || !endDate) {
      toast.error('Please select valid dates');
      return;
    }

    if (startDate >= endDate) {
      toast.error('End date must be after the start date');
      return;
    }

    setLoading(true); // Start loading state
    const updatedBooking = {
      ...selectedBooking,
      bookingDate: startDate,
      bookingEndDate: endDate,
    };

    axiosIntSecure
      .put(`/bookings/${selectedBooking._id}`, updatedBooking)
      .then(() => {
        toast.success('Booking dates updated successfully');
        fetchBookings();
        setShowModal(false);
      })
      .catch(() => {
        toast.error('Failed to update dates');
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  };

  if (loading) return <IsLodding />;
  if (error) return <DataNotFound />;

  return (
    <div className="wrap py-6">
      <div className=" py-2 mb-3 flex justify-end">
        <Link to="/DailyRentalPrices" className="my-btn3 ">
        Daily Rental Prices
        </Link>
      </div>
      <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Car Image
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Car Model
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Booking Start Date
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Booking End Date
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
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`hover:bg-green-50 dark:hover:bg-gray-700 ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                <td className="px-4 py-4">
                  <Link to={`/cars/${booking.carId}`}>
                    <img
                      src={booking.image}
                      alt={booking.model}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="px-4 py-4">{booking.model}</td>

                {console.log(booking)}
                {/* {booking.bookingDate && setEndDate(booking.endDate || booking.bookingDate)} */}
                <td className="px-4 py-4">
                  {booking.bookingDate &&
                    format(new Date(booking.bookingDate), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-4 py-4">
                  {booking.bookingDate &&
                    format(
                      new Date(booking.bookingEndDate),
                      'dd/MM/yyyy HH:mm'
                    )}
                </td>
                <td className="px-4 py-4">
                  {booking.bookingDate && booking.bookingEndDate ? (
                    <p>
                      $
                      {differenceInDays(
                        new Date(booking.bookingEndDate),
                        new Date(booking.bookingDate)
                      ) * booking.price}
                    </p>
                  ) : (
                    'N/A'
                  )}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      booking.bookingStatus === 'Confirmed'
                        ? 'bg-green-300 text-green-600' // Green for Confirmed
                        : booking.bookingStatus === 'Pending'
                        ? 'bg-orange-100 text-orange-600' // Orange for Pending
                        : booking.bookingStatus === 'Canceled'
                        ? 'bg-red-300 text-red-600' // Red for Canceled
                        : 'bg-gray-500 text-gray-100' // Default gray for unknown statuses
                    }`}>
                    {/* Circle indicator */}
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
                    {/* Booking status text */}
                    {booking.bookingStatus}
                  </span>
                </td>
                <td className="px-4 flex flex-col items-center justify-center gap-2 max-w-[170px] py-4">
                  <div className="flex flex-col gap-2 items-center gap-x-4">
                    <button
                      disabled={
                        booking.bookingStatus === 'Confirmed' ? true : false
                      }
                      className="flex btn-sm items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 w-full dark:bg-red-700 dark:hover:bg-red-800 transition"
                      onClick={() => handleCancelBooking(booking._id)}>
                      <FaTrashAlt />
                      <div className="sapn hidden md:block"> Cancel</div>
                    </button>

                    <button
                      disabled={
                        booking.bookingStatus === 'Confirmed' ? true : false
                      }
                      className="flex btn-sm items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
                      onClick={() => handleModifyDate(booking)}>
                      <FaCalendarAlt className="inline" />
                      <div className="sapn hidden md:block">Modify Date</div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-500 p-6 rounded-lg shadow-lg min-w-[400px] max-w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Modify Booking Date</h2>
            <div className="flex flex-col gap-4">
              <label>Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                className="bg-input min-w-[224px]  border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              <label>End Date</label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                className="bg-input min-w-[224px]  border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                onClick={handleSaveDateChanges}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
