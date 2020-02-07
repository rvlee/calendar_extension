const getPath = (obj, path) => {
  const pathSplit = path.split('.');
  let parseObj = obj;
  for (let i = 0; i < pathSplit.length; i++) {
    if (parseObj[pathSplit[i]]) {
      parseObj = parseObj[pathSplit[i]];
    } else {
      return undefined;
    }
  }
  return parseObj;
}

const setPath = (obj, value, path) => {
  const newObj = {...obj};
  const pathSplit = path.split('.');
  
  const setObj = (tempObj, index) => {
    if (tempObj[pathSplit[index]]) {
      if (index === pathSplit.length - 1) {
        tempObj[pathSplit[index]] = value;
      } else {
        setObj(tempObj[pathSplit[index]], index + 1)
      }
    }
  }

  setObj(newObj, 0)
  return newObj
}

module.exports = {
  getPath,
  setPath
}