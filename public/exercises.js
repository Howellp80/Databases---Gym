// handles onclick event for Add Exercise button
document.getElementById("addEButton").addEventListener('click', function(event) {
 	// get info from text fields
 	var eName = document.getElementById("EName").value;
 	var eSets = document.getElementById("ESets").value;
 	var eReps = document.getElementById("EReps").value;

 	if (eName != ""){

      var newEData = {};
      newEData.eName = eName;
      newEData.eSets = eSets;
      newEData.eReps = eReps;

		var req = new XMLHttpRequest();
      req.open('POST', '/addE', true);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("eTable");
					tT.replaceChild(makeTBody(response), tT.childNodes[2]);
	         }
	      } 
	      else {
	          console.log("Err: " + req.statusText);
			}
		});
		req.send(JSON.stringify(newEData));
 		event.preventDefault();
 	}
 	event.preventDefault();
});




// builds the original exercise table body with data already in database
// first we need to fetch the current data...
var req = new XMLHttpRequest();
req.open('GET', '/fetchE', true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function() {
   if (req.status >= 200 && req.status < 400) {
	   var response = JSON.parse(req.responseText);
	   //console.log("response from fetchE:");
	   //console.log(response);
	   var hasObjects = response.length;
	   //console.log(hasObjects);

	   // call to build the table body
		if (hasObjects) {
	      var tT = document.getElementById("eTable");
			tT.replaceChild(makeTBody(response), tT.childNodes[2]);
	   }
   } 
   else {
      console.log("Err: " + req.statusText);
   }
});
req.send(null); 


// this actually builds/rebuilds the tbody...
function makeTBody(response) {
	//console.log("In makeTBody");
   var newTB = document.createElement("tbody");
   newTB.id = "theETB";
   //newTB.textContent = "table body";
   //var size = Object.keys(response).length
   //console.log("response size: " + size);
	
	for (var exer in response){
		//console.log("exer = " + exer);

		var newRow = document.createElement("tr");

		// make the id td
		var tdID = document.createElement("td");
		tdID.textContent = response[exer].id;
		newRow.appendChild(tdID);

		// make the exercise name td
		var tdEName = document.createElement("td");
		tdEName.textContent = response[exer].name;
		newRow.appendChild(tdEName);

		// make the reps td
		var tdReps = document.createElement("td");
		tdReps.textContent = response[exer].reps;
		newRow.appendChild(tdReps);

		// make the sets td
		var tdSets = document.createElement("td");
		tdSets.textContent = response[exer].sets;
		newRow.appendChild(tdSets);


		// form for edit button
		var newForm = document.createElement("form");
		
		// make the edit button
		var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      var ExerID = response[exer].id;
      editButton.onclick = function(x){
      	return function(){
	         //console.log("exercise id: " + x);
	         location.href = "/edit?id=" + x;
				event.preventDefault();
			};
      }(ExerID);

 		newForm.appendChild(editButton);
		newRow.appendChild(newForm);
		newTB.appendChild(newRow);
	}
   return newTB;
}