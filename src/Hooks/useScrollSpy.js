import { useEffect, useState } from "react";
import { getLenisInstance } from "../Components/SmoothScroll";

export const useScrollSpy = (sectionIds = [], offset = 80) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const lenis = getLenisInstance();
    const rootElement = document.documentElement;

    const handleScroll = () => {
      let scrollPosition;
      if (lenis) {
        scrollPosition = lenis.scroll + offset;
      } else {
        scrollPosition = window.scrollY + offset;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    handleScroll();
    if (lenis) {
      lenis.on("scroll", handleScroll);
    } else {
      rootElement.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (lenis) {
        lenis.off("scroll", handleScroll);
      } else {
        rootElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sectionIds, offset]);

  return activeSection;
};

export const scrollToSection = (sectionId, offset = 80) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const top = section.offsetTop - offset;
  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(top, {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};
