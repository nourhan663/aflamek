import React from "react";
import "./HomeHeader.css";

const HomeHeader = () => {
  return (
    <div className="flex flex-col mt-[6em]  items-center justify-center container mx-auto">
      <h1 className="text-light-blue-300 text-4xl font-bold ">Home</h1>
      <div className="flex justify-between sm:flex-col home-header w-[100%] md:flex-row lg:flex-row">
        <div className="flex flex-col flex-1 w-[100%] items-center ">
          <h1 className="text-2xl font-bold mb-3">SORT BY</h1>
          <div className="flex justify-evenly items-center w-[100%] sort-div">
            <button className="btn btn-outline">Title</button>
            <button className="btn btn-outline">Poplarity</button>
            <button className="btn btn-outline">Date</button>
            <button className="btn btn-outline">Ratin</button>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center ">
          <h1 className="text-2xl font-bold mb-3">SORT ORDER</h1>
          <div className="flex justify-evenly items-center w-[100%] sort-div">
            <button className="btn btn-outline ">Desingin</button>
            <button className="btn btn-outline ">Asending</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
