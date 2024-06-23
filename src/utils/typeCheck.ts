export const isObject = (value: any): value is Object => {
  if (typeof value === "object" && value !== null) {
    return true;
  }
  return false;
};

export const isEmptyObject = (value: object): boolean => {
  return value === null || Object.keys(value).length === 0;
};
export const isEmptyArray = <T>(value: Array<T>): boolean => {
  return value === null || value.length === 0;
};

export const isArray = (value: any): value is Array<any> => {
  return Array.isArray(value);
};
