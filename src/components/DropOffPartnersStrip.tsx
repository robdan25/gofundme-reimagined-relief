import { Link } from "react-router-dom";

const DropOffPartnersStrip = () => {
  const partners = [
    {
      name: "Dam Foods / Caribbean Market",
      logo: "https://unbiasedrelief.org.cdn.hstgr.net/images/DCM.png",
      alt: "Dam Foods Caribbean Market – GTA drop-off partner",
    },
    {
      name: "Fireside Fusion",
      logo: "https://unbiasedrelief.org.cdn.hstgr.net/images/FFJ.png",
      alt: "Fireside Fusion – GTA drop-off partner",
    },
    {
      name: "KL Brandz",
      logo: "https://unbiasedrelief.org.cdn.hstgr.net/images/KLB.png",
      alt: "KL Brandz Boutique – GTA drop-off partner",
    },
    {
      name: "Jamaica Customs",
      logo: "https://unbiasedrelief.org.cdn.hstgr.net/images/JCG.png",
      alt: "Jamaica Customs – GTA drop-off partner",
    },
  ];

  return (
    <div className="w-full border-y border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center gap-6 px-4 py-4">
        {/* Label */}
        <div className="whitespace-nowrap flex-shrink-0">
          <p className="text-xs md:text-sm font-semibold text-gray-700">
            GTA Drop-Off Partners
          </p>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden">
          <div className="relative">
            {/* Desktop: Marquee animation */}
            <div className="hidden md:block w-full overflow-hidden">
              <style>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-66.67%);
                  }
                }
                .marquee-animate {
                  animation: marquee 20s linear infinite;
                  display: flex;
                  gap: 1.5rem;
                }
                .marquee-animate:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="marquee-animate">
                {/* First row */}
                {partners.map((partner) => (
                  <Link
                    key={`${partner.name}-1`}
                    to="/drop-off-and-shipping"
                    className="flex-shrink-0 h-10 flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="h-10 w-auto max-w-xs object-contain"
                    />
                  </Link>
                ))}
                {/* Second row - seamless continuation */}
                {partners.map((partner) => (
                  <Link
                    key={`${partner.name}-2`}
                    to="/drop-off-and-shipping"
                    className="flex-shrink-0 h-10 flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="h-10 w-auto max-w-xs object-contain"
                    />
                  </Link>
                ))}
                {/* Third row - ensures no gap */}
                {partners.map((partner) => (
                  <Link
                    key={`${partner.name}-3`}
                    to="/drop-off-and-shipping"
                    className="flex-shrink-0 h-10 flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="h-10 w-auto max-w-xs object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile: Marquee animation */}
            <div className="md:hidden w-full overflow-hidden">
              <style>{`
                @keyframes marquee-mobile {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-66.67%);
                  }
                }
                .marquee-animate-mobile {
                  animation: marquee-mobile 20s linear infinite;
                  display: flex;
                  gap: 1.5rem;
                }
                .marquee-animate-mobile:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="marquee-animate-mobile">
                {/* First row */}
                {partners.map((partner) => (
                  <Link
                    key={`${partner.name}-1`}
                    to="/drop-off-and-shipping"
                    className="flex-shrink-0 h-12 flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className={`h-12 w-auto max-w-xs object-contain ${
                        partner.name === "Dam Foods / Caribbean Market" ? "scale-125" : ""
                      }`}
                    />
                  </Link>
                ))}
                {/* Second row - seamless continuation */}
                {partners.map((partner) => (
                  <Link
                    key={`${partner.name}-2`}
                    to="/drop-off-and-shipping"
                    className="flex-shrink-0 h-12 flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className={`h-12 w-auto max-w-xs object-contain ${
                        partner.name === "Dam Foods / Caribbean Market" ? "scale-125" : ""
                      }`}
                    />
                  </Link>
                ))}
                {/* Third row - ensures no gap */}
                {partners.map((partner) => (
                  <Link
                    key={`${partner.name}-3`}
                    to="/drop-off-and-shipping"
                    className="flex-shrink-0 h-12 flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className={`h-12 w-auto max-w-xs object-contain ${
                        partner.name === "Dam Foods / Caribbean Market" ? "scale-125" : ""
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropOffPartnersStrip;
