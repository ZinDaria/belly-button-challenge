d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    // Get a reference to the dropdown select element
    var dropdown = d3.select("#selDataset");

    // Populate the dropdown with Test Subject IDs
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value", name);
    });

    // Initial rendering with the first Test Subject ID
    optionChanged(data.names[0]);
});

//console.log("Complete data:", data);

// Get a reference to the dropdown select element
//var dropdown = d3.select("#selDataset");

// Log the list of Test Subject IDs to the console
//console.log("Test Subject IDs:", data.names);

// Function to handle dropdown change
function optionChanged(selectedID) {
    // Fetch data again to get the selected individual's information
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
       // Log the selected data to the console
       //console.log("Selected data:", data);
    

    // Filter the data based on the selected ID
        var selectedData = data.samples.find(sample => sample.id === selectedID);
        var demographicInfo = data.metadata.find(metadata => metadata.id === parseInt(selectedID));
    
        // Log the selected data and demographic information to the console
        //console.log("Selected sample data:", selectedData);
        //console.log("Demographic information:", demographicInfo);

        // Update demographic information panel
        var metadataPanel = d3.select("#sample-metadata");
        metadataPanel.html(""); // Clear existing content

        // Display demographic information
        Object.entries(demographicInfo).forEach(([key, value]) => {
            metadataPanel.append("p").text(`${key}: ${value}`);
        });

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
          var slicedData = selectedData.sample_values.slice(0, 10).reverse();
          var slicedLabels = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
          var slicedHovertext = selectedData.otu_labels.slice(0, 10).reverse();
  
          var barTrace = {
              x: slicedData,
              y: slicedLabels,
              text: slicedHovertext,
              type: 'bar',
              orientation: 'h'
          };
  
          var barData = [barTrace];
  
          var barLayout = {
              title: 'Top 10 OTUs',
              xaxis: { title: 'Sample Values' },
              yaxis: { title: 'OTU IDs' }
          };
  
          Plotly.newPlot('bar', barData, barLayout);

          //console.log("Bar chart data:", barData);
          //console.log("Bar chart layout:", barLayout);
        

        // Create a bubble chart that displays each sample.
        var bubbleTrace = {
            x: selectedData.otu_ids,
            y: selectedData.sample_values,
            mode: 'markers',
            marker: {
                size: selectedData.sample_values,
                color: selectedData.otu_ids,
                colorscale: 'Earth'
            },
            text: selectedData.otu_labels
        };

        var bubbleData = [bubbleTrace];

        var bubbleLayout = {
            title: 'Bubble Chart',
            xaxis: { title: 'OTU IDs' },
            yaxis: { title: 'Sample Values' }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    
        // console.log("Bubble chart data:", bubbleData);
        // console.log("Bubble chart layout:", bubbleLayout);


    });
}