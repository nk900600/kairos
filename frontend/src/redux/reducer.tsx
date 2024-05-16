import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TableType } from "./types/tables";
import {
  DeleteLeaveTypes,
  UpdateLeaveTypes,
  addEmployee,
  addItemToCart,
  addTable,
  createAllLeaveTypes,
  createLeave,
  createMenu,
  createMenuCustomization,
  createOrder,
  createTableSession,
  deleteAllCartItemFromTableSession,
  deleteEmployees,
  deleteItemToCart,
  deleteLeave,
  deleteMenu,
  deleteMenuCustomization,
  deleteTable,
  fetchAllCartData,
  fetchAllEmployees,
  fetchAllLeaveTypes,
  fetchAllLeaves,
  fetchAllMenuCategories,
  fetchAllMenus,
  fetchAllOrders,
  fetchAllTableSession,
  fetchDesgination,
  fetchMyAccount,
  fetchTables,
  updateEmployees,
  updateItemToCart,
  updateLeave,
  updateLeaveStatus,
  updateMenu,
  updateMenuCustomization,
  updateOrderItemStatus,
  updateOrderStatus,
  updateTable,
  updateTableStatus,
} from "./actions";
import { toast } from "sonner";

export interface RootState {
  alltables: TableType[];
  myAccount: any;
  allEmployees: any[];
  allLeavesTypes: any[];
  allMenu: any[];
  allTableSessions: any[];
  allCartData: any[];
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
  myAccount: {},
  allLeavesTypes: [],
  allCartData: [],
  allLeaves: [],
  allTableSessions: [],
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
        fetchMyAccount.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.myAccount = action.payload;
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
      .addCase(
        createOrder.fulfilled,
        (state: RootState, action: PayloadAction<TableType[]>) => {
          state.allOrders.push(action.payload);
        }
      )
      .addCase(
        updateOrderStatus.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allOrders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.allOrders[index] = {
              ...state.allOrders[index],
              status: action.payload.status,
            };
          }

          if (action.payload.status == "Completed") {
            let tableSessionIndex = state.allTableSessions.findIndex(
              (session) => session.id == state.allOrders[index].tableSessionId
            );
            if (tableSessionIndex !== -1) {
              state.allTableSessions[tableSessionIndex] = {
                ...state.allTableSessions[tableSessionIndex],
                orderCount:
                  state.allTableSessions[tableSessionIndex].orderCount + 1,
              };
            }
          }
        }
      )
      .addCase(
        updateOrderItemStatus.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allOrders.forEach((item) =>
            item.orderItems.forEach((inner: any) => {
              if (inner.id == action.payload.id) {
                inner.isCompleted = action.payload.isCompleted;
              }
            })
          );
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
        deleteMenuCustomization.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allMenu.findIndex(
            (table) => table.id === action.payload.menuId
          );
          if (index !== -1) {
            state.allMenu[index].Customizations = state.allMenu[
              index
            ].Customizations.filter(
              (data: any) => data.id != action.payload.customizationId
            );
          }
        }
      )
      .addCase(
        createMenuCustomization.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allMenu.findIndex(
            (table) => table.id === action.payload.menuId
          );
          if (index !== -1) {
            state.allMenu[index].Customizations = JSON.parse(
              JSON.stringify(action.payload.data.menuItems)
            );

            state.allMenu[index] = JSON.parse(
              JSON.stringify(state.allMenu[index])
            );
          }
        }
      )
      .addCase(
        updateMenuCustomization.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allMenu.findIndex(
            (table) => table.id === action.payload.menuId
          );
          if (index !== -1) {
            const InnerIndex = state.allMenu[index].Customizations.findIndex(
              (data: any) => data.id === action.payload.customizationId
            );

            if (InnerIndex !== -1) {
              let { choices, name, maxChoices } = action.payload;
              state.allMenu[index].Customizations[InnerIndex] = {
                ...state.allMenu[index].Customizations[InnerIndex],
                name,
                maxMultiSelect: maxChoices,
              };

              choices.forEach((val: any, index2: number) => {
                state.allMenu[index].Customizations[
                  InnerIndex
                ].CustomizationChoices[index2] = {
                  ...state.allMenu[index].Customizations[InnerIndex]
                    .CustomizationChoices[index2],
                  additionalPrice: val.price,
                  dietType: val.diet,
                  name: val.name,
                };
              });
            }
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
      )

      // Table Session
      .addCase(
        createTableSession.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.alltables.findIndex(
            (table) => table.id == action.payload.tableId
          );

          if (index !== -1) {
            state.alltables[index].status = "Occupied";
          }

          state.allTableSessions.push(action.payload);
        }
      )
      .addCase(
        fetchAllTableSession.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allTableSessions = action.payload;
        }
      )

      // Cart
      .addCase(
        addItemToCart.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allCartData.push(action.payload);
        }
      )
      .addCase(
        fetchAllCartData.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allCartData = action.payload;
        }
      )
      .addCase(
        updateItemToCart.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          const index = state.allCartData.findIndex(
            (table) => table.id == action.payload.id
          );
          if (index !== -1) {
            state.allCartData[index] = {
              ...state.allCartData[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(
        deleteAllCartItemFromTableSession.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allCartData = state.allCartData.filter(
            (item) => item.tableSessionId != action.payload
          );
        }
      )
      .addCase(
        deleteItemToCart.fulfilled,
        (state: RootState, action: PayloadAction<any>) => {
          state.allCartData = state.allCartData.filter(
            (data) => data.id != action.payload
          );
        }
      );
  },
});

export const counterReducers = counterSlice.reducer;
