import { FaCar, FaDollarSign, FaRegClock, FaHeadset } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaCar className="w-12 h-12 text-primaryP" />,
      title: "Wide Variety of Cars",
      description: "From budget-friendly options to luxury vehicles.",
    },
    {
      icon: <FaDollarSign className="w-12 h-12 text-primaryP" />,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on.",
    },
    {
      icon: <FaRegClock className="w-12 h-12 text-primaryP" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaHeadset className="w-12 h-12 text-primarP" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries.",
    },
  ];

  return (
    <section className="bg-bgB py-16">
      <div className="wrap  px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card text-primaryP rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-text mt-4">
                {feature.title}
              </h3>
              <p className="text-sm text-text mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
