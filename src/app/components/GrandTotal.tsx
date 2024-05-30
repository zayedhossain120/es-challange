import React from "react";
import CustomGlobalInput from "./CustomGlobalInput";
import { useDispatch, useSelector } from "react-redux";
import { updateGrandTotalAmount } from "../store/slices/projectSlice";

const GrandTotal = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.projectSlice);

  const handleHourlyRateChange = (e: any) => {
    const hourlyRate = Number(e.target.value);
    dispatch(updateGrandTotalAmount({ hourlyRate }));
  };

  return (
    <div className="text-center px-5">
      <h2 className="text-4xl font-bold text-green-500 ">Grand Total </h2>
      <p>
        Project {data?.totalProjects} ,worked for {data?.totalItems} times!
      </p>
      <h1 className="text-4xl font-bold text-yellow-800 ">
        {data?.grandTotalHours} Hours, {data?.grandTotalMinutes} Minutes
      </h1>

      <div className="mt-16">
        <h4 className="text-lg font-bold">Payment for an hour</h4>
        <CustomGlobalInput
          type="number"
          name="hourlyRate"
          className="rounded-lg"
          placeholder="Hourly Rate"
          onChange={handleHourlyRateChange}
        />
        <h1 className="text-2xl font-bold text-green-800 ">
          Grand Total Amount: ${data?.grandTotalAmount.toFixed(2)}
        </h1>
      </div>
    </div>
  );
};

export default GrandTotal;
