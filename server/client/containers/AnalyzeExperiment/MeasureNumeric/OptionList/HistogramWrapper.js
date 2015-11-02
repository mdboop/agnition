//reqs...measureValue
var React = require('react');
var _ = require('underscore');
var connect = require('react-redux').connect;
var utils = require('../../../../utils/sampleUtils.js');
var AreaChart = require("react-d3").AreaChart;


var HistogramWrapper = React.createClass({
  componentWillMount : function() {
    this.genChartHistograms();

  },
  genChartHistograms : function() {
    //concat all the samples to find the min and max for min sizing
    allSamples = _.reduce(this.props.datasets, function(memo, array){
      return memo.concat(array);
    });

    var minValue = _.reduce(allSamples, function(memo, value){
      return Math.floor(Math.min(memo, value));
    });

    var maxValue = _.reduce(allSamples, function(memo, value){
      return Math.floor(Math.max(memo, value));
    });

    //set max freq
    var maxFreq = 0;

    var chartData = _.map(this.props.datasets, function(values, key){
      var histogram = utils.genHistogram(this.props.bins, values, minValue, maxValue);
      maxFreq = Math.max(histogram.maxFreq, maxFreq);
      return  { data : {name: 'a name', values: histogram.coordinates}, label: key};
    }, this);

    this.histograms = _.map(chartData, function(dataObj, index) {
      return <AreaChart
                data= {dataObj.data}
                yScale = {[0, maxFreq]}
                xScale = {[minValue, maxValue]}
                width={500}
                height={300}
                viewBoxObject={{
                  x: 0,
                  y: 0,
                  height: 400,
                  width: 500
                }}
                xAxisTickInterval={{unit: 'frequency', interval: 1}}
                title = {dataObj.label} />

    }, this);
  },
  histograms  : [],
  render: function() {
    return (
      <div>
      {this.histograms}
      </div>
    );
  }
});

// export chart
module.exports = HistogramWrapper;
