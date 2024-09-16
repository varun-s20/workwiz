"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";
import { Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

const words = `Effortlessly connect with opportunities tailored to your skills and preferences. With cutting-edge AI, resume parsing, and personalized recommendations, WorkWiz streamlines your job search and revolutionizes hiring for employers. Discover your future, today!
`;

export function CardHoverEffectDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 70 }}
        whileInView={{ opacity: 1, y: 0.6 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="max-w-4xl mx-auto px-6" justifycontent="center">
          <Text className="font-bold text-7xl py-8 text-slate-900 flex justify-center -ml-8">
            <Image
              src={"/workwizlogo.png"}
              alt="logo"
              className=" h-16"
            ></Image>
            Work<span className="text-red-700">Wiz</span>
          </Text>
          <TextGenerateEffect words={words} />
        </div>
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={projects} />
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export const projects = [
  {
    title: "WorkWiz 1",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "",
  },
  {
    title: "WorkWiz 2",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "",
  },
  {
    title: "Build Your Resume",
    description:
      "Easily create and customize professional resumes with guided prompts and a range of templates.",
    link: "/resume-builder",
  },
  {
    title: "WorkWiz 4",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "",
  },
  {
    title: "WorkWiz 5",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "",
  },
  {
    title: "WorkWiz 6",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "",
  },
];
