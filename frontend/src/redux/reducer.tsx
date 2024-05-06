import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TableType } from "./types/tables";
import {
  DeleteLeaveTypes,
  UpdateLeaveTypes,
  addEmployee,
  addTable,
  createAllLeaveTypes,
  createLeave,
  createMenu,
  deleteEmployees,
  deleteLeave,
  deleteMenu,
  deleteTable,
  fetchAllEmployees,
  fetchAllLeaveTypes,
  fetchAllLeaves,
  fetchAllMenuCategories,
  fetchAllMenus,
  fetchAllOrders,
  fetchDesgination,
  fetchTables,
  updateEmployees,
  updateLeave,
  updateLeaveStatus,
  updateMenu,
  updateTable,
  updateTableStatus,
} from "./actions";
import { toast } from "sonner";

export interface RootState {
  alltables: TableType[];
  allEmployees: any[];
  allLeavesTypes: any[];
  allMenu: any[];
  allLeaves: any[];
  allOrders: any[];
  allDesgination: any[];
  allMenuCategories: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RootState = {
  alltables: [],
  allEmployees: [],
  allLeavesTypes: [],
  allLeaves: [],
  allDesgination: [],
  allMenu: [],
  allMenuCategories: [],
  allOrders: [],
  isLoading: false,
  error: null,
};

const counterSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTables.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.alltables = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        updateTable.fulfilled,
        (state: RootState, action: PayloadAction<TableType>) => {
          const index = state.alltables.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.alltables[index] = action.payload;
          }
        }
      )
      .addCase(
        addTable.fulfilled,
        (state: RootState, action: PayloadAction<TableType>) => {
          state.alltables.push(action.payload);
        }
      )
      .addCase(
        deleteTable.fulfilled,
        (state: RootState, action: PayloadAction<number>) => {
          state.alltables = state.alltables.filter(
            (table) => table.id !== action.payload
          );
        }
      )
      .addCase(
        updateTableStatus.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.alltables.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.alltables[index].status = action.payload.status;
          }
        }
      )

      // Employee API action
      .addCase(
        fetchAllEmployees.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allEmployees = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        updateEmployees.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allEmployees.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.allEmployees[index] = {
              ...state.allEmployees[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(
        deleteEmployees.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allEmployees = state.allEmployees.filter(
            (employee) => employee.id !== action.payload
          );
        }
      )
      .addCase(
        addEmployee.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allEmployees.push(action.payload);
        }
      )
      .addCase(
        fetchDesgination.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allDesgination = action.payload;
          state.isLoading = false;
        }
      )

      // Orders
      .addCase(
        fetchAllOrders.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allOrders = action.payload;
          state.isLoading = false;
        }
      )

      // Leaves types
      .addCase(
        fetchAllLeaveTypes.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allLeavesTypes = action.payload;
        }
      )
      .addCase(
        createAllLeaveTypes.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allLeavesTypes.push(action.payload);
        }
      )
      .addCase(
        UpdateLeaveTypes.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allLeavesTypes.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.allLeavesTypes[index] = {
              ...state.allLeavesTypes[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(
        DeleteLeaveTypes.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allLeavesTypes = state.allLeavesTypes.filter(
            (employee) => employee.id !== action.payload
          );
        }
      )

      // Leaves
      .addCase(
        fetchAllLeaves.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allLeaves = action.payload;
        }
      )
      .addCase(
        createLeave.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allLeaves.push(action.payload);
        }
      )
      .addCase(
        updateLeave.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allLeaves.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.allLeaves[index] = {
              ...state.allLeaves[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(
        updateLeaveStatus.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allLeaves.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.allLeaves[index] = {
              ...state.allLeaves[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(
        deleteLeave.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allLeaves = state.allLeaves.filter(
            (employee) => employee.id !== action.payload
          );
        }
      )

      // menu Categories
      .addCase(
        fetchAllMenuCategories.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allMenuCategories = action.payload;
        }
      )
      .addCase(
        fetchAllMenus.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allMenu = action.payload;
        }
      )
      .addCase(
        createMenu.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allMenu.push(action.payload);
        }
      )
      .addCase(
        updateMenu.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allMenu.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.allMenu[index] = {
              ...state.allMenu[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(
        deleteMenu.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allMenu = state.allMenu.filter(
            (employee) => employee.id !== action.payload
          );
        }
      );
  },
});

export const counterReducers = counterSlice.reducer;
