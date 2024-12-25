function SpecialOffers() {
  // const offers = [
  //   {
  //     id: 1,
  //     title: 'Get 15% off for weekend rentals!',
  //     description:
  //       'Enjoy exclusive discounts on weekend rentals. Drive your dream car today!',
  //     buttonText: 'Learn More',
  //     image: 'https://via.placeholder.com/600x300?text=Special+Offer+1',
  //   },
  //   {
  //     id: 2,
  //     title: 'Luxury cars at $99/day this holiday season!',
  //     description:
  //       'Experience the luxury you deserve at a price you can afford.',
  //     buttonText: 'Book Now',
  //     image: 'https://via.placeholder.com/600x300?text=Special+Offer+2',
  //   },
  // ];

  return (
    <section className="py-16 bg-bgB">
      {/* <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map(offer => (
            <div
              key={offer.id}
              className="relative bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-text mb-4">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  {offer.description}
                </p>
                <button className="px-6 py-2 bg-primaryP text-white font-medium rounded-lg hover:bg-primaryP/50">
                  {offer.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="grid wrap grid-cols-1 md:grid-cols-2 justify-center items-center gap-6 p-6">
        {/* Card 1 */}
        <div className="relative bg-blue-500 text-white rounded-lg shadow-lg p-6 w-full hover:scale-105 transform transition-transform duration-300">
          <h2 className="text-2xl font-bold mb-2">
            Get 15% off for weekend rentals!
          </h2>
          <p className="text-sm mb-4">Plan your perfect weekend trip now.</p>
          <div className="flex justify-end">
            <button className="btn  border-none cursor-pointer bg-white text-blue-500 rounded-md px-4 py-2 hover:bg-blue-100 transition duration-200">
              Learn More
            </button>
          </div>
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-0 hover:opacity-10 transition duration-300"></div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-red-500 text-white rounded-lg shadow-lg p-6  hover:scale-105 transform transition-transform duration-300">
          <h2 className="text-2xl font-bold mb-2">
            Luxury cars at $99/day this holiday season!
          </h2>
          <p className="text-sm mb-4">
            Experience the ultimate in style and comfort.
          </p>
          <div className="flex justify-end">
            <button className="bg-white btn border-none  text-red-500 rounded-md px-4  hover:bg-red-100 transition cursor-pointer duration-200">
              Book Now
            </button>
          </div>
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 opacity-0 hover:opacity-10 transition duration-300"></div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
