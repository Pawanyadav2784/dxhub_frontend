import Categories from "./Categories"
import FeaturedProducts from "./FeaturedProducts"
import PromoBanner from "./PromoBanner"
import Features from "./Features"
import PopularProducts from "./PopularProducts"
import InstagramSection from "./InstagramSection"
import MapSection from "./MapSection"

const Home = () => {
  return (
    <div>
      <PromoBanner />
      <Categories />
      <FeaturedProducts />
      <Features />
      <PopularProducts />
      <InstagramSection />
    </div>
  )
}

export default Home
