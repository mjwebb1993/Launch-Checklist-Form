// Write your JavaScript code here!
function faultyVisible() {
   document.getElementById("faultyItems").style.visibility = "visible";
}
function noLaunch() {
   document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch`;
   document.getElementById("launchStatus").style.color = "red";
}
function yesLaunch() {
   document.getElementById("launchStatus").innerHTML = `Shuttle is ready for launch`;
   document.getElementById("launchStatus").style.color = "green";
}
// Alert Validation
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            response.json().then( function(json) {
            const div = document.getElementById("missionTarget");
            div.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[2].name}</li>
               <li>Diameter: ${json[2].diameter}</li>
               <li>Star: ${json[2].star}</li>
               <li>Distance from Earth: ${json[2].distance}</li>
               <li>Number of Moons: ${json[2].moons}</li>
            </ol>
            <img src="${json[2].image}"></img>
            `
         });
      });
   form.addEventListener("submit", function(event) {
      let pilotnameInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuellevelInput = document.querySelector("input[name=fuelLevel]");
      let cargomassInput = document.querySelector("input[name=cargoMass]");
      let pilotString = isNaN(pilotnameInput.value);
      let copilotString = isNaN(copilotInput.value);
      let fuellevelNumber = isNaN(fuellevelInput.value);
      let cargomassNumber = isNaN(cargomassInput.value);


      if (pilotnameInput.value === "" || copilotInput.value === "" || fuellevelInput.value === "" || cargomassInput.value === "") {
          alert("All fields are required!");
          event.preventDefault();
          return;
      } else if (pilotString === false || copilotString === false || fuellevelNumber === true || cargomassNumber === true) {
          alert("Please enter a valid name and/or number.")
          event.preventDefault();
          return;
      }

      // Updating Shuttle Requirements
      // document.getElementById("faultyItems").style.visibility = "visible";
      
      document.getElementById("pilotStatus").innerHTML = `${pilotnameInput.value}`;
      document.getElementById("copilotStatus").innerHTML = `${copilotInput.value}`;
      if (fuellevelInput.value < 10000) {
         faultyVisible();
         document.getElementById("fuelStatus").innerHTML = `There is not enough fuel for the journey.`;
         noLaunch();
         event.preventDefault();
      } else if (cargomassInput.value > 10000) {
         faultyVisible();
         document.getElementById("cargoStatus").innerHTML = `There is too much mass for the shuttle to take off.`;
         noLaunch();
         event.preventDefault();
      } else {
         yesLaunch();
        event.preventDefault();
         }
      
   });

   
});

//Updating Shuttle Requirements
// let pilotInputStatus = document.getElementById("pilotStatus");





/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
