import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Zayed",
  project: "NextJS",
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {},
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
