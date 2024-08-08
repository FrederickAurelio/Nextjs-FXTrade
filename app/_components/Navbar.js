import LoginButton from "./LoginButton";
import Logo from "./Logo";
import PhoneNavbar from "./PhoneNavbar";

export default function Navbar() {
  return (
    <nav
      id="nav"
      className="z-10 mt-1 flex h-12 w-full justify-between px-6 backdrop-blur-sm md:px-20"
    >
      <Logo textSize="text-2xl" iconSize={30} />
      <PhoneNavbar>
        <div className="flex max-w-[48rem] flex-1 items-center justify-evenly font-semibold">
          <a
            href="#why"
            className="cursor-pointer duration-200 hover:scale-110"
          >
            Why us
          </a>
          <a
            href="#features"
            className="cursor-pointer duration-200 hover:scale-110"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="cursor-pointer duration-200 hover:scale-110"
          >
            Testimonials
          </a>
        </div>
      </PhoneNavbar>
      <LoginButton>Login</LoginButton>
    </nav>
  )
}

