"use client"
import { useScreenSize } from "./ScreenContext";

export default function PhoneNavbar({ children }) {
  const { screenSize } = useScreenSize();
  return (
    <>
      {screenSize > 760 && children}
    </>
  )
}