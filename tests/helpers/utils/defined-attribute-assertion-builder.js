export default function(keys) {
  return function(object, message) {
    let allDefined = true;
    let undefinedKeys = [];

    keys.forEach(key => {
      if (object.get(key) === undefined) {
        allDefined = false;
        undefinedKeys.push(key);
      }
    });
    let realMessage = message || 'Undefined keys';
    this.pushResult({
      result: allDefined,
      actual: allDefined,
      expected: true,
      message: `${realMessage}: ${undefinedKeys.join(',')}`
    });
  }
}
