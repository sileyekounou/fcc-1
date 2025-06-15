const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('convertHandler should correctly read a whole number input', function () {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function () {
    assert.strictEqual(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('convertHandler should correctly read a fractional input', function () {
    assert.strictEqual(convertHandler.getNum('1/2kg'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.approximately(convertHandler.getNum('3.5/7mi'), 0.5, 0.00001);
  });

  test('convertHandler should return an error on a double-fraction (i.e. 3/2/3)', function () {
    assert.isNull(convertHandler.getNum('3/2/3kg'));
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    validUnits.forEach(unit => {
      assert.strictEqual(convertHandler.getUnit(`5${unit}`), unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase());
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.isNull(convertHandler.getUnit('3.2kilomegagram'));
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    const unitPairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    Object.keys(unitPairs).forEach(initUnit => {
      assert.strictEqual(convertHandler.getReturnUnit(initUnit), unitPairs[initUnit]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    const spellings = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    Object.keys(spellings).forEach(unit => {
      assert.strictEqual(convertHandler.spellOutUnit(unit), spellings[unit]);
    });
  });

  test('convertHandler should correctly convert gal to L', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('convertHandler should correctly convert L to gal', function () {
    assert.approximately(convertHandler.convert(1, 'L'), 1 / 3.78541, 0.1);
  });

  test('convertHandler should correctly convert mi to km', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('convertHandler should correctly convert km to mi', function () {
    assert.approximately(convertHandler.convert(1, 'km'), 1 / 1.60934, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, 'kg'), 1 / 0.453592, 0.1);
  });


});
