export const pick = (obj: Object, keys: any) => {
  const result: Object = {};
  keys.forEach((key: string) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result;
};
