// tableThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableType } from "./types/tables";
import { toast } from "sonner";
import { dateConvertor } from "../util/date";
import { ResponsiveContainer } from "recharts";
import axios from "./axios";
import { vapidKeys } from "../const/allConsts";
import { urlBase64ToUint8Array } from "../util/urlBase64ToUint8Array";
import { createReturn } from "typescript";

export const fetchTables: any = createAsyncThunk<any>(
  "tables/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`tables`);
      return response.data;
    } catch (error) {
      toast.error("Something went wrong fethcing all tables");
      return rejectWithValue("Failed to fetch tables");
    }
  }
);

export const updateTable = createAsyncThunk(
  "tables/update",
  async (table: TableType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`tables/${table.id}`, table);
      return table;
    } catch (error) {
      toast.error("Something went wrong while updating table");
      return rejectWithValue("Failed to update table");
    }
  }
);
export const addTable = createAsyncThunk(
  "tables/add",
  async (table: TableType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`tables`, table);
      return response.data;
    } catch (error) {
      toast.error("Something went wrong while adding, please try again");
      return rejectWithValue("Failed to Add table");
    }
  }
);
export const createBulkTable = createAsyncThunk(
  "tables/createBulkTable",
  async (table: TableType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`tables/bulk`, table);
      return response.data;
    } catch (error) {
      toast.error("Something went wrong while adding, please try again");
      return rejectWithValue("Failed to Add table");
    }
  }
);

