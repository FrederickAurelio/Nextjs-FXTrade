import Image from "next/image";
import LoginButton from "./LoginButton";
import Navbar from "./Navbar";
import bgImg from "/public/bg.jpg";

export default function Hero() {
  return (
    <section className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Navbar />
      <div
        id="hero"
        className="z-10 flex h-[88%] w-full flex-col items-center justify-center text-center text-2xl font-semibold md:h-[75%] md:text-5xl lg:text-6xl xl:text-7xl"
      >
        <h1 className="w-[26ch]">
          Foreign Exchange Trade Demo with{" "}
          <span className="font-bold text-emerald-700">Realtime</span> currency
        </h1>
        <LoginButton className="mt-20 animate-bounce px-6">
          Try it Now
        </LoginButton>
      </div>
      <Image
        placeholder="blur"
        quality={90}
        fill
        alt="Background Image for Hero Section"
        id="img"
        src={bgImg}
        className="object-cover"
      />
    </section>
  )
}
