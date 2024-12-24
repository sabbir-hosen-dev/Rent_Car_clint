import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      carImage: 'https://via.placeholder.com/100',
      carModel: 'Toyota Corolla 2023',
      bookingDate: '12-03-2024 14:30',
      totalPrice: 120,
      status: 'Confirmed',
    },
    {
      id: 2,
      carImage: 'https://via.placeholder.com/100',
      carModel: 'Honda Civic 2022',
      bookingDate: '15-03-2024 10:00',
      totalPrice: 150,
      status: 'Pending',
    },
  ]);

  const handleCancelBooking = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'bg-red-600 text-white hover:bg-red-700',
        cancelButton: 'bg-gray-300 text-black hover:bg-gray-400',
      },
    }).then(result => {
      if (result.isConfirmed) {
        setBookings(prev =>
          prev.map(booking =>
            booking.id === id ? { ...booking, status: 'Canceled' } : booking
          )
        );
        Swal.fire('Canceled!', 'The booking has been canceled.', 'success');
      }
    });
  };

  const handleModifyBookingDate = id => {
    Swal.fire({
      title: 'Modify Booking Date',
      html: `
        <label class="block text-left mb-2">New Start Date:</label>
        <input type="datetime-local" id="startDate" class="w-full p-2 border rounded mb-4" />
        <label class="block text-left mb-2">New End Date:</label>
        <input type="datetime-local" id="endDate" class="w-full p-2 border rounded" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (!startDate || !endDate) {
          Swal.showValidationMessage('Please select both dates.');
        }

        return { startDate, endDate };
      },
      customClass: {
        confirmButton: 'bg-blue-600 text-white hover:bg-blue-700',
        cancelButton: 'bg-gray-300 text-black hover:bg-gray-400',
      },
    }).then(result => {
      if (result.isConfirmed) {
        const { startDate, endDate } = result.value;

        setBookings(prev =>
          prev.map(booking =>
            booking.id === id
              ? { ...booking, bookingDate: `${startDate} to ${endDate}` }
              : booking
          )
        );

        Swal.fire(
          'Updated!',
          'The booking dates have been updated.',
          'success'
        );
      }
    });
  };

  return (
    <div className="wrap py-6">
      <div className="overflow-hidden border border-gray-300 dark:border-gray-700 md:rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-card">
            <tr>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-semibold text-left">
                Car Image
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-semibold text-left">
                Car Model
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-semibold text-left">
                Booking Date
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-semibold text-left">
                Total Price
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-semibold text-left">
                Status
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={`hover:bg-gray-300 dark:hover:bg-gray-700 ${
                  index % 2 === 0
                    ? 'bg-gray-50 dark:bg-gray-800'
                    : 'bg-gray-100 dark:bg-gray-900'
                }`}>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  <img
                    src={booking.carImage}
                    alt={booking.carModel}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {booking.carModel}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {booking.bookingDate}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  ${booking.totalPrice}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                      booking.status === 'Confirmed'
                        ? ' bg-green-400 text-white'
                        : booking.status === 'Pending'
                        ? 'bg-orange-400 text-white '
                        : 'bg-red-100 text-red-500 dark:bg-red-600 dark:text-red-200'
                    }`}>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-500'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}></span>
                    <h2 className="text-sm font-medium">{booking.status}</h2>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-4">
                    <button
                      className="text-red-600 hover:text-red-800 transition duration-200"
                      onClick={() => handleCancelBooking(booking.id)}>
                      <FaTrashAlt className="inline mr-1" /> Cancel
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800 transition duration-200"
                      onClick={() => handleModifyBookingDate(booking.id)}>
                      <FaCalendarAlt className="inline mr-1" /> Modify Date
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

export default MyBookings;