export const deleteTable = createAsyncThunk(
  "tables/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`tables/${id}`);
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
      await axios.post(`tables/${payload.id}/update-status`, {
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
      let response = await axios.get(`designations`);
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
      let response = await axios.get(`employees`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while fetching all employees");
      return rejectWithValue("Failed to delete table");
    }
  }
);

export const updateEmployees = createAsyncThunk(
  "tables/updateEmployees",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.put(`employees/${payload.id}`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while updating employees");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteEmployees = createAsyncThunk(
  "tables/deleteEmployees",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`employees/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error: any) {
      if (error.response.data) {
        if (
          error.response.data.error.includes(
            "Cannot delete or update a parent row"
          )
        )
          toast.error("Cannot delete as this employee is a manager ");
      } else {
        toast.error("Something went wrong while deleting ");
      }

      return rejectWithValue("Failed to delete table");
    }
  }
);

export const addEmployee = createAsyncThunk(
  "tables/addEmployee",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`employees`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createBulkContact = createAsyncThunk(
  "tables/createBulkContact",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`employees/bulk`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error: any) {
      if (error?.response?.data?.error) toast.error(error.response.data?.error);
      return rejectWithValue("Failed to create bulk employees");
    }
  }
);

export const fetchMyAccount = createAsyncThunk(
  "tables/fetchMyAccount",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`employees/me`);
      if (!response.data?.employee) {
        localStorage.clear();
        window.location.href = "/login";
      }
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while fetching your data");
      return rejectWithValue("Failed to delete table");
    }
  }
);

// Orders

export const fetchAllOrders = createAsyncThunk(
  "tables/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`orders`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while fetching all orders");
      return rejectWithValue("Failed to delete table");
    }
  }
);

export const createOrder = createAsyncThunk(
  "tables/createOrder",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`orders/`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating order, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "tables/updateOrderStatus",
  async (payload: any, { rejectWithValue }) => {
    try {
      await axios.post(`orders/${payload.id}`, {
        status: payload.status,
      });
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const updateOrderItemStatus = createAsyncThunk(
  "tables/updateOrderItemStatus",
  async (payload: any, { rejectWithValue }) => {
    try {
      await axios.put(`orders/order-items/${payload.id}`, {
        isCompleted: payload.isCompleted,
      });
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);

// Leaves types
export const fetchAllLeaveTypes = createAsyncThunk(
  "tables/fetchAllLeaveTypes",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(`leave-types`);
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
      let response = await axios.post(`leave-types`, payload);
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
      let response = await axios.put(`leave-types/${payload.id}`, payload);
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
      await axios.delete(`leave-types/${id}`);
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
      let response = await axios.get(`leaves`);
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
      let response = await axios.post(`leaves`, payload);
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
      let response = await axios.put(`leaves/${payload.id}`, payload);
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
      await axios.delete(`leaves/${id}`);
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
      let response = await axios.put(`leaves/${payload.id}/status`, {
        status: payload.status,
      });
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
      let response = await axios.get(`menus/categories`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while fetching all menu categories");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createMenuCategories = createAsyncThunk(
  "tables/createMenuCategories",
  async (payload: any, { getState, rejectWithValue }) => {
    try {
      let response = await axios.post(`menus/categories`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while creating categories");
      return rejectWithValue("Something went wrong while creating categories");
    }
  }
);
export const fetchAllMenus = createAsyncThunk(
  "tables/fetchAllMenus",
  async (_, { getState, rejectWithValue }) => {
    try {
      let response = await axios.get(`menus`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while fetching all orders");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createMenu = createAsyncThunk(
  "tables/createMenu",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`menus`, payload);
      return response.data.menuItem; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createBulkMenu = createAsyncThunk(
  "tables/createBulkMenu",
  async (payload: any, { rejectWithValue }) => {
    try {
      let response = await axios.post(`menus/bulk`, payload);
      return response.data; // return the id to identify which table was deleted
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
      let response = await axios.patch(`menus/${payload.id}`, payload);
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while updating, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteMenu = createAsyncThunk(
  "tables/deleteMenu",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`menus/${id}`);
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
        `menus/${ids.menuId}/customization/${ids.customizationId}`
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
        `menus/${payload.menuId}/customization/${payload.customizationId}`,
        payload
      );
      return payload; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while updating, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createMenuCustomization = createAsyncThunk(
  "tables/createMenuCustomization",
  async (payload: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(`menus/${payload.menuId}/customization/`, {
        customizations: [payload],
      });
      return { menuId: payload.menuId, data: data.data }; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating menu customizations, please try again"
      );
      return rejectWithValue(
        "Something went wrong while creating table session, please try again"
      );
    }
  }
);

// table sessions
export const createTableSession = createAsyncThunk(
  "tables/createTableSession",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`tables-session/`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating new session, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const fetchAllTableSession = createAsyncThunk(
  "tables/fetchAllTableSession",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`tables-session/`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while fetching all table sessions, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);

// Cart
export const fetchAllCartData = createAsyncThunk(
  "tables/fetchAllCartData",
  async (tableSessionId: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`cart-items/${tableSessionId}`);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const addItemToCart = createAsyncThunk(
  "tables/addItemToCart",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`cart-items/`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const updateItemToCart = createAsyncThunk(
  "tables/updateItemToCart",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`cart-items/${payload.id}`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something went wrong while updating, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteItemToCart = createAsyncThunk(
  "tables/deleteItemToCart",
  async (id: any, { rejectWithValue }) => {
    try {
      await axios.delete(`cart-items/${id}`);
      return id; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const deleteAllCartItemFromTableSession = createAsyncThunk(
  "tables/deleteAllCartItemFromTableSession",
  async (tableSession: any, { rejectWithValue }) => {
    return tableSession; // return the id to identify which table was deleted
  }
);

//Auth
export const createNewFirm = createAsyncThunk(
  "tables/createNewFirm",
  async (payload: any, { rejectWithValue }) => {
    try {
      let respopnse = await axios.post(`auth/signup`, payload);
      localStorage.setItem("token", respopnse.data.token);
      localStorage.setItem("refreshtoken", respopnse.data.refreshToken);
      return respopnse.data; // return the id to identify which table was deleted
    } catch (error: any) {
      toast.error(
        "Something went wrong while creating your firm, please try again"
      );
      return rejectWithValue("Something went wrong while adding new firm ");
    }
  }
);
export const updateFirm = createAsyncThunk(
  "tables/updateFirm",
  async (payload: any, { rejectWithValue }) => {
    try {
      let respopnse = await axios.put(`firms/${payload.id}`, payload);
      return respopnse.data; // return the id to identify which table was deleted
    } catch (error: any) {
      toast.error("Something went wrong while updating, please try again");
      return rejectWithValue("Something went wrong while adding new firm ");
    }
  }
);
export const getAllFirmByNumber = createAsyncThunk(
  "tables/getAllFirmByNumber",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const number = state.table?.myAccount.employee.Firm.mobileNumber;
      let respopnse = await axios.get(`firms?mobileNumber=${number}`);
      return respopnse.data; // return the id to identify which table was deleted
    } catch (error: any) {
      toast.error(
        "Something went wrong while fetching all your firms, please try again"
      );
      return rejectWithValue("Something went wrong while adding new firm ");
    }
  }
);

export const deleteFirm = createAsyncThunk(
  "tables/deleteFirm",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const id = state.table?.myAccount.employee.Firm.id;
      await axios.delete(`firms/${id}`);
      localStorage.clear();
      return id; // return the id to identify which table was deleted
    } catch (error: any) {
      toast.error("Something went wrong while deleting, please try again");
      return rejectWithValue("Something went wrong while adding new firm ");
    }
  }
);
export const updateFirmImage = createAsyncThunk(
  "tables/updateFirmImage",
  async (payload: any, { rejectWithValue }) => {
    try {
      let respopnse = await axios.put(
        `firms/${payload.id}/image`,
        payload.payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return respopnse.data; // return the id to identify which table was deleted
    } catch (error: any) {
      toast.error("Something went wrong while updating, please try again");
      return rejectWithValue("Something went wrong while adding new firm ");
    }
  }
);
export const authenticateUser = createAsyncThunk(
  "tables/authenticateUser",
  async (_, { rejectWithValue }) => {
    try {
      return !!(
        localStorage.getItem("token") && localStorage.getItem("refreshtoken")
      );
    } catch (error: any) {
      toast.error("Something went wrong while adding, please try again");
      return rejectWithValue("Something went wrong while adding new firm ");
    }
  }
);
export const login = createAsyncThunk(
  "tables/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      let respopnse = await axios.post(`auth/login`, payload);
      localStorage.setItem("token", respopnse.data.token);
      localStorage.setItem("refreshtoken", respopnse.data.refreshToken);
      return respopnse.data; // return the id to identify which table was deleted
    } catch (error: any) {
      toast.error("Something went wrong while logging in, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const logout = createAsyncThunk(
  "tables/logout",
  async (_, { rejectWithValue }) => {
    try {
      let respopnse = await axios.post(`auth/logout`);
      localStorage.clear();
      return respopnse.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      // return rejectWithValue("Failed to delete table");
    }
  }
);

export const generateOtp = createAsyncThunk(
  "tables/generateOtp",
  async (payload: any, { rejectWithValue }) => {
    try {
      let respopnse = await axios.post(`auth/generate-otp`, payload);
      return respopnse.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);

//subscriptions
export const createSubcription = createAsyncThunk(
  "tables/createSubcription",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`firm-subscriptions`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error("Something wnet wrong while adding, please try again");
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createSubcriptionTrial = createAsyncThunk(
  "tables/createSubcriptionTrial",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`firm-subscriptions/trail`, payload);
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating subscrption, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const updateSubcription = createAsyncThunk(
  "tables/updateSubcription",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `firm-subscriptions/${payload.id}`,
        payload
      );
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating subscrption, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const createSubscriptionGenerateSubLink = createAsyncThunk(
  "tables/createSubscriptionGenerateSubLink",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `firm-subscriptions/${id}/create-sub`,
        {}
      );
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating subscrption, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const pauseSubscription = createAsyncThunk(
  "tables/pauseSubscription",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `firm-subscriptions/${payload.id}/pause/${payload.subReferenceId}`,
        {}
      );
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating subscrption, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const activateSubscription = createAsyncThunk(
  "tables/activateSubscription",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `firm-subscriptions/${payload.id}/activate/${payload.subReferenceId}`,
        {}
      );
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating subscrption, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);
export const cancelSubscription = createAsyncThunk(
  "tables/cancelSubscription",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `firm-subscriptions/${payload.id}/cancel/${payload.subReferenceId}`,
        {}
      );
      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while creating subscrption, please try again"
      );
      return rejectWithValue("Failed to delete table");
    }
  }
);

export const updateLoader = createAsyncThunk(
  "tables/updateLoader",
  async (state: boolean, { rejectWithValue, getState }: any) => {
    return state;
  }
);
export const getNewToken = createAsyncThunk(
  "tables/getNewToken",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`auth/token`, { firmId: id });
      await localStorage.setItem("token", response.data.accessToken);
      await localStorage.setItem("refreshtoken", response.data.refreshToken);

      return response.data; // return the id to identify which table was deleted
    } catch (error) {
      toast.error(
        "Something went wrong while switching firm, please try again"
      );
    }
  }
);
export const updateWebPushSub = createAsyncThunk(
  "tables/updateWebPushSub",
  async (_, { rejectWithValue, getState }) => {
    if ("serviceWorker" in navigator) {
      // window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );

          Notification.requestPermission().then(async (permission) => {
            if (permission === "granted") {
              let subscription: any = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidKeys),
              });
              const state: any = getState();
              const firmId = state.table?.myAccount.employee.Firm.id;

              const desginationId =
                state.table?.myAccount?.employee?.Designation?.id;
              if (desginationId) {
                subscription = JSON.parse(JSON.stringify(subscription));
                subscription.firmId = firmId;
                subscription.designationId = desginationId;

                try {
                  await axios.post("/subscribe", subscription);
                } catch (e: any) {
                  toast.error("Somthing went wrong while subscribing ");
                }
              }
            }
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
      // });
    }
  }
);
