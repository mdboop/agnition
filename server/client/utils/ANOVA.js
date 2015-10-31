var statsUtil = require('./stats');
var criticalValues = require('./ANOVACriticalValues');

var getOptionDegreesOfFreedom = function(data) {
  return Object.keys(data).length - 1;
};

var getSampleDegreesOfFreedom = function(data) {
  var numOfOptions = 0;
  var numOfSamples = 0;
  for(var option in data) {
    numOfOptions++;
    numOfSamples += data[option].length;
  }
  return numOfSamples - numOfOptions;
};

var getCriticalValue = function(sampleDegreesOfFreedom, optionDegreesOfFreedom) {
  return criticalValues[sampleDegreesOfFreedom - 1][optionDegreesOfFreedom - 1];
};

var sumOfSquaresWithinGroups = function(data) {
  var sumOfSquares = 0;
  for (var option in data) {
    sumOfSquares += statsUtil.getSumOfSquaresDeviation(data[option]);
  }
  return sumOfSquares;
};

var totalSumOfSquares = function(data) {
  var fullData = [];
  for (var option in data) {
    fullData = fullData.concat(data[option]);
  }
  return statsUtil.getSumOfSquaresDeviation(fullData);
};

var sumOfSquaresBetweenGroups = function(data) {
  var fullData = [];
  for (var option in data) {
    fullData = fullData.concat(data[option]);
  }
  var fullMean = statsUtil.getMean(fullData);
  var sumOfSquares = 0;
  for (var option in data) {
    var mean = statsUtil.getMean(data[option]);
    sumOfSquares += Math.pow(mean - fullMean, 2) * data[option].length;
  }
  return sumOfSquares;
};

var neglectNullHyposthesis = function(data) {
  var sampleDegreeOfFreedom = getSampleDegreesOfFreedom(data);
  var optionDegreeOfFreedom = getOptionDegreesOfFreedom(data);
  var fRatio = (sumOfSquaresBetweenGroups(data) / optionDegreeOfFreedom) /
               (sumOfSquaresWithinGroups(data) / sampleDegreeOfFreedom);
  return fRatio > getCriticalValue(sampleDegreeOfFreedom, optionDegreeOfFreedom);
};

module.exports = {
  _getOptionDegreesOfFreedom: getOptionDegreesOfFreedom,
  _getSampleDegreesOfFreedom: getSampleDegreesOfFreedom,
  _getCriticalValue: getCriticalValue,
  _sumOfSquaresBetweenGroups: sumOfSquaresBetweenGroups,
  _sumOfSquaresWithinGroups: sumOfSquaresWithinGroups,
  _totalSumOfSquares: totalSumOfSquares,
  neglectNullHyposthesis: neglectNullHyposthesis,
};