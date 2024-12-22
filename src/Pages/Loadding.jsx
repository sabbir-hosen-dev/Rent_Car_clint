import Lottie from "lottie-react"
import car from "../LottieFiles/carLoadding.json"


function Loadding() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Lottie animationData={car} />
    </div>
  )
}

export default Loadding
