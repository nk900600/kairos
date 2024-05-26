import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  NavLink,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Sidebar from "./pages/sidebar";
import { Toaster, toast } from "sonner";
import { DrawerProvider } from "./context/drawerContext";
import { DrawerDialogComponent } from "./common/drawerDialog";
import axiosInstance from "./redux/axios";

export function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );

          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              subscribeUser(registration);
            }
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  const subscribeUser = async (registration: any) => {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BGfH4om8N0tCqebKndpSzkIxZJXRxFf5MmYBazFUJJx3D61cvxHzjSqHRk7AY4-6xp55GaA8VcRaw1X4aEpHHqI"
      ),
    });

    try {
      await axiosInstance.post("/subscribe", JSON.stringify(subscription));
    } catch (e: any) {
      toast.error("Somthing went wrong while subscribing ");
    }
  };

  const urlBase64ToUint8Array = (base64String: any) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <>
      <DrawerProvider>
        <Router>
          <Routes>
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={Login} />
          </Routes>
          <Sidebar></Sidebar>
        </Router>
        <DrawerDialogComponent />

        <Toaster richColors />
      </DrawerProvider>
    </>
  );
}

export default App;
