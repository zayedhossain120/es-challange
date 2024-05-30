"use client";
import AddProject from "./AddProject";
import { useSelector } from "react-redux";
import AddedProject from "./AddedProject";
import GrandTotal from "./GrandTotal";

const HomeElement = () => {
  const data = useSelector((state: any) => state.projectSlice);

  return (
    <div className="text-white max-w-[1280px] mx-auto">
      <h3 className="text-3xl text-white text-center my-10 underline">
        Count Your working time
      </h3>
      <div className="flex w-full justify-between gap-12 ">
        <AddProject />
        {data?.projects.length ? (
          <>
            <AddedProject data={data} />
            <GrandTotal />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HomeElement;
