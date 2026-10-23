'use client'

import { SectionHeader } from "@/components/sectionHeader";
import { Card } from "@/components/Card";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import TypescriptIcon from "@/assets/icons/typescript.svg";
import PythonIcon from "@/assets/icons/python.svg";
import AWSIcon from "@/assets/icons/aws.svg";
import MongoDBIcon from "@/assets/icons/mongodb.svg";
import PostgreSQLIcon from "@/assets/icons/postgresql.svg";
import NodeIcon from "@/assets/icons/nodejs.svg";
import NextIcon from "@/assets/icons/nextjs.svg";
import mapImage from "@/assets/images/map.png";
import avatarBust from "@/assets/images/avatar-bust.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion"
import { useRef } from "react";

const toolboxItems = [
  {
    title: 'Typescript',
    iconType: TypescriptIcon
  },
  {
    title: 'React',
    iconType: ReactIcon
  },
  {
    title: 'Next',
    iconType: NextIcon
  },
  {
    title: 'Node',
    iconType: NodeIcon
  },
  {
    title: 'PostgreSQL',
    iconType: PostgreSQLIcon
  },
  {
    title: 'MongoDB',
    iconType: MongoDBIcon
  },
  {
    title: 'AWS',
    iconType: AWSIcon
  },
  {
    title: 'Github',
    iconType: GithubIcon
  },
  {
    title: 'Python',
    iconType: PythonIcon
  },
]

const focusAreas = ["Product engineering", "Integrations & reliability", "Applied AI"]

const hobbies = [
  {
    title: 'Traveling',
    emoji: '✈️',
    left: '8%',
    top: '8%'
  },
  {
    title: 'Cooking',
    emoji: '🍳',
    left: '65%',
    top: '10%'
  },
  {
    title: 'Study',
    emoji: '📖',
    left: '15%',
    top: '35%'
  },
  {
    title: 'Powerlifting',
    emoji: '🏋️‍♂️',
    left: '35%',
    top: '40%'
  },
  {
    title: 'Music',
    emoji: '🎶',
    left: '5%',
    top: '65%'
  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '50%',
    top: '70%'
  },
  {
    title: 'Football',
    emoji: '⚽',
    left: '75%',
    top: '50%'
  },
]

export const AboutSection = () => {
  const constraintRef = useRef(null)
  return (
  <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
        eyebrow="About Me"
        title="How I Work"
        description="My approach, my background and a little about life outside the code."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Product-Minded Engineer"
                description="I start from what users need, then build the APIs and interfaces that deliver it."
              />
              <ul className="mt-auto flex flex-wrap gap-2 px-6 pb-6 md:px-10 md:pb-10">
                {focusAreas.map((area) => (
                  <li key={area} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/80">
                    <span className="size-1.5 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400" aria-hidden="true"></span>
                    {area}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="h-[240px] p-0 md:col-span-2 md:h-auto md:min-h-[320px] lg:col-span-1">
              <Image src={mapImage} alt="Map of São Paulo" className="absolute inset-0 h-full w-full object-cover object-left-top"/>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              size-20 rounded-full after:content-[''] 
              after:absolute after:inset-0 after:outline 
              after-outline-2 after:-outline-offset-2 
              after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping motion-reduce:animate-none [aniamation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10 overflow-hidden">
                  <Image src={avatarBust} alt="" className="size-20"/>
                </div>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="h-[320px] lg:col-span-1">
              <CardHeader
                title="My Toolbox"
                description="The technologies I use most in my day-to-day work."
                className=""
              />
              <ToolboxItems items={toolboxItems} className="" itemsWrapperClassName="animate-move-left [animation-duration:30s]"/>
              {/* The second row repeats the first, so screen readers skip it. */}
              <ToolboxItems items={toolboxItems} className="mt-6" itemsWrapperClassName="animate-move-right [animation-duration:15s]" aria-hidden/>
            </Card>
          <Card className="h-[320px] p-0 flex flex-col lg:col-span-2">
            <CardHeader
              title="Beyond the Code"
              description="Explore my interests and hobbies beyond the digital realm."
              className="px-6 py-6"
            />
            <div className="relative flex-1" ref={constraintRef}>
              {hobbies.map(hobby => (
                <motion.div key={hobby.title} className="inline-flex items-center gap-2 px-6 
                bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                style={{
                  left: hobby.left,
                  top: hobby.top
                }}
                drag
                dragConstraints={constraintRef}
                >
                  <span className="font-medium text-gray-950">{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </motion.div>
              ))}
            </div>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
