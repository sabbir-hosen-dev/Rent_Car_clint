import { Helmet } from "react-helmet"
import Banner from "../Components/Home/Banner"
import RecentListings from "../Components/Home/ResentListing"
import SpecialOffers from "../Components/Home/SpecialOffers"
import UserTestimonials from "../Components/Home/Testimonials"
import WhyChooseUs from "../Components/Home/WhyChooseUs"

function Home() {
  return (
    <div>
            <Helmet>
        <title> Rent Car</title>
      </Helmet>
      <Banner />
      <WhyChooseUs />
      <RecentListings />
      <UserTestimonials />
      <SpecialOffers />
    </div>
  )
}

export default Home
