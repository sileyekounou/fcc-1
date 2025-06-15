function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    let num = input.match(/^[\d/.]+/);
    if (!num) return 1;
    result = num[0];

    if (result.includes('/')) {
      let nums = result.split('/');
      if (nums.length !== 2) return null;
      result = parseFloat(nums[0]) / parseFloat(nums[1]);
    } else {
      result = parseFloat(result);
    }

    return isNaN(result) ? null : result;
  };

  this.getUnit = function(input) {
    let result;
    let match = input.match(/[a-zA-Z]+$/);
    if (!match) return null;
    result = match[0];

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (validUnits.includes(result.toLowerCase())) {
      return result.toLowerCase() === 'l' ? 'L' : result.toLowerCase();
    }

    return null;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return spellMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return null;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitFull = this.spellOutUnit(initUnit);
    const returnUnitFull = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;
  };

}

module.exports = ConvertHandler;
