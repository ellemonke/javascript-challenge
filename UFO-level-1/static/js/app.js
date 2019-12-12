// from data.js
var allSightings = data;

// Select the output element
var output = d3.select("#ufo-table>tbody");

// Select the button
var button = d3.select("#filter-btn");

// Function/eventhandler to handle the input
function filterSightings() {
    // Retrieve the date inputted
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");

    // Clear any existing results
    output.html("");

    // Use the form input to filter the data by date
    var results = allSightings.filter(sighting => sighting.datetime === inputValue);

    // Append results to the table
    Object.entries(results).forEach(([index, sighting]) => {
        // Create a row for each sighting
        var tableRow = output.append("tr");

        // Create a cell for each key in the sighting object
        Object.entries(sighting).forEach(([key, value]) => {
            tableRow.append("td").text(`${value}`);
        });
    });
};

// Bind the function/eventhandler to the event
button.on("click", filterSightings);