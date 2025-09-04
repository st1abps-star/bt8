import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

// ✅ Video data
const teasers = [
  { videoId: "dQw4w9WgXcQ" },
  { videoId: "jNQXAC9IVRw" },
  { videoId: "M7lc1UVf-VE" },
  { videoId: "ZZ5LpwO-An4" },
  { videoId: "kJQP7kiw5Fk" }
];

const highlights = [
  { videoId: "ScMzIvxBSi4" },
  { videoId: "CevxZvSJLk8" },
  { videoId: "kffacxfA7G4" },
  { videoId: "qeMFqkcPYcg" },
  { videoId: "SQoA_wjmE9w" }
];

const PortfolioSection = () => {
  const trackRef = useRef(null);
  const allVideos = [...teasers, ...highlights];

  useEffect(() => {
    if (!trackRef.current) return;

    // Smooth marquee animation
    gsap.to(trackRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear"
    });
  }, []);

  return (
    <section
      id="portfolio"
      className="min-h-screen section-dark-alt text-white relative overflow-hidden"
    >
      <div className="container mx-auto section-padding">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg">Découvrez notre collection de films de mariage cinématographiques</p>
        </div>

        {/* Video marquee */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-black">
          <div
            ref={trackRef}
            className="flex gap-4 w-[200%] py-4"
          >
            {[...allVideos, ...allVideos].map((video, index) => (
              <div key={index} className="flex-shrink-0 w-64 h-36 rounded-lg overflow-hidden bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${video.videoId}`}
                  title={`Portfolio video ${index + 1}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio button */}
        <div className="text-center mt-8">
          <Link
            to="/projects"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
          >
            View Our Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
