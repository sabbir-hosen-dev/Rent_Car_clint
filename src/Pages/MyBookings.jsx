import { useEffect, useState } from 'react';
import useAuthContext from '../Hook/useAuthContext';
import { axiosInt } from '../Hook/useAxios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import IsLodding from './IsLodding';

const MyBookings = () => {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchBookings = () => {
    setLoading(true);
    axiosInt
      .get(`/my-bookings/${user.email}`)
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

  const handleModifyDate = booking => {
    setSelectedBooking(booking);
    setStartDate(booking.bookingDate ? new Date(booking.bookingDate) : null); // Ensure it's a valid date
    setEndDate(booking.endDate ? new Date(booking.endDate) : null); // Ensure it's a valid date
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
      endDate: endDate,
    };

    axiosInt
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
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`hover:bg-green-50 dark:hover:bg-gray-700 ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                <td className="px-4 py-4">
                  <img
                    src={booking.image}
                    alt={booking.model}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-4">{booking.model}</td>
                <td className="px-4 py-4">
                  {booking.bookingDate &&
                    format(new Date(booking.bookingDate), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-4 py-4">${booking.price}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      booking.bookingStatus === 'Confirmed'
                        ? 'bg-green-500'
                        : 'bg-orange-500'
                    }`}>
                    {booking.bookingStatus}
                  </span>
                </td>
                <td className="px-4 flex flex-col items-center justify-center gap-2 max-w-[170px] py-4">
                  <div className="flex flex-col gap-2 items-center gap-x-4">
                    <button
                      className="flex btn-sm items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 w-full dark:bg-red-700 dark:hover:bg-red-800 transition"
                      onClick={() => handleCancelBooking(booking._id)}>
                      <FaTrashAlt />
                      <div className="sapn hidden md:block"> Cancel</div>
                    </button>

                    <button
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
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[400px] max-w-[500px]">
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
