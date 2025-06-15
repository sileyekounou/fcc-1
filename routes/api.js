'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  if (!input) {
    return res.status(400).json({ error: 'no input provided' });
  }

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);
  
  if (initNum === null && initUnit === null) {
    return res.json({ error: 'invalid number and unit' });
  }

  if (initNum === null) {
    return res.json({ error: 'invalid number' });
  }

  if (initUnit === null) {
    return res.json({ error: 'invalid unit' });
  }

  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string
  });
});


};
