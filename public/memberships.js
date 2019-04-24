// handles onclick event for Add Membership button
document.getElementById("addMSButton").addEventListener('click', function(event) {
 	var msType = document.getElementById("MSType").value;
 	if (msType != ""){

 		// get info from text fields
      var newMSData = {};
      newMSData.msType = msType;

		var req = new XMLHttpRequest();
      req.open('POST', '/addMS', true);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("msTable");
					tT.replaceChild(makeTBody(response), tT.childNodes[2]);
	         }
	      } 
	      else {
	          console.log("Err: " + req.statusText);
			}
		});
		req.send(JSON.stringify(newMSData));
 		event.preventDefault();
 	}
 	event.preventDefault();
});


// builds the original Memberships table body with data already in database
// first we need to fetch the current data...
var req = new XMLHttpRequest();
req.open('GET', '/fetchMS', true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function() {
   if (req.status >= 200 && req.status < 400) {
	   var response = JSON.parse(req.responseText);
	   //console.log("response from fetchMS:");
	   //console.log(response);
	   var hasObjects = response.length;
	   //console.log(hasObjects);

	   // call to build the table body
		if (hasObjects) {
	      var tT = document.getElementById("msTable");
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
   newTB.id = "theMSTB";
   //newTB.textContent = "table body";
   //var size = Object.keys(response).length
   //console.log("response size: " + size);
	
	for (var mShip in response){
		//console.log("mShip = " + mShip);

		var newRow = document.createElement("tr");

		// make the id td
		var tdID = document.createElement("td");
		tdID.textContent = response[mShip].id;
		newRow.appendChild(tdID);

		// make the length/type td
		var tdReps = document.createElement("td");
		tdReps.textContent = response[mShip].type;
		newRow.appendChild(tdReps);

		newTB.appendChild(newRow);
	}
   return newTB;
}