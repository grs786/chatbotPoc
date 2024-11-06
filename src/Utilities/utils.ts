export function get_url_extension(url: string) {
  return url?.split(".").pop().split(/\#|\?/)[0];
}

export const updateArray = (array: any[], newObject: { forId: string }) => {
  const index = array.findIndex(
    (item: { forId: string }) => item.forId === newObject.forId
  );
  if (index !== -1) {
    // If the object exists, replace it
    const updatedArray = array.map((item: any, idx: any) =>
      idx === index ? newObject : item
    );
    return updatedArray;
  } else {
    // If the object does not exist, push the new object
    return [...array, newObject];
  }
};

export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@ford\.com$/;
  return emailRegex.test(email);
}
