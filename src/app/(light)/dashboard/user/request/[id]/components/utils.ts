export const addDataModelDataToSchema = (schema: any, dataModels: any[]) => {
  for (const schemaItem of schema) {
    const matchingDataModel = dataModels?.find(
      (dataModel) => dataModel.id === schemaItem.id
    );
    if (matchingDataModel) {
      schemaItem.title = matchingDataModel.title;
      schemaItem.schema = matchingDataModel.schema;
    }
  }

  return schema;
};

type propertiesArrayItem = {
  propertyName: string;
  title: string;
  type: string;
  validations: any;
};

// Function to translate claimValidations into a object easy to run and read
export const createPropertiesArray = (
  dataModel: any
): propertiesArrayItem[] => {
  const propertiesArray = [];
  for (const propertyName in dataModel.claimValidations?.properties) {
    const propertyObj = dataModel.claimValidations?.properties[propertyName];
    const validations = Object.keys(propertyObj)
      .filter((key) => key !== 'type' && key !== 'title' && key !== 'items')
      .map((key) => {
        if (propertyObj[key]?.const) return `${key} ${propertyObj[key].const}`;
        return `${key} ${propertyObj[key]}`;
      })
      .join(', ');

    propertiesArray.push({
      propertyName,
      title: dataModel.schema?.properties?.[propertyName]?.title,
      type: propertyObj.type,
      validations,
    });
  }

  return propertiesArray;
};
