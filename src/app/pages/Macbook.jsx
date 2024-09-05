import React from "react";
import { MacbookScroll } from "../../components/ui/macbook-scroll";
import Image from "next/image";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-[#0B0B0F] w-full">
      <MacbookScroll
        title={
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        }
        badge={
          <Image
            src={"/OIG4.jpeg"}
            alt="Sticker"
            width={65}
            height={65}
            className="h-16 w-16 transform -rotate-12 rounded-lg"
          />
        }
        src={`/linear.png`}
        showGradient={false}
      />
    </div>
  );
}
