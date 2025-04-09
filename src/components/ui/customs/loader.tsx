"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="relative w-[112px] h-[112px] ">
      <div className="loader w-[112px] h-[112px] relative">
        <div className="box1 absolute border-[16px] border-gray-700 box-border block animate-abox1" />
        <div className="box2 absolute border-[16px] border-gray-700 box-border block animate-abox2" />
        <div className="box3 absolute border-[16px] border-gray-700 box-border block animate-abox3" />
      </div>
    </div>
  );
};

export default Loader;
