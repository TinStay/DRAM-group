export const objectsAreTheSame = (objectOne, objectTwo) => {
  const objectOneKeys = Object.keys(objectOne);
  const objectTwoKeys = Object.keys(objectTwo);

  if (objectOneKeys.length !== objectTwoKeys.length) {
    return false;
  }

  // loop through first object keys
  for (let key of objectOneKeys) {
    console.log(key, "?=", key);
    
    // Check if field if array (interests)
    if (typeof(objectOne[key]) == "object") {
      console.log("array");

      if(JSON.stringify(objectOne[key]) !== JSON.stringify(objectTwo[key])){
        return false
      }
    }
    if (objectOneKeys[key] !== objectTwoKeys[key]) {
      return false;
    }
  }

  return true;
};
