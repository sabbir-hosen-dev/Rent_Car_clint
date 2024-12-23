import Banner from "../Components/Home/Banner"
import RecentListings from "../Components/Home/ResentListing"
import SpecialOffers from "../Components/Home/SpecialOffers"
import UserTestimonials from "../Components/Home/Testimonials"
import WhyChooseUs from "../Components/Home/WhyChooseUs"

function Home() {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <RecentListings />
      <UserTestimonials />
      <SpecialOffers />
    </div>
  )
}

export default Home
