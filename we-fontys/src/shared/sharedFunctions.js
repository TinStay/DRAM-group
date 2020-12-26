export const objectsAreTheSame = (objectOne, objectTwo) => {
  const objectOneKeys = Object.keys(objectOne);
  const objectTwoKeys = Object.keys(objectTwo);

  if (objectOneKeys.length !== objectTwoKeys.length) {
    return false;
  }

  // loop through first object keys
  for (let key of objectOneKeys) {
    console.log(objectOne[key],  objectTwo[key],   objectOne[key] == objectTwo[key])    

    // Check if field if array (interests) // arrays are objects
    if (typeof(objectOne[key]) == "object") {

      // Check if arrays are the same
      if(JSON.stringify(objectOne[key]) !== JSON.stringify(objectTwo[key])){
        return false
      }
    }
    // Check if object values are the same
    if (objectOne[key] !== objectTwo[key]) {
      return false;
    }
  }

  return true;
};
