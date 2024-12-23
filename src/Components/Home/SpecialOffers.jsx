function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "Get 15% off for weekend rentals!",
      description: "Enjoy exclusive discounts on weekend rentals. Drive your dream car today!",
      buttonText: "Learn More",
      image: "https://via.placeholder.com/600x300?text=Special+Offer+1",
    },
    {
      id: 2,
      title: "Luxury cars at $99/day this holiday season!",
      description: "Experience the luxury you deserve at a price you can afford.",
      buttonText: "Book Now",
      image: "https://via.placeholder.com/600x300?text=Special+Offer+2",
    },
  ];

  return (
    <section className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-text mb-4">{offer.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{offer.description}</p>
                <button className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/50">
                  {offer.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
