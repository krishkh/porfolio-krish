import MovingChara from "@/components/MovingChara";
import Background from "@/components/ui/Background";
import React from "react";

const MePage = () => {
  return (
    <Background>
      <div className="min-h-screen font-roboto flex flex-col justify-center pl-20 md:pl-40">
        <h1 className="text-4xl md:text-8xl text-white font-black">hi</h1>
        <p className="text-white text-4xl md:text-7xl font-thin">
          my name is <span className="font-black">Krish</span>
        </p>
        <p className="text-white text-4xl md:text-7xl font-thin">
          an <span className="font-shadow">aspiring</span>{" "}
          <span className="font-thin">&lt;engineer/&gt;</span>
        </p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none">
        <MovingChara />
      </div>
    </Background>
  );
};

export default MePage;
