import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Project type
export type ProjectItem = {
  title: string;
  hours: number;
  minutes: number;
  seconds: number;
  amount: number;
};

export type Project = {
  projectName: string;
  totalHours: number;
  totalMinutes: number;
  totalAmount: number;
  items: ProjectItem[];
};

// Define the initial state including grand totals
const initialState: {
  projects: Project[];
  grandTotalHours: number;
  grandTotalMinutes: number;
  grandTotalAmount: number;
  totalProjects: number;
  totalItems: number;
} = {
  projects: [],
  grandTotalHours: 0,
  grandTotalMinutes: 0,
  grandTotalAmount: 0,
  totalProjects: 0,
  totalItems: 0,
};

// Create the project slice
const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    addProject: (
      state,
      action: PayloadAction<{
        projectName: string;
        title: string;
        hours: number;
        minutes: number;
        amount: number; // Hourly rate
      }>
    ) => {
      const { projectName, title, hours, minutes, amount } = action.payload;

      // Find the project by name
      const project = state.projects.find(
        (proj) => proj.projectName === projectName
      );

      const itemAmount = hours * amount + (minutes / 60) * amount;

      if (project) {
        // Project exists, update it
        project.items.push({
          title,
          hours,
          minutes,
          seconds: 0, // Assuming seconds is always 0 for new items
          amount: itemAmount,
        });

        // Update totalHours, totalMinutes, and totalAmount
        project.totalHours += hours;
        project.totalMinutes += minutes;
        project.totalAmount += itemAmount;

        // Adjust the time if totalMinutes >= 60
        if (project.totalMinutes >= 60) {
          project.totalHours += Math.floor(project.totalMinutes / 60);
          project.totalMinutes %= 60;
        }

        // Increment the total items count
        state.totalItems += 1;
      } else {
        // Project does not exist, create a new one
        let newTotalMinutes = minutes;
        let newTotalHours = hours;

        if (newTotalMinutes >= 60) {
          newTotalHours += Math.floor(newTotalMinutes / 60);
          newTotalMinutes %= 60;
        }

        state.projects.push({
          projectName,
          totalHours: newTotalHours,
          totalMinutes: newTotalMinutes,
          totalAmount: itemAmount,
          items: [
            {
              title,
              hours,
              minutes,
              seconds: 0, // Assuming seconds is always 0 for new items
              amount: itemAmount,
            },
          ],
        });

        // Increment the total projects count
        state.totalProjects += 1;

        // Increment the total items count (for the new item added)
        state.totalItems += 1;
      }

      // Update grand total hours, minutes, and amount
      state.grandTotalHours += hours;
      state.grandTotalMinutes += minutes;
      state.grandTotalAmount += itemAmount;

      // Adjust the grand total time if grandTotalMinutes >= 60
      if (state.grandTotalMinutes >= 60) {
        state.grandTotalHours += Math.floor(state.grandTotalMinutes / 60);
        state.grandTotalMinutes %= 60;
      }
    },
    updateGrandTotalAmount: (
      state,
      action: PayloadAction<{
        hourlyRate: number;
      }>
    ) => {
      const { hourlyRate } = action.payload;
      state.grandTotalAmount =
        state.grandTotalHours * hourlyRate +
        (state.grandTotalMinutes / 60) * hourlyRate;
    },
    deleteProjectItem: (
      state,
      action: PayloadAction<{ projectIndex: number; itemIndex: number }>
    ) => {
      const { projectIndex, itemIndex } = action.payload;
      const project = state.projects[projectIndex];

      if (project) {
        const itemToDelete = project.items[itemIndex];
        const itemHours = itemToDelete.hours;
        const itemMinutes = itemToDelete.minutes;
        const itemAmount = itemToDelete.amount;

        // Remove the item from the project's items array
        project.items.splice(itemIndex, 1);

        // Update totalHours, totalMinutes, and totalAmount
        project.totalHours -= itemHours;
        project.totalMinutes -= itemMinutes;
        project.totalAmount -= itemAmount;

        // Adjust the time if totalMinutes < 0
        if (project.totalMinutes < 0) {
          const borrowHours = Math.ceil(Math.abs(project.totalMinutes) / 60);
          project.totalHours -= borrowHours;
          project.totalMinutes += borrowHours * 60;
        }

        // Update grand total hours, minutes, and amount
        state.grandTotalHours -= itemHours;
        state.grandTotalMinutes -= itemMinutes;
        state.grandTotalAmount -= itemAmount;

        // Adjust the grand total time if grandTotalMinutes < 0
        if (state.grandTotalMinutes < 0) {
          const borrowHours = Math.ceil(Math.abs(state.grandTotalMinutes) / 60);
          state.grandTotalHours -= borrowHours;
          state.grandTotalMinutes += borrowHours * 60;
        }

        // Decrement the total items count
        state.totalItems -= 1;
      }
    },
  },
});

export const { addProject, updateGrandTotalAmount, deleteProjectItem } =
  projectSlice.actions;
export default projectSlice.reducer;
