"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import { Image } from "@nextui-org/react";
import RImage from "@/static/images/RImage.png";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [showLines, setShowLines] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout>(
    setTimeout(() => {}, 0)
  );

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setShowLines(false);
      setAnimationComplete(true);
    }, 10000);

    return () => clearTimeout(animationTimeout);
  }, []);

  useEffect(() => {
    if (animationComplete) {
      const redirectTimeout = setTimeout(() => {
        router.push("/home");
      }, 3500);

      setRedirectTimeout(redirectTimeout);
    }

    return () => clearTimeout(redirectTimeout);
  }, [animationComplete, router]);

  return (
    <div>
      <div className="frame_animation1">
        {showLines && (
          <div className="center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`line_animation1 line-${i + 1}`}></div>
            ))}
          </div>
        )}
        {!showLines && (
          <div className="frame_animation2">
            <div className="circle"></div>
            <div className="line_animation2 left"></div>
            <div className="line_animation2 right"></div>
            <div className="bracket left"></div>
            <div className="bracket right"></div>
            <div className="small top">collect</div>
            <div className="big flex justify-center">
              <div>
                <Image
                  className="flex mx-auto mt-2 mb-1 mr-3 rounded-2xl"
                  src={RImage.src}
                  alt="Login"
                  width={170}
                  height={170}
                />
              </div>
            </div>
            <div className="small bottom">not things</div>
            <div className="hide top"></div>
            <div className="hide bottom"></div>
          </div>
        )}
      </div>
    </div>
  );
}
