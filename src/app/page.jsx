
import React from "react";
import { MacbookScrollDemo } from "./(pages)/Macbook";
import { CardHoverEffectDemo } from "./(pages)/OurServices";
import Navbar from "../components/Navbar";
import { SignupFormDemo } from "./(pages)/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <MacbookScrollDemo />
      <CardHoverEffectDemo />
      <SignupFormDemo />
    </>
  );
}
