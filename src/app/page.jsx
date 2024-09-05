
import React from "react";
import { MacbookScrollDemo } from "./pages/Macbook";
import { CardHoverEffectDemo } from "./pages/OurServices";
import Navbar from "../components/Navbar";
import HomePage from "./pages/index"

export default function Home() {
  return (
    <>
      <Navbar />
      <MacbookScrollDemo />
      <CardHoverEffectDemo />
      <HomePage />
    </>
  );
}
