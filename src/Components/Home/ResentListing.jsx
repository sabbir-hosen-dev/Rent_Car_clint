import { useState } from "react";

function RecentListings() {
  const [listings] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/300x200?text=Car+1",
      model: "Toyota Camry 2023",
      price: "$45/day",
      available: true,
      posted: "2 days ago",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200?text=Car+2",
      model: "Honda Civic 2022",
      price: "$50/day",
      available: false,
      posted: "3 days ago",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200?text=Car+3",
      model: "BMW X5 2023",
      price: "$90/day",
      available: true,
      posted: "1 week ago",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x200?text=Car+4",
      model: "Mercedes-Benz C-Class 2023",
      price: "$100/day",
      available: true,
      posted: "5 days ago",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/300x200?text=Car+5",
      model: "Ford Mustang 2023",
      price: "$120/day",
      available: false,
      posted: "6 days ago",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/300x200?text=Car+6",
      model: "Tesla Model 3 2023",
      price: "$80/day",
      available: true,
      posted: "2 weeks ago",
    },
  ]);

  return (
    <section className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          Recent Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={listing.image}
                alt={listing.model}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-text">{listing.model}</h3>
                <p className="text-sm text-text mb-2">{listing.price}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Added: {listing.posted}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    listing.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {listing.available ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentListings;
