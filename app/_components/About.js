import aboutImg from "/public/about2.png";
import Image from "next/image";

export default function About() {
  return (
    <section id="why" className="flex w-full flex-col overflow-hidden">
      <div className="h-dvh w-full px-6 py-5 md:px-10 lg:px-20">
        <h1 className="text-xl font-bold md:text-3xl lg:mb-4 xl:mb-16">
          Why Us
        </h1>
        <div className="grid h-full w-full grid-rows-4 px-2 xl:px-28">
          <Image
            placeholder="blur"
            quality={65}
            alt="about image"
            id="about-img"
            className="row-span-1 h-full w-full object-cover md:row-span-2"
            src={aboutImg}
          />
          <div className="row-span-3 mt-4 flex flex-col gap-5 text-justify md:row-span-2 md:flex-row lg:px-6">
            <div className="md:flex-1">
              <h2 id="h" className="text-xl font-bold">
                Trade Forex with a{" "}
                <span className="font-bold text-emerald-700">Minimalist</span>{" "}
                and Fast Platform
              </h2>
              <p id="p">
                Our platform is designed with simplicity and speed in mind.
                Enjoy a clean, clutter-free interface that lets you focus on
                what matters most—your trades. Experience lightning-fast
                performance, ensuring you never miss an opportunity in the
                fast-paced forex market.
              </p>
            </div>
            <div className="md:flex-1">
              <h2 id="h" className="text-xl font-bold">
                Effortless Trading with Our{" "}
                <span className="font-bold text-emerald-700">Easy-to-Use</span>{" "}
                App
              </h2>
              <p id="p">
                Trading forex has never been easier. Our app is built to provide
                an intuitive and seamless user experience, making it accessible
                for both beginners and experienced traders. With user-friendly
                navigation and straightforward tools, you can manage your trades
                effortlessly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


