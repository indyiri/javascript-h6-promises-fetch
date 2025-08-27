"use strict";

const baseURL = "http://localhost:3000/";

function getDataFromEndpoint(endpoint) {
    fetch(baseURL + endpoint)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
}

function getDataFromEndpointWithId(endpoint, id) {
    fetch(baseURL + endpoint + "?id=" + id)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
}

function getDataFromEndpointWithName(endpoint, name) {
    fetch(baseURL + endpoint + "?name=" + encodeURIComponent(name))
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
}

function getDataFromEndpointByPropertyAndValue(endpoint, property, value) {
    let valueInput;
    if(typeof value === "string")
    {
        valueInput = encodeURIComponent(value);
    }
    else
    {
        valueInput = value;
    }

    fetch(baseURL + endpoint + "?" + property + "=" + valueInput)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
}

getDataFromEndpoint("students");
getDataFromEndpointWithId("students", 12402665);
getDataFromEndpointWithName("students", "Indy");
getDataFromEndpointByPropertyAndValue("students", "id", 12402665);