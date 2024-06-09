export const validateData = (data: any, schema:any) => {
  const errors: any = [];

  data.forEach((row: any, index: any) => {
    console.log(row);
    const validation = schema.safeParse(row);
    if (!validation.success) {
      errors.push({
        row: index + 1,
        errors: validation.error.errors,
      });
    }
  });

  return errors;
};
