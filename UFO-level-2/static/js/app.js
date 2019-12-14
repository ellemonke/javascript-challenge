/**
 * Filters UFO sightings based on form input
*/

// from data.js
var allSightings = data;

// Select the input elements
var datetime = d3.select("#datetime");
var city = d3.select("#city");
var state = d3.select("#state");
var country = d3.select("#country");
var shape = d3.select("#shape");

// Clear previous select options
state.html("");
country.html("");
shape.html("");

// Select the output element
var output = d3.select("#ufo-table>tbody");

// Select the buttons
var button = d3.select("#filter-btn");
var reset = d3.select("#reset-btn");


// Set select options to most current
function setFormOptions() {
    // Pull states from data
    var states = allSightings.map(sighting => sighting.state);
    // Create array of options
    var stateOptions = Array.from(new Set(states)).sort();
    stateOptions.unshift("");
    // Append options to form
    stateOptions.forEach(option => {
        var dropdown = state.append("option").attr("value", option)
        if (option === "on") {
            dropdown.text("Ontario");
        } else {
            var uppercase = option.toUpperCase();
            dropdown.text(uppercase);
        }
    });
        
    // Pull countries from data
    var countries = allSightings.map(sighting => sighting.country);
    // Create array of options
    var countryOptions = Array.from(new Set(countries));
    countryOptions.unshift("");
    // Append options to form
    countryOptions.forEach(option => {
        var dropdown = country.append("option").attr("value", option)
        if (option === "us") {
            dropdown.text("U.S.");
        } else if (option === "ca") {
            dropdown.text("Canada");
        } else {
            var uppercase = option.toUpperCase();
            dropdown.text(uppercase);
        }
    });

    // Pull shapes from data
    var shapes = allSightings.map(sighting => sighting.shape);
    // Create array of options
    var shapeOptions = Array.from(new Set(shapes)).sort();
    shapeOptions.unshift("");
    // Append options to form
    shapeOptions.forEach(option => {
        shape.append("option").attr("value", option).text(option);
    });

    return;
};

setFormOptions();


// Eventhandler function
function filterSightings() {

    // 1. Clear any existing results
    output.html("");

    // 2. Retrieve user input
    var dateFilter = datetime.property("value");
    var cityFilter = city.property("value");
    var stateFilter = state.property("value");
    var countryFilter = country.property("value");
    var shapeFilter = shape.property("value");

    // All filters in one object
    var allFilters = {
        "datetime": dateFilter, 
        "city": cityFilter, 
        "state": stateFilter, 
        "country": countryFilter, 
        "shape": shapeFilter
    };

    // Default results will include all data
    var results = allSightings;

    // 3. Filter data based on user input
    if ((!dateFilter) && (!cityFilter) && (!stateFilter) && (!countryFilter) && (!shapeFilter)) {
        // 3a. If no filters, then list all
    } else {
        // 3b. If one or more filters, then go through each filter
        Object.entries(allFilters).forEach(([key, value]) => {
            if (value) {
                results = results.filter(sighting => sighting[key] === value);
            };
        });
    };

    // 4. Check for results
    if (results.length === 0) {
        // 4a. No results
        var tableRow = output.append("tr");
        tableRow.append("td").attr("colspan", "7").text("No results found.");
    } else {
        // 4b. Append any found results to the table
        Object.entries(results).forEach(([index, sighting]) => {
            // Create a row for each sighting
            var tableRow = output.append("tr");
            // Create a cell for each value in the sighting
            Object.entries(sighting).forEach(([key, value]) => {
                tableRow.append("td").text(`${value}`);
            });
        });
    };

};

// Bind filter button to eventhandler
button.on("click", filterSightings);

// Reset button clears output
reset.on("click", function() {output.html("")});
