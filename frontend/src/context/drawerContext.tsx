// import React from "react";

// // Create a context, initial state can be undefined or a specific object
// export const DrawerContext = React.createContext({
//   open: false,
//   component: "",
//   title: "",
//   description: "",
//   compProps: {},
// });

import React, { createContext, useState, useContext } from "react";

// Define the shape of your context data and include setters
const DrawerContext = createContext<any>({
  open: false,
  setOpen: () => {},
  component: null,
  setComponent: () => {},
  compProps: {},
  setCompProps: () => {},
  title: "",
  setTitle: () => {},
  description: "",
  setDescription: () => {},
});

export const DrawerProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState("manageTable");
  const [compProps, setCompProps] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const value: any = {
    open,
    setOpen,
    component,
    setComponent,
    compProps,
    setCompProps,
    title,
    setTitle,
    description,
    setDescription,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerContext;
