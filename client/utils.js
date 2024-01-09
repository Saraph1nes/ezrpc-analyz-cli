function objectToArray(obj, keyName, valueName) {
  return Object.keys(obj).map(key => {
    const newObj = {};
    newObj[keyName] = key;
    newObj[valueName] = obj[key];
    return newObj;
  });
}

function convert2PieData(data) {
  const result = data.reduce((acc, cur) => {
    const typeName = cur.name.split('.')[0];
    const existIndex = acc.findIndex(item => item.type === typeName);
    if (existIndex >= 0) {
      acc[existIndex].value += 1;
    } else {
      acc.push({ type: typeName, value: 1 });
    }
    return acc;
  }, []);
  result.sort((a, b) => b.value - a.value);
  return result;
}

export {
  objectToArray,
  convert2PieData
}
