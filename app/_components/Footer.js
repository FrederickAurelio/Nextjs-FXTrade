import Image from "next/image";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import ProfileImg from "/public/profile.jpeg";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative flex h-[25dvh] flex-col items-center justify-center gap-1 border-t-[3px] border-t-zinc-400 bg-zinc-100 p-10">
      <Logo textSize="text-2xl md:text-3xl" iconSize={42} />
      <LoginButton className="w-fit px-6 py-3">Try it Now</LoginButton>
      <Link
        href="https://github.com/FrederickAurelio"
        rel="noreferrer"
        target="_blank"
        className="absolute bottom-1 left-2 text-sm underline md:text-base"
      >
        <div className="flex items-center gap-1">
          <Image alt="avatar" className="h-6 w-6 rounded-full" src={ProfileImg} />
          <p>Developed by: Frederick Aurelio Halim</p>
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
