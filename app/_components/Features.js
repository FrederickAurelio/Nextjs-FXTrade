import Image from "next/image";
import FeaturesGrid from "./FeaturesGrid";
import FeaturesImg from "/public/features.png"
import FeaturesImg1 from "/public/features1.png"
import FeaturesImg2 from "/public/features2.png"
import FeaturesImg5 from "/public/features5.png"

export default function Features() {
  return (
    <section
      id="features"
      className="flex h-[200dvh] w-full flex-col overflow-hidden bg-zinc-100 px-6 py-5 md:h-dvh md:py-10 xl:px-36"
    >
      <FeaturesGrid>
        <div className="feature-container row-start-1 row-end-5 md:col-start-1 md:row-start-2 md:row-end-8">
          <Image alt="Trade Anywhere, Anytime" className="w-[80%] px-3 pb-2" src={FeaturesImg1} />
          <div className="px-3 text-justify">
            <h2 className="mb-1 text-xl font-semibold">
              Trade Anywhere, Anytime
            </h2>
            <p className="text-sm md:text-base">
              Our platform is designed to work seamlessly on both mobile and
              desktop devices. Whether you{"'"}re at home or on the go, you can
              access the app and manage your trades with ease.
            </p>
          </div>
        </div>
        <div className="feature-container row-start-5 row-end-8 md:col-start-2 md:row-start-1 md:row-end-6">
          <Image alt="Navigate with Ease" className="w-[45%] px-2 mb-4" src={FeaturesImg2} />
          <div className="px-3 text-justify">
            <h2 className="mb-2 text-xl font-semibold">Seamless Signup with Github</h2>
            <p className="text-sm md:text-base">
              Experience effortless account creation with our seamless GitHub signup integration. Skip the lengthy registration process and quickly get started by linking your GitHub account. Enjoy the convenience and security of one-click access, ensuring you spend less time setting up and more time trading.
            </p>
          </div>
        </div>
        <div className="feature-container row-start-8 row-end-10 md:col-start-2 md:row-start-6 md:row-end-9">
          <Image alt="Learn to Trade with No Risk" className="w-[60%] px-2 pb-2" src={FeaturesImg5} />
          <div className="px-2 text-justify">
            <h2 className="mb-1 text-xl font-semibold">
              Learn to Trade with No Risk
            </h2>
            <p className="text-sm md:text-base">
              Our app uses fake money, allowing you to learn and hone your
              trading skills without the fear of losing real money. Perfect for
              beginners and those looking to improve their strategies.
            </p>
          </div>
        </div>
        <div className="feature-container row-start-10 row-end-13 md:col-start-3 md:row-start-3 md:row-end-7">
          <Image
            alt="Realtime Exchange Currency"
            className="w-[50%] px-3 pb-4 md:w-[40%] md:pb-2"
            src={FeaturesImg}
          />
          <div className="px-3 text-justify">
            <h2 className="mb-1 text-xl font-semibold">
              Realtime Exchange Currency
            </h2>
            <p className="text-sm md:text-base">
              Our app provides real-time updates on currency exchange rates,
              ensuring you have the latest data at your fingertips. Make
              informed trading decisions with accurate and timely information.
            </p>
          </div>
        </div>
      </FeaturesGrid>
    </section>
  )
}


