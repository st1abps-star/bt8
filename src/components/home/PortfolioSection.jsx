// components/home/PortfolioSection.jsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoStack = ({ videos }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Smooth scroll animation
    gsap.to(container.children, {
      yPercent: -20 * (videos.length - 1), // stack moves up
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom top",
        scrub: 1.2, // adjust for smoother "FPS" feel
      },
    });

    // Intersection Observer to autoplay videos when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframes = entry.target.querySelectorAll("iframe");
          if (entry.isIntersecting) {
            iframes.forEach((iframe) => {
              iframe.contentWindow?.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
              );
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (container) observer.observe(container);

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div
      ref={containerRef}
      className="video-stack-section relative w-full max-w-4xl mx-auto space-y-6"
      style={{ perspective: "1000px" }}
    >
      {videos.map((video, idx) => (
        <div
          key={idx}
          className="video-card rounded-xl overflow-hidden shadow-lg"
          style={{ height: "300px" }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&showinfo=0`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default VideoStack;
