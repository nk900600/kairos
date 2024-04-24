// tableThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableType } from "./types/tables";
import RootState from "./store";
import axios from "./axios";

export const BASE_URL = "http://localhost:4200/api";

export const fetchTables: any = createAsyncThunk<any>(
  "tables/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tables`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch tables");
    }
  }
);

export const updateTable = createAsyncThunk(
  "tables/update",
  async (table: TableType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/tables/${table.id}`, table);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update table");
    }
  }
);

export const deleteTable = createAsyncThunk<any>(
  "tables/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/tables/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
