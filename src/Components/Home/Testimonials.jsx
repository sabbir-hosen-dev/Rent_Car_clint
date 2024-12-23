
import { Swiper, SwiperSlide } from 'swiper/react';

import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://via.placeholder.com/100',
    rating: 5,
    review: 'Amazing service and great cars. Highly recommend!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/100',
    rating: 4,
    review: 'The car was in perfect condition, and booking was easy.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: 'https://via.placeholder.com/100',
    rating: 5,
    review: 'Fantastic experience! I will definitely rent again.',
  },
];

function UserTestimonials() {
  return (
    <section className="py-16 bg-bgB">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          What Our Customers Say
        </h2>
        <Swiper
          spaceBetween={50}  // Space between slides
          slidesPerView={1}  // Number of slides per view
          loop={true}  // Infinite looping of slides
          autoplay={{ delay: 2500, disableOnInteraction: false }}  // Auto play settings
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col items-center text-center p-6 bg-card shadow-lg rounded-xl">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full border-2 border-primaryP-600 mb-4"
                />
                <h3 className="text-xl font-semibold text-text mb-2">
                  {testimonial.name}
                </h3>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-text italic">{testimonial.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default UserTestimonials;
