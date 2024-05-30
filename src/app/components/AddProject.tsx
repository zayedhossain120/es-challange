"use client";
import { addProject } from "../store/slices/projectSlice";
import CustomGlobalInput from "./CustomGlobalInput";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const AddProject = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    projectName: "",
    title: "",
    hours: 0,
    minutes: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "hours" || name === "minutes" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProject(formData));
    // Optionally reset the form
    setFormData({
      projectName: "",
      title: "",
      hours: 0,
      minutes: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:gap-12 gap-5 max-w-[600px] mx-auto px-5"
    >
      <CustomGlobalInput
        label="Project Name"
        type="text"
        name="projectName"
        className="rounded-lg"
        placeholder="Project Name"
        value={formData.projectName}
        onChange={handleChange}
      />
      <CustomGlobalInput
        label="Title"
        type="text"
        name="title"
        className="rounded-lg"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <CustomGlobalInput
        label="Hours"
        type="number"
        name="hours"
        className="rounded-lg"
        placeholder="Hours"
        value={formData.hours}
        onChange={handleChange}
      />
      <CustomGlobalInput
        label="Minutes"
        type="number"
        name="minutes"
        className="rounded-lg"
        placeholder="Minutes"
        value={formData.minutes}
        onChange={handleChange}
      />

      <button type="submit" className="py-4 px-7 bg-green-600 rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default AddProject;
