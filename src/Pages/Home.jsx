import { Helmet } from "react-helmet"
import Banner from "../Components/Home/Banner"
import RecentListings from "../Components/Home/ResentListing"
import SpecialOffers from "../Components/Home/SpecialOffers"
import UserTestimonials from "../Components/Home/Testimonials"
import WhyChooseUs from "../Components/Home/WhyChooseUs"
import CallToAction from "../Components/Home/Cta"
import FAQ from "../Components/Home/Faq"
import ContactUs from "../Components/Home/ContactUs"

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
      <CallToAction />
      <FAQ />
      <ContactUs />
    </div>
  )
}

export default Home
