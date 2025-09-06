import ProfileFlip from "@/components/ProfileFlip"
import HeroCTAs from "@/components/HeroCTAs"
import grainImage from "@/assets/images/grain.jpg"
import StarIcon from "@/assets/icons/star.svg"
import SparkleIcon from "@/assets/icons/sparkle.svg"
import { HeroOrbit } from "@/components/HeroOrbit"
import Typewriter from "@/components/Typewriter"

export const HeroSection = () => {
  return (
  <div id="home" className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)",
        }}
      >
        <div 
          className="absolute inset-0 -z-30 opacity-5" 
          style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        {/* 
        shouldOrbit = false,
        shouldSpin = false,
        spinDuration,
        orbitDurations
        */}
        <HeroOrbit size={390} rotation={-20} shouldOrbit orbitDuration="26s" shouldSpin spinDuration="3s">
              <SparkleIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={490} rotation={-42} shouldOrbit orbitDuration="36s">
              <div className="size-2 rounded-full bg-emerald-300/20"></div>
        </HeroOrbit>
        <HeroOrbit size={530} rotation={180} shouldOrbit orbitDuration="39s" shouldSpin spinDuration="3s">
              <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="42s" shouldSpin spinDuration="6s">
              <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={610} rotation={92} shouldOrbit orbitDuration="45s" shouldSpin spinDuration="6s">
              <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-10} shouldOrbit orbitDuration="48s">
              <div className="size-2 rounded-full bg-emerald-300/20"></div>
        </HeroOrbit>
        <HeroOrbit size={710} rotation={150} shouldOrbit orbitDuration="51s" shouldSpin spinDuration="3s">
              <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={800} rotation={-80} shouldOrbit orbitDuration="54s" shouldSpin spinDuration="6s">
              <StarIcon className="size-28 text-emerald-300" />
        </HeroOrbit>
      </div>
  <div className="container relative z-10">
        <div className="flex flex-col items-center">
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-center my-8 tracking-wide">Leonardo Cunha</h1>
        </div>

          <ProfileFlip size={150} className="size-[100px]" alt="Person in a laptop" />
        </div>
        <div className="flex justify-center w-full">
          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="absolute inset-0 bg-green-500 animate-ping-large rounded-full"></div>
            </div>
            <div className="text-sm font-medium">Available for new projects</div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-xl md:text-4xl text-center mt-8 tracking-wide">
            <span className="block">Building Exceptional</span>
            <span className="block text-emerald-300 mt-2">
              <Typewriter
                items={[
                  'User Experiences',
                  'B2B SaaS',
                  'High-converting MVPs',
                  'Accessible Interfaces',
                ]}
                typingSpeed={70}
                deletingSpeed={40}
                pauseTime={1600}
              />
            </span>
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I specialize in transforming ideas into functional, high-performing MVPs.
          </p>
        </div>
      <HeroCTAs className="mt-8" />
      </div>
    </div>
  );
};
