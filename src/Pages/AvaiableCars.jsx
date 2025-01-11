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

  const [sortedData, setSortedData] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Start loading before the request
    axiosInt
      .get(`cars`)
      .then(res => {
        setData(res.data);
        setSortedData(res.data);
        setLoading(false);
        setError(false);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setError(true), setLoading(false);
      });
  }, []);

  // Handle Sorting
  const handleSortChange = e => {
    const sortValue = e.target.value;
    let sortedCars = [...data];

    if (sortValue === 'date-desc') {
      sortedCars.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    } else if (sortValue === 'date-asc') {
      sortedCars.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
    } else if (sortValue === 'price-asc') {
      sortedCars.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortValue === 'price-desc') {
      sortedCars.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    setData(sortedCars);
  };

  // Handle Search
  const handleSearch = e => {
    const value = e.target.value;

    const filteredData = sortedData.filter(car => {
      const model = car?.model?.toLowerCase() || '';
      const brand = car?.brand?.toLowerCase() || '';
      const location = car?.location?.toLowerCase() || '';

      return (
        model.includes(value.toLowerCase()) ||
        brand.includes(value.toLowerCase()) ||
        location.includes(value.toLowerCase())
      );
    });

    setData(filteredData);
  };

  if (loading) return <IsLodding />;
  if (error) return <DataNotFound />;

  return (
    <div className="wrap">
      {/* Header Section */}
      <div className="flex flex-col  my-5 md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex justify-between w-full gap-5 ">
          {/* Sort Options */}
          <select
            className="select  input input-bordered bg-card text-text"
            onChange={handleSortChange}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="price-asc">Lowest Price</option>
            <option value="price-desc">Highest Price</option>
          </select>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by model, brand, or location"
            className="bg-card w-full max-w-[400px] border border-border text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
            onChange={handleSearch}
          />

          {/* View Toggle */}
          <div className="flex items-center ">
            <button
              className={` ${view === 'grid' ? 'text-primaryP' : ''}`}
              onClick={() => setView('grid')}>
              <BsGrid3X3Gap className="inline-flex items-center z-50 p-2 w-10 h-10 justify-center  rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-50 hover:text-primaryP" />
            </button>
            <button
              className={` ${view === 'list' ? 'text-primaryP' : ''}`}
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
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 items-stretch'
            : 'grid grid-cols-1  md:grid-cols-2 items-stretch'
        } gap-5`}>
        {data?.map(car => (
          <div key={car._id} className="">
            <Helmet>
              <title>Avalible Cars | Rent Car</title>
            </Helmet>
            <Fade className='h-full'>
            {/* min-h-[383px] */}
              <div
                className={`card bg-card shadow-md shadow-input h-full  p-4  flex ${
                  view === 'grid' ? 'flex-col  ' : 'flex-row mb-5 items-center'
                }  gap-4 rounded-lg`}>
                {/* Car Image */}
                <div
                  className={`${
                    view === 'grid' ? 'w-full' : 'w-[150px] h-32'
                  } `}>
                  <img
                    src={car.image}
                    alt={car.model}
                    className={`${
                      view === 'grid' ? 'h-48 w-full' : 'h-full w-full'
                    } object-cover rounded-lg`}
                  />
                  <div className="absolute top-5 right-5 bg-[#0000004e] text-white  text-xs px-2 py-1 rounded-md">
                    ${car.price}
                  </div>
                </div>

                {/* Car Details */}
                <div className="flex-1 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold ">{car.model}</h2>
                    <p className="text-sm ">
                      <div className="flex  justify-between gap-2">
                        <span>Location: </span>
                        <span className="font-medium">{car.location}</span>
                      </div>
                      <div className="flex  justify-between gap-2">
                        <span>Availability:</span>
                        <span className="font-medium">
                          {format(new Date(car.availability), 'dd/MM/yyyy')}
                        </span>
                      </div>
                    </p>
                  </div>

                  {/* Book Now Button */}
                  <div className="mt-4">
                    <Link
                      to={`/cars/${car._id}`}
                      className={`btn btn-sm outline-none border-none flex justify-center items-center bg-primaryP hover:bg-primaryP/70 text-xs text-text  ${
                        view === 'list' ? 'max-w-[90px]' : 'w-full block'
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
    </div>
  );
};

export default AvailableCars;
