export const dateConvertor = (isoDateString: any) => {
  const date = new Date(isoDateString);

  // Options to format the date in "day month year" format
  const options: any = { day: "2-digit", month: "short", year: "numeric" };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};
