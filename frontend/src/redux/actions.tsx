// tableThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableType } from "./types/tables";
import axios from "./axios";
import { toast } from "sonner";
import { dateConvertor } from "../util/date";
import { ResponsiveContainer } from "recharts";

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
      return table;
    } catch (error) {
      return rejectWithValue("Failed to update table");
    }
  }
);
export const addTable = createAsyncThunk(
  "tables/add",
  async (table: TableType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/tables`, table);
      return response.data;
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to Add table");
    }
  }
);

export const deleteTable = createAsyncThunk(
  "tables/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/tables/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

export const updateTableStatus = createAsyncThunk(
  "tables/updateStatus",
  async (payload: any, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/tables/${payload.id}/update-status`, {
        status: payload.status,
      });
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

export const fetchDesgination = createAsyncThunk(
  "tables/fetchDesgination",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`${BASE_URL}/designations`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

//EMPLOYEES

export const fetchAllEmployees = createAsyncThunk(
  "tables/fetchAllEmployees",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`${BASE_URL}/employees`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

export const updateEmployees = createAsyncThunk(
  "tables/updateEmployees",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        `${BASE_URL}/employees/${payload.id}`,
        payload
      );
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteEmployees = createAsyncThunk(
  "tables/deleteEmployees",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/employees/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

export const addEmployee = createAsyncThunk(
  "tables/addEmployee",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${BASE_URL}/employees`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

// Orders

export const fetchAllOrders = createAsyncThunk(
  "tables/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`${BASE_URL}/orders`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

// Leaves types
export const fetchAllLeaveTypes = createAsyncThunk(
  "tables/fetchAllLeaveTypes",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`${BASE_URL}/leave-types`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createAllLeaveTypes = createAsyncThunk(
  "tables/createAllLeaveTypes",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${BASE_URL}/leave-types`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const UpdateLeaveTypes = createAsyncThunk(
  "tables/UpdateLeaveTypes",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        `${BASE_URL}/leave-types/${payload.id}`,
        payload
      );
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const DeleteLeaveTypes = createAsyncThunk(
  "tables/DeleteLeaveTypes",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/leave-types/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

// Leaves

export const fetchAllLeaves = createAsyncThunk(
  "tables/fetchAllLeave",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`${BASE_URL}/leaves`);
      response.data.forEach((data: any) => {
        data.startDate = dateConvertor(data.startDate);
        data.endDate = dateConvertor(data.endDate);
      });
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createLeave = createAsyncThunk(
  "tables/createLeave",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${BASE_URL}/leaves`, payload);
      response.data.startDate = dateConvertor(response.data.startDate);
      response.data.endDate = dateConvertor(response.data.endDate);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");

      return rejectWithValue("Failed to create leave");
    }
  }
);
export const updateLeave = createAsyncThunk(
  "tables/updateLeave",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        `${BASE_URL}/leaves/${payload.id}`,
        payload
      );
      response.data.startDate = dateConvertor(response.data.startDate);
      response.data.endDate = dateConvertor(response.data.endDate);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteLeave = createAsyncThunk(
  "tables/deleteLeave",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/leaves/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const updateLeaveStatus = createAsyncThunk(
  "tables/updateLeaveStatus",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        `${BASE_URL}/leaves/${payload.id}/status`,
        {
          status: payload.status,
        }
      );
      response.data.startDate = dateConvertor(response.data.startDate);
      response.data.endDate = dateConvertor(response.data.endDate);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);

// menu Categories

export const fetchAllMenuCategories = createAsyncThunk(
  "tables/fetchAllMenuCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      if (state.table.allMenuCategories.length > 0) {
        return rejectWithValue("Menus already loaded"); // or simply return a resolved promise without fetching
      }
      let response = await axios.get(`${BASE_URL}/menus/categories`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const fetchAllMenus = createAsyncThunk(
  "tables/fetchAllMenus",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      if (state.table.allMenu.length > 0) {
        return rejectWithValue("Menus already loaded"); // or simply return a resolved promise without fetching
      }

      let response = await axios.get(`${BASE_URL}/menus`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createMenu = createAsyncThunk(
  "tables/createMenu",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${BASE_URL}/menus`, payload);
      return response.data.menuItem; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const updateMenu = createAsyncThunk(
  "tables/updateMenu",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.patch(
        `${BASE_URL}/menus/${payload.id}`,
        payload
      );
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteMenu = createAsyncThunk(
  "tables/deleteMenu",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/menus/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteMenuCustomization = createAsyncThunk(
  "tables/deleteMenuCustomization",
  async (ids: any, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/menus/${ids.menuId}/customization/${ids.customizationId}`
      );
      return ids; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const updateMenuCustomization = createAsyncThunk(
  "tables/updateMenuCustomization",
  async (payload: any, { rejectWithValue }) => {
    try {
      payload["maxMultiSelect"] = payload.maxChoices;
      await axios.patch(
        `${BASE_URL}/menus/${payload.menuId}/customization/${payload.customizationId}`,
        payload
      );
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createMenuCustomization = createAsyncThunk(
  "tables/createMenuCustomization",
  async (payload: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        `${BASE_URL}/menus/${payload.menuId}/customization/`,
        {
          customizations: [payload],
        }
      );
      return { menuId: payload.menuId, data: data.data }; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
