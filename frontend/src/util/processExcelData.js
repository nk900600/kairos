export const processExcelData = (data) => {
  const result = [];
  let currentItem = null;

  data.forEach((item) => {
    if (item["Menu Name"]) {
      // If there's a currentItem, push it to the result array
      if (currentItem) {
        result.push(currentItem);
      }

      // Create a new menu item
      currentItem = {
        name: item["Menu Name"],
        description: item["Description"],
        price: item["Price"],
        categoryName: item["Category"],
        spiceLevel: item["Spice Level"],
        dietType: item["Diet Type"],
        customizations: [],
      };

      // If the current row has customization data, add it
      if (item["Customization Name"]) {
        currentItem.customizations.push({
          name: item["Customization Name"],
          maxMultiSelect: item["Max Choices"],
          choices: [
            {
              name: item["Choice Name"],
              additionalPrice: item["Choice price"],
              dietType: item["Choice Diet Type"],
            },
          ],
        });
      }
    } else if (item["Customization Name"]) {
      // If it's a continuation of customizations for the current menu item
      const lastCustomization = currentItem.customizations.find(
        (c) => c.name === item["Customization Name"]
      );

      if (lastCustomization) {
        // If customization already exists, add to its choices
        lastCustomization.choices.push({
          name: item["Choice Name"],
          additionalPrice: item["Choice price"],
          dietType: item["Choice Diet Type"],
        });
      } else {
        // If customization does not exist, create a new one
        currentItem.customizations.push({
          name: item["Customization Name"],
          maxMultiSelect: item["Max Choices"],
          choices: [
            {
              name: item["Choice Name"],
              additionalPrice: item["Choice price"],
              dietType: item["Choice Diet Type"],
            },
          ],
        });
      }
    } else {
      currentItem.customizations[
        currentItem.customizations.length - 1
      ].choices.push({
        name: item["Choice Name"],
        additionalPrice: item["Choice price"],
        dietType: item["Choice Diet Type"],
      });
    }
  });

  // Push the last item
  if (currentItem) {
    result.push(currentItem);
  }

  return result;
};
