import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TableType } from "./types/tables";
import {
  addEmployee,
  addTable,
  deleteEmployees,
  deleteTable,
  fetchAllEmployees,
  fetchDesgination,
  fetchTables,
  updateEmployees,
  updateTable,
  updateTableStatus,
} from "./actions";
import { toast } from "sonner";

export interface RootState {
  alltables: TableType[];
  allEmployees: any[];
  allDesgination: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RootState = {
  alltables: [],
  allEmployees: [],
  allDesgination: [],
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
      );
  },
});

export const counterReducers = counterSlice.reducer;
