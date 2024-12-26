import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyCar from '../Components/Table/MyCar';

import { useAxiosSecure } from '../Hook/useAxios';
import useAuthContext from '../Hook/useAuthContext';
import IsLodding from './IsLodding';
import DataNotFound from '../Components/DataNotFound';
import EditCarModal from '../Components/EditCarModal';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';

const MyCarsPage = () => {
  const [cars, setCars] = useState(null);
  const axiosIntSecure = useAxiosSecure();

  // const [selectedCar, setSelectedCar] = useState(null);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [edit, setEdit] = useState(null);
  const [request, setRequest] = useState(0);

  useEffect(() => {
    fetchMycars();
    fetchBookings();
  }, []);

  const fetchMycars = async () => {
    setLoading(true); // Start loading before the request
    try {
      const { data } = await axiosIntSecure.get(`/my-cars/${user?.email}`);
      setCars(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError(true), setLoading(false);
    }
  };

  const fetchBookings = () => {
    axiosIntSecure
      .get(`/booking/request/status?email=${user.email}&status=Pending`)
      .then(res => {
        setRequest(res.data.length);
      })
      .catch(err => console.log(err));
  };

  const handleSortChange = event => {
    const sortValue = event.target.value;

    const sortedData = [...cars];

    if (sortValue === 'date-desc') {
      sortedData.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    } else if (sortValue === 'date-asc') {
      sortedData.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
    } else if (sortValue === 'price-asc') {
      sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortValue === 'price-desc') {
      sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setCars(sortedData);
  };

  if (loading) return <IsLodding />;
  if (err) return <DataNotFound />;

  return (
    <>
      {cars && (
        <div className="">
          <Helmet>
            <title>My Cars  | Rent Car</title>
          </Helmet>
          <EditCarModal fetchMycars={fetchMycars} id={edit} />
          <div className="wrap  min-h-screen p-6">
            <div className="mb-4 flex justify-between items-center">
              <select
                className="select input input-bordered bg-card text-text"
                onChange={handleSortChange}>
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="price-asc">Lowest Price</option>
                <option value="price-desc">Highest Price</option>
              </select>

              <div className="flex items-center gap-2">
                <div className="relative">
                  {request == 0 ? (
                    ''
                  ) : (
                    <span className="badge absolute bg-primaryP text-text font-bold -top-4 -right-1">
                      {request}
                    </span>
                  )}
                  <Link to="/booking-request" className="my-btn3 w-full h-full">
                    Request Car
                  </Link>
                </div>
              </div>
            </div>

            {cars?.length === 0 ? (
              <div className="text-center p-8 bg-card">
                <p className="text-text mb-4">
                  You haven&apos;t added any cars yet!
                </p>
                <Link to="/add-car" className="btn btn-primaryP">
                  Add Your Car
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto bg-card p-6 rounded-lg shadow-lg">
                <Fade>
                  <table className="table-auto w-full text-center">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-primaryP">Car Image</th>
                        <th className="px-4 py-2 text-primaryP">Car Model</th>
                        <th className="px-4 py-2 text-primaryP">
                          Daily Rental Price
                        </th>
                        <th className="px-4 py-2 text-primaryP">Features</th>
                        <th className="px-4 py-2 text-primaryP">Date Added</th>
                        <th className="px-4 py-2 text-primaryP">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cars &&
                        cars?.map(car => (
                          <MyCar
                            setEdit={setEdit}
                            setLoading={setLoading}
                            key={car._id}
                            car={car}
                            fetchMycars={fetchMycars}
                          />
                        ))}
                    </tbody>
                  </table>
                </Fade>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyCarsPage;
