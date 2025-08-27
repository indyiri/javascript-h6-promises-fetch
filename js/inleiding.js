"use strict";
// "use strict" zorgt ervoor dat je code in "strict mode" draait.
// Dit betekent dat JavaScript je sneller fouten laat zien als je iets fout schrijft,
// bv. een variabele gebruiken die niet gedefinieerd is.

const baseURL = "http://localhost:3000/";
// Dit is de basis-URL van jouw JSON-server.
// Alle fetch-aanvragen gebruiken deze URL als startpunt.
// Op poort 3000 draait je server (via "json-server --watch db.json --port 3000").

// ----------------------------------------------------------------------------------
// Functie 1: Algemene fetch functie voor een endpoint
// ----------------------------------------------------------------------------------
function getDataFromEndpoint(endpoint) {
    // Hier wordt een request gestuurd naar bv. "http://localhost:3000/students"
    fetch(baseURL + endpoint)
        // fetch geeft een Response object terug → dit moet omgezet worden naar JSON
        .then(response => response.json())
        // Als de JSON succesvol geladen is, loggen we de data naar de console
        .then(data => console.log(data))
        // Als er een fout optreedt (bv. server niet bereikbaar), komt dit in de catch terecht
        .catch(error => console.error("Error fetching data:", error));
}

// ----------------------------------------------------------------------------------
// Functie 2: Fetch data op basis van een ID
// ----------------------------------------------------------------------------------
function getDataFromEndpointWithId(endpoint, id) {
    // Hier voegen we "?id=..." toe aan de URL → dit filtert de resultaten in JSON-server
    // Voorbeeld: http://localhost:3000/students?id=12402665
    fetch(baseURL + endpoint + "?id=" + id)
        .then(response => response.json())
        .then(data => console.log(data)) // Resultaat tonen in de console
        .catch(error => console.error("Error fetching data:", error));
}

// ----------------------------------------------------------------------------------
// Functie 3: Fetch data op basis van een naam
// ----------------------------------------------------------------------------------
function getDataFromEndpointWithName(endpoint, name) {
    // encodeURIComponent zorgt ervoor dat speciale tekens (zoals spaties) juist verwerkt worden.
    // Voorbeeld: als name = "Indy Iri", wordt dit "Indy%20Iri" in de URL
    fetch(baseURL + endpoint + "?name=" + encodeURIComponent(name))
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
}

// ----------------------------------------------------------------------------------
// Functie 4: Fetch data op basis van een willekeurige property en waarde
// ----------------------------------------------------------------------------------
function getDataFromEndpointByPropertyAndValue(endpoint, property, value) {
    let valueInput;

    // Als de waarde een string is, moeten we encodeURIComponent gebruiken
    // Dit voorkomt problemen met spaties of speciale tekens in de URL
    if (typeof value === "string") {
        valueInput = encodeURIComponent(value);
    } else {
        // Als het bv. een getal is, kan het gewoon rechtstreeks in de URL
        valueInput = value;
    }

    // Voorbeeld: getDataFromEndpointByPropertyAndValue("students", "city", "New York")
    // maakt de URL: http://localhost:3000/students?city=New%20York
    fetch(baseURL + endpoint + "?" + property + "=" + valueInput)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error fetching data:", error));
}

// ----------------------------------------------------------------------------------
// Voorbeelden van functie-aanroepen
// ----------------------------------------------------------------------------------

// Haalt alle studenten op (http://localhost:3000/students)
getDataFromEndpoint("students");

// Haalt de student met id=12402665 op (http://localhost:3000/students?id=12402665)
getDataFromEndpointWithId("students", 12402665);

// Haalt de student met name="Indy" op (http://localhost:3000/students?name=Indy)
getDataFromEndpointWithName("students", "Indy");

// Haalt de student op via property "id" met waarde 12402665
// Zelfde effect als getDataFromEndpointWithId hierboven
getDataFromEndpointByPropertyAndValue("students", "id", 12402665);
