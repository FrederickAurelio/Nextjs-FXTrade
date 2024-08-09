"use client"
import { useScreenSize } from "/app/_components/ScreenContext";

export default function DesktopPage({ children }) {
  const { screenSize } = useScreenSize();
  return <>
    {screenSize > 1020 && (
      <>
        {children}
      </>
    )
    }
  </>
}
