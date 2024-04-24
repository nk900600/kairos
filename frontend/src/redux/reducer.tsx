import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TableType } from "./types/tables";
import { deleteTable, fetchTables, updateTable } from "./actions";

export interface TableState {
  alltables: TableType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TableState = {
  alltables: [],
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
        (state: TableState, action: PayloadAction<TableType[]>) => {
          state.alltables = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        updateTable.fulfilled,
        (state: TableState, action: PayloadAction<TableType>) => {
          const index = state.alltables.findIndex(
            (table) => table.id === action.payload.id
          );
          if (index !== -1) {
            state.alltables[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteTable.fulfilled,
        (state: TableState, action: PayloadAction<number>) => {
          state.alltables = state.alltables.filter(
            (table) => table.id !== action.payload
          );
        }
      );
  },
});

// export const { addTables, allTables, deleteTable } = counterSlice.actions;

export const counterReducers = counterSlice.reducer;
