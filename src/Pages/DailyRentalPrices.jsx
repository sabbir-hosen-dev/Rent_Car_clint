import { useEffect, useState } from 'react';
import { axiosInt } from '../Hook/useAxios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import IsLodding from './IsLodding';
import { Helmet } from 'react-helmet';

const DailyRentalPrices = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = () => {
    setLoading(true);
    axiosInt
      .get(`/bookings`) // Fetch all bookings data, can be filtered or adjusted as needed
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

  // Prepare data for the chart
  const getChartData = () => {
    return bookings.map(booking => ({
      model: booking.model,
      price: booking.price, // Use the daily rental price for the Y-axis
    }));
  };

  if (loading) return <IsLodding />;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="wrap py-6">
            <Helmet>
        <title>Daily Rental Price | Rent Car</title>
      </Helmet>
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-5">Car Daily Rental Prices</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="model" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="my-4">
        <Link to="/my-bokings" className="text-sky-500 underline">
          Back to My Bookings
        </Link>
      </div>
    </div>
  );
};

export default DailyRentalPrices;
