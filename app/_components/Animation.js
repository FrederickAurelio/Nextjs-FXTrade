"use client"

import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Animation({ children }) {
  const path = usePathname();
  const initAnimations = () => {
    const tes = gsap.utils.toArray(".testimonial");
    tes.forEach((t) => {
      gsap.fromTo(
        t,
        {
          y: 100,
          opacity: 0,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: t,
            start: "20% bottom",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-img",
        start: "bottom bottom",
      },
    });
    timeline.fromTo("#h", {
      y: 10,
      opacity: 0,
    }, {
      duration: 1,
      opacity: 1,
      stagger: 0.2,
      y: 0,
      ease: "power2.inOut",
    });
    timeline.fromTo("#p", {
      y: 10,
      opacity: 0,
    }, {
      delay: -0.8,
      duration: 1,
      opacity: 1,
      stagger: 0.2,
      y: 0,
      ease: "power2.inOut",
    });

    gsap.fromTo("#nav", {
      opacity: 0,
    }, {
      delay: 2,
      ease: "power2.inOut",
      opacity: 1,
    });
    gsap.fromTo("#img", {
      opacity: 0.8,
      scale: 2,
    }, {
      scale: 1,
      duration: 3,
      ease: "power2.inOut",
      opacity: 1,
    });
    gsap.fromTo("#hero", {
      opacity: 0,
    }, {
      delay: 2,
      ease: "power2.inOut",
      opacity: 1,
    });
  };

  useGSAP(() => {
    if (path === "/")
      initAnimations();
  }, [path]);


  return <>{children}</>;
}
