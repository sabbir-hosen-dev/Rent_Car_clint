import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Autoplay } from 'swiper/modules'; // Include Autoplay
import { FaStar } from 'react-icons/fa'; // Ensure react-icons is installed
import { useRef } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';

const UserTestimonials = () => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const testimonials = [
    {
      name: 'Annette Black',
      position: 'Project Manager',
      rating: 5,
      feedback:
        'Renting a car from Nova Ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.',
      image:
        'https://img.freepik.com/free-photo/front-view-sensitive-man-crying_23-2149438519.jpg',
    },
    {
      name: 'John Doe',
      position: 'Software Engineer',
      rating: 4,
      feedback:
        'The car was great, and the service was outstanding. I will definitely rent again next time.',
      image:
        'https://img.freepik.com/free-photo/front-view-man-with-beard-posing_23-2149438512.jpg',
    },
    {
      name: 'Jane Smith',
      position: 'Marketing Director',
      rating: 5,
      feedback:
        'Amazing experience! The car was clean, and the process was quick and easy. Highly recommend!',
      image: 'https://pics.craiyon.com/2023-11-15/GagX-401RmKzhk5H6nnmyQ.webp',
    },
    {
      name: 'Mark Johnson',
      position: 'Sales Executive',
      rating: 4,
      feedback:
        'I had a good experience renting with Nova Ride. The car worked perfectly for my business trip.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s',
    },
    {
      name: 'Emily Davis',
      position: 'Graphic Designer',
      rating: 5,
      feedback:
        'I loved the vehicle I rented. The price was reasonable, and it was very comfortable to drive.',
      image:
        'https://photos.peopleimages.com/picture/202307/2709813-black-man-business-and-selfie-with-a-smile-on-face-of-an-influencer-person-at-work.-portrait-of-an-african-guy-or-entrepreneur-with-job-satisfaction-and-pride-for-social-media-profile-picture-update-fit_400_400.jpg',
    },
    {
      name: 'Michael Brown',
      position: 'Product Manager',
      rating: 4,
      feedback:
        'The booking process was easy, but I think the car could have been cleaner on pick-up.',
      image:
        'https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg',
    },
    {
      name: 'Sophia Johnson',
      position: 'HR Specialist',
      rating: 5,
      feedback:
        'Great service, smooth ride. Everything was perfect for my weekend getaway.',
      image:
        'https://wallpapers.com/images/hd/professional-profile-pictures-2880-x-1920-xq8yol0nn3qfm0w4.jpg',
    },
    {
      name: 'David Lee',
      position: 'Engineer',
      rating: 3,
      feedback:
        'The car was fine, but I expected a bit better customer support when I had a question.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&s',
    },
    {
      name: 'Olivia Martinez',
      position: 'Business Consultant',
      rating: 5,
      feedback:
        'I am always satisfied with Nova Ride. I have rented several times, and the cars are always top-notch.',
      image:
        'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=',
    },
    {
      name: 'James Wilson',
      position: 'Data Scientist',
      rating: 4,
      feedback:
        'Excellent car rental service! The car was in great condition and the experience was hassle-free.',
      image:
        'https://t3.ftcdn.net/jpg/03/70/29/26/360_F_370292674_QS5nA0bJgyRD6VzYycTQdSWhhSHQJbQZ.jpg',
    },
    {
      name: 'Charlotte Moore',
      position: 'Photographer',
      rating: 5,
      feedback:
        'The car was perfect for my needs, and the service was fast and friendly. Definitely coming back.',
      image:
        'https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp',
    },
    {
      name: 'Benjamin Harris',
      position: 'Financial Analyst',
      rating: 4,
      feedback:
        'Great experience overall, but I would have liked more options for longer rental periods.',
      image:
        'https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg',
    },
    {
      name: 'Ava Young',
      position: 'Teacher',
      rating: 5,
      feedback:
        'I had an amazing experience renting with Nova Ride. The car was clean and in excellent condition.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YuTzeceS0GBSlQNED5Aj08mBKucsLWa18w&s',
    },
    {
      name: 'Lucas Scott',
      position: 'Chef',
      rating: 3,
      feedback:
        'The car was decent, but I had some minor issues with the GPS. Still, a good experience overall.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRinxUlZyH5cwOafVdjDcAxHgoFIxolEy_gkw&s',
    },
    {
      name: 'Mia Taylor',
      position: 'Photographer',
      rating: 5,
      feedback:
        'Excellent service! The car was perfect for my road trip, and everything went smoothly.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStX30u64vqr78btCdffmt0lPw6gIogzbJw0Ez75QaGh1F8lUhBiJnFrixGZORzEtC7tQM&usqp=CAU',
    },
  ];

  return (
    <div className="relative wrap py-10">
      <div className="m-auto text-center">
        <Fade duration="4000">
          <Slide direction="left">
            <h2 className="text-4xl font-bold text-white mb-2">
              What Our Customers Are
            </h2>
          </Slide>
        </Fade>

        <Fade duration="4000">
          <Slide direction="right">
            <h3 className="text font-semibold text-white mb-12">
              Saying About Us
            </h3>
          </Slide>
        </Fade>
      </div>
      <Fade duration="2000">
        <Swiper
          modules={[Navigation, Autoplay]} // Include Autoplay module
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          onSwiper={swiper => {
            swiper.params.navigation.prevEl = prevButtonRef.current;
            swiper.params.navigation.nextEl = nextButtonRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          autoplay={{
            delay: 3000, // Autoplay delay in milliseconds
            disableOnInteraction: false, // Continue autoplay after interactions
          }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            640: {
              // Small screens (sm)
              slidesPerView: 1,
            },
            768: {
              // Medium screens (md)
              slidesPerView: 2,
            },
            1024: {
              // Large screens (xl)
              slidesPerView: 3,
            },
          }}
          className="pb-10" // Add padding at the bottom for buttons
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center p-6 bg-card shadow-lg rounded-xl">
                {/* User Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full border-2 border-primary mb-4"
                />
                {/* Name and Position */}
                <h3 className="text-xl font-semibold mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-text/70 mb-4">
                  {testimonial.position}
                </p>
                {/* Rating */}
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={
                        starIndex < testimonial.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                {/* Feedback */}
                <p className="text-text/70 italic">{testimonial.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Fade>
      {/* Custom Navigation Buttons */}
      <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 flex space-x-4 mt-4">
        <button
          ref={nextButtonRef}
          className="bg-primaryP text-white rounded-full w-9 h-9 shadow-md hover:shadow-lg flex justify-center items-center font-bold cursor-pointer">
          <AiOutlineLeft className="font-bold" />
        </button>
        <button
          ref={prevButtonRef}
          className="bg-primaryP text-white rounded-full w-9 h-9 shadow-md hover:shadow-lg flex justify-center items-center font-bold cursor-pointer">
          <AiOutlineRight className="font-bold" />
        </button>
      </div>
    </div>
  );
};

export default UserTestimonials;
