// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
  //console.log(data);
//});

// Promise Pending
//const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);

// Function for plots
function Fplots(id) {
    
  // read json data
  d3.json("data/samples.json").then(function(data) {
    console.log(data)

    
    // 2. Use filter() to pass the function as its argument
   // var samples = data.filter(id);
    
    //  Check to make sure your are filtering your movies.
  //  console.log(samples);
  // function filterCities(city) {
 // return parseInt(city.Increase_from_2016) > 15000;
//}
 
//var samples = data.samples.filter(id)
//return parseInt(id);
//console.log(samples);
     var samples = data.samples.filter(whatever => whatever.id.toString() === id)[0];
      console.log(samples);

      // slice f
      var id_values = (samples.otu_ids.slice(0, 10)).reverse();
      var sampleValues = samples.sample_values.slice(0, 10).reverse();
      var id_otu = id_values.map(i => "OTU " + i)
      var labels_otu = samples.otu_labels.slice(0, 10);

      
      // create trace variable for the plot
      var trace = {
          x: sampleValues,
          y: id_otu,
          text: labels_otu,
          type:"bar",
          orientation: "h",
      };

      // create data variable
      var data = [trace];

      // create layout variable to set plots layout
      var layout = {
          title: "OTU´s",
          yaxis:{
          tickmode:"linear",},        
      };

      Plotly.newPlot("bar_chart", data, layout);
      
      // create trace variable for the plot
      var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
            size: samples.sample_values,
            color: samples.otu_ids
          },
          text: samples.otu_labels
      };

      // create layout variable to set plots layout
      var layout = {
          xaxis:{title: "OTU Id"},
          yaxis:{title: "Sample Values"},
          height: 400,
          width: 1100
      };

      // create the data variable 
      var data1 = [trace1];

      Plotly.newPlot("bubble_plot", data1, layout); 

  });    
}
  
// Function for demo info
function Finfo(id) {
  d3.json("data/samples.json").then(function(data) {

      var metadata = data.metadata;
      console.log(metadata)

      var mds = metadata.filter(md => md.id.toString() === id)[0];
      var info = d3.select("#metadata_info");

      info.html("");
      Object.entries(mds).forEach((key) => {   
              info.append("h5").text(key[0] + ": " + key[1] + "\n");    
      });
  });
}


//function updatePage() {
  // Use D3 to select the dropdown menu
//  var dropdownMenu = d3.selectAll("#selectOption").node();
  // Assign the dropdown menu item ID to a variable
  //var dropdownMenuID = dropdownMenu.id;
  // Assign the dropdown menu option to a variable
  //var selectedOption = dropdownMenu.value;

 // console.log(dropdownMenuID);
  //console.log(selectedOption);
//}

// funcyion optionChanged
function optionChanged(id) {
  Fplots(id);
  Finfo(id);
}
// init
function init() {
  // d3 selection
  var dropdownMenu = d3.select("#selectOption");

  d3.json("data/samples.json").then(function(data) {
      console.log(data)
   data.names.forEach(function(name) {
     dropdownMenu.append("option").text(name).property("value");
   });

      // funtions for showing dif plots
      Fplots(data.names[0]);
      Finfo(data.names[0]);
  });
}

init();
