import { Link } from "react-router-dom";

const OfficialAgenciesStrip = () => {
  const agencies = [
    {
      name: "Consulate General of Jamaica, Toronto",
      logo: "/dist/Images/JCA.png",
      alt: "Consulate General of Jamaica, Toronto",
    },
    {
      name: "Government of Jamaica",
      logo: "/dist/Images/JGJ.png",
      alt: "Government of Jamaica",
    },
    {
      name: "Jamaica Customs Agency",
      logo: "/dist/Images/JCG.png",
      alt: "Jamaica Customs Agency",
    },
    {
      name: "ODPEM – Office of Disaster Preparedness and Emergency Management",
      logo: "/dist/Images/ODP.png",
      alt: "ODPEM – Office of Disaster Preparedness and Emergency Management",
    },
  ];

  return (
    <section
      aria-label="Official Jamaican agencies we coordinate with"
      className="w-full bg-white/90 border-y border-gray-200"
    >
      <div className="max-w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Label */}
        <h2 className="text-xs md:text-sm font-semibold text-gray-700 text-center uppercase tracking-wide">
          Working in Line With Official Guidance From
        </h2>

        {/* Marquee Container */}
        <div className="w-full overflow-hidden flex justify-center">
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
              gap: 3rem;
            }
            .marquee-animate:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="marquee-animate">
            {/* First row */}
            {agencies.map((agency) => (
              <Link
                key={`${agency.name}-1`}
                to="/official-relief-lists"
                className="h-16 md:h-20 flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
                aria-label={`${agency.name} - official partner`}
              >
                <img
                  src={agency.logo}
                  alt={agency.alt}
                  className="h-full w-auto object-contain max-w-xs"
                />
              </Link>
            ))}
            {/* Second row - seamless continuation */}
            {agencies.map((agency) => (
              <Link
                key={`${agency.name}-2`}
                to="/official-relief-lists"
                className="h-16 md:h-20 flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
                aria-label={`${agency.name} - official partner`}
              >
                <img
                  src={agency.logo}
                  alt={agency.alt}
                  className="h-full w-auto object-contain max-w-xs"
                />
              </Link>
            ))}
            {/* Third row - ensures no gap */}
            {agencies.map((agency) => (
              <Link
                key={`${agency.name}-3`}
                to="/official-relief-lists"
                className="h-16 md:h-20 flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
                aria-label={`${agency.name} - official partner`}
              >
                <img
                  src={agency.logo}
                  alt={agency.alt}
                  className="h-full w-auto object-contain max-w-xs"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficialAgenciesStrip;
