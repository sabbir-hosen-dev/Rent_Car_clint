import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { axiosInt } from '../Hook/useAxios';
import IsLodding from './IsLodding';
import DataNotFound from '../Components/DataNotFound';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';

const AvailableCars = () => {
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const itemsPerPage = 12; // Max items per page

  const fetchCars = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInt.get(`/cars/page?page=${page}&limit=${itemsPerPage}`);
      setData(response.data.items); // Items for the current page
      setTotalPages(response.data.totalPages); // Total pages
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  if (loading) return <IsLodding />;
  if (error) return <DataNotFound />;

  return (
    <div className="wrap">
      {/* Header Section */}
      <div className="flex flex-col  my-5 md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex justify-between w-full gap-5">
          {/* View Toggle */}
          <div className="flex items-center">
            <button
              className={`${view === 'grid' ? 'text-primaryP' : ''}`}
              onClick={() => setView('grid')}>
              <BsGrid3X3Gap className="inline-flex items-center z-50 p-2 w-10 h-10 justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-50 hover:text-primaryP" />
            </button>
            <button
              className={`${view === 'list' ? 'text-primaryP' : ''}`}
              onClick={() => setView('list')}>
              <AiOutlineUnorderedList className="inline-flex items-center z-50 p-2 w-10 h-10 justify-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-50 hover:text-primaryP" />
            </button>
          </div>
        </div>
      </div>

      {/* Display Cars */}
      <div
        className={`${
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            : ''
        } gap-5`}>
        {data.map(car => (
          <div key={car._id}>
            <Helmet>
              <title>Available Cars | Rent Car</title>
            </Helmet>
            <Fade>
              <div
                className={`card bg-card shadow-md shadow-input  p-4  flex ${
                  view === 'grid' ? 'flex-col' : 'flex-row mb-5 items-center'
                } gap-4 rounded-lg`}>
                <div
                  className={`${
                    view === 'grid' ? 'w-full' : 'w-32 h-32'
                  } flex-shrink-0 relative`}>
                  <img
                    src={car.image}
                    alt={car.model}
                    className={`${
                      view === 'grid' ? 'h-48 w-full' : 'h-full w-full'
                    } object-cover rounded-lg`}
                  />
                  <div className="absolute top-2 right-2 bg-[#0000004e] text-white text-xs px-2 py-1 rounded-md">
                    ${car.price}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{car.model}</h2>
                    <p className="text-sm">
                      Location: <span className="font-medium">{car.location}</span>
                    </p>
                    <p className="text-sm">
                      Availability:{' '}
                      <span className="font-medium">
                        {format(new Date(car.availability), 'dd/MM/yyyy')}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/cars/${car._id}`}
                      className={`my-btn2 text-text ${
                        view === 'list' ? 'btn-sm' : 'w-full block'
                      }`}>
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="join mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
