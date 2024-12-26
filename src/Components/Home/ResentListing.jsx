import { useEffect, useState } from 'react';
import { axiosInt } from '../../Hook/useAxios';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import IsLodding from '../../Pages/IsLodding';
import DataNotFound from '../DataNotFound';
import { Fade, Slide } from 'react-awesome-reveal';

function RecentListings() {
  const [latest, setLatest] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosInt
      .get('/latest')
      .then(res => {
        setLatest(res.data);
        setLoading(false);
        setError(false);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  }, []);

  // console.log(latest);

  if (loading) <IsLodding />;
  if (error) <DataNotFound />;

  return (
    <section className="py-16 bg-bgB">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          Recent Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest?.map(listing => (
            <Link
              to={`cars/${listing._id}`}
              key={listing._id}
              className="bg-card z-10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all  duration-300 transform hover:scale-105">
              <Fade>
                <img
                  src={listing.image}
                  alt={listing.model}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Fade>
              <div className="p-4 flex  flex-col">
                <Slide direction="down">
                  <h3 className="text-lg font-semibold text-text">
                    {listing.model}
                  </h3>
                </Slide>
                <Fade duration="3000">
                  <p className="text-sm flex-grow text-text mb-2">
                    <span className="font-bold">${listing.price}</span>/day
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Added:{' '}
                    {formatDistanceToNow(new Date(listing.postDate), {
                      addSuffix: true,
                    }).replace('about ', '')}
                  </p>
                </Fade>

                <Fade duration="4000">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      listing?.avalilable
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    {listing.avalilable ? 'Available' : 'Not Available'}
                  </span>
                </Fade>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentListings;
