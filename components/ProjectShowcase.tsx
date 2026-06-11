"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface Project {
  title: string;
  category: string;
  location: string;
  image: string;
  details: string;
}

const projects: Project[] = [
  {
    title: "The Emerald Penthouse",
    category: "Living Room",
    location: "Mumbai, MH",
    image: "/images/hero_interior.png",
    details: "A breathtaking living room fusing dark velvet emerald plaster walls, high-rise architectural glass panels, and bespoke gold-leaf trims.",
  },
  {
    title: "Crest Culinary Suite",
    category: "Kitchen",
    location: "Bangalore, KA",
    image: "/images/contemporary_minimalist.png",
    details: "Minimalist handle-less kitchen highlighting deep emerald joinery and a solid floating Calacatta gold marble cooking island.",
  },
  {
    title: "Oasis Sanctuary Suite",
    category: "Bedroom",
    location: "Goa, GA",
    image: "/images/organic_modernism.png",
    details: "An organic modernist bedroom complete with curved lime-plaster walls, raw wood beams, linen drapes, and biophilic details.",
  },
  {
    title: "European Gilded Parlor",
    category: "Heritage",
    location: "Delhi, DL",
    image: "/images/european_heritage.png",
    details: "A classic European parlor emphasizing crown molding, gold gilding, rich oak herringbone floors, and custom chandeliers.",
  },
  {
    title: "Serenity Tea Lounge",
    category: "Japandi",
    location: "Pune, MH",
    image: "/images/japandi.png",
    details: "Merging Scandinavian functionality with Japanese simplicity using custom oak screen partitions and low lounge structures.",
  },
  {
    title: "The Velvet Lounge Salon",
    category: "Living Room",
    location: "Hyderabad, TS",
    image: "/images/quiet_luxury.png",
    details: "A quiet luxury salon space showcasing soft boucle textures, limestone tables, and minimal golden pendant illumination.",
  },
];

const categories = ["All", "Living Room", "Kitchen", "Bedroom", "Heritage", "Japandi"];

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section
      id="portfolio"
      className="relative py-16 sm:py-24 md:py-36 bg-[#031c16] text-[#f4f3ed] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10 flex flex-col gap-8 sm:gap-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs font-bold tracking-[0.3em] text-[#d4af37] uppercase">
              PORTFOLIO OF MASTERPIECES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold tracking-wider leading-tight">
              Curated <span className="text-gold-gradient text-glow-gold">Sanctuaries</span>
            </h2>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 sm:p-3 border border-[#d4af37]/20 hover:border-[#d4af37] bg-[#031f18]/60 text-[#f4f3ed] rounded-full hover:text-[#d4af37] transition-all cursor-pointer"
              aria-label="Scroll left"
              id="portfolio-scroll-left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 sm:p-3 border border-[#d4af37]/20 hover:border-[#d4af37] bg-[#031f18]/60 text-[#f4f3ed] rounded-full hover:text-[#d4af37] transition-all cursor-pointer"
              aria-label="Scroll right"
              id="portfolio-scroll-right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-none border-b border-[#d4af37]/10 font-sans -mx-5 px-5 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-3 sm:px-4 py-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 ${activeCategory === cat ? "text-[#d4af37]" : "text-[#b5b0a3] hover:text-[#f4f3ed]"
                }`}
              id={`portfolio-tab-${cat.toLowerCase().replace(/\s/g, '-')}`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-gradient"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            ref={carouselRef}
            layout
            className="flex gap-4 sm:gap-8 overflow-x-auto pb-4 sm:pb-8 scrollbar-thin snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "thin" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, idx) => (
                <motion.div
                  key={proj.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="relative min-w-[260px] sm:min-w-[340px] md:min-w-[420px] lg:min-w-[480px] aspect-[3/4] sm:aspect-[4/5] rounded-sm overflow-hidden flex flex-col justify-end p-5 sm:p-8 border border-[#d4af37]/15 hover:border-[#d4af37]/45 transition-colors duration-300 group snap-center select-none"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 420px, 480px"
                    className="absolute inset-0 object-cover scale-[1.02] group-hover:scale-[1.08] transition-transform duration-300 ease-out z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10" />
                  <div className="absolute inset-0 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-300 z-10" />

                  {/* Corner trims */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-3 h-3 border-t border-l border-[#d4af37]/35 group-hover:border-[#d4af37] transition-colors duration-300" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-3 h-3 border-t border-r border-[#d4af37]/35 group-hover:border-[#d4af37] transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-3 h-3 border-b border-l border-[#d4af37]/35 group-hover:border-[#d4af37] transition-colors duration-300" />
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-3 h-3 border-b border-r border-[#d4af37]/35 group-hover:border-[#d4af37] transition-colors duration-300" />

                  <div className="relative z-20 flex flex-col gap-1.5 sm:gap-2 select-text">
                    <div className="flex items-center justify-between text-[#d4af37] text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase">
                      <span>{proj.category}</span>
                      <span className="flex items-center gap-1">
                        <Compass className="w-3 h-3" />
                        {proj.location}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-[#f4f3ed]">
                      {proj.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#b5b0a3] font-light leading-relaxed tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {proj.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
