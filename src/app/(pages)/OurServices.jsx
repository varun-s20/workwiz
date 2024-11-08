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
    title: "AI-Powered Mock Interview",
    description:
      "Enhance your interview skills with realistic AI mock interviews, offering personalized feedback, detailed reports, and expert-level practice.",
    link: "http://localhost:3001",
  },
  {
    title: "Job Portals",
    description:
      "With separate Employer and Candidate Portals, our platform streamlines the job process, offering employers tools to assess candidates.",
    link: "/dashboard",
  },
  {
    title: "Build Your Resume",
    description:
      "Easily create and customize professional resumes with guided prompts and a range of templates.",
    link: "/resume-builder",
  },
  {
    title: "Resume Analysis and Parsing",
    description:
      "Automatically parse and analyze your resume to extract key skills, experience, and qualifications, providing insights to improve your job application effectiveness.",
    link: "",
  },
  {
    title: "Smart Job Recommendations",
    description:
      "Get personalized job recommendations based on your resume and search history, matching you with roles that fit your skills and career goals.",
    link: "",
  },
  {
    title: "Seamless Job Application Integration",
    description:
      "Apply directly to jobs through integrations with LinkedIn and other platforms, simplifying the application process with one-click submissions.",
    link: "",
  },
];
