
import React from "react";
import { MacbookScrollDemo } from "./pages/Macbook";
import { CardHoverEffectDemo } from "./pages/OurServices";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <MacbookScrollDemo />
      <CardHoverEffectDemo />
    </>
  );
}
