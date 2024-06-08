import {
  ControlProps,
  MenuProps,
  OptionProps,
  SingleValueProps,
  PlaceholderProps,
  MultiValueProps,
  GroupBase,
  ClassNamesConfig,
  StylesConfig,
} from "react-select";
import CreatableSelect from "react-select/creatable";

const customStyles: StylesConfig<
  { value: any; label: any },
  false,
  GroupBase<{ value: any; label: any }>
> = {
  control: (provided, state) => ({
    ...provided,
    display: "flex",
    height: "2.5rem",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "#000" : "rgb(226, 232, 240)",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderWidth: "1px",
    boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
    "&:hover": {
      borderColor: "rgb(226, 232, 240)",
    },
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  menu: (provided) => ({
    ...provided,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "hsl(210 40% 96.1%)"
      : state.isFocused
      ? "hsl(210 40% 96.1%)"
      : "#fff",
    color: "#000",
    cursor: "pointer",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    "&:hover": {
      backgroundColor: "hsl(210 40% 96.1%)",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#A0AEC0",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#4A5568",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#E53E3E",
      color: "#fff",
    },
  }),
};

export const CreatableSelectComponent = ({ ...props }) => {
  return <CreatableSelect styles={customStyles} {...props}></CreatableSelect>;
};
