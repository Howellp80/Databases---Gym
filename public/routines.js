// handles onclick event for Add Routine button
document.getElementById("addRButton").addEventListener('click', function(event) {
 	// get info from text fields
 	var rName = document.getElementById("RName").value;
 	var mid = document.getElementById("rMemb").value;

 	if (rName != ""){

      var newMData = {};
      newMData.rName = rName;
      newMData.mid = mid;

		var req = new XMLHttpRequest();
      req.open('POST', '/addR', true);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("rTable");
					tT.replaceChild(makeTBody(response), tT.childNodes[2]);
	         }
	      } 
	      else {
	          console.log("Err: " + req.statusText);
			}
		});
		req.send(JSON.stringify(newMData));
 		event.preventDefault();
 	}
 	event.preventDefault();
});


// builds the original Routines table body with data already in database
// first we need to fetch the current data...
var req = new XMLHttpRequest();
req.open('GET', '/fetchR', true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function() {
   if (req.status >= 200 && req.status < 400) {
	   var response = JSON.parse(req.responseText);
	   //console.log("response from fetchR:");
	   //console.log(response);
	   var hasObjects = response.length;
	   //console.log(hasObjects);

	   // call to build the table body
		if (hasObjects) {
	      var tT = document.getElementById("rTable");
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
   newTB.id = "theRTB";
   //newTB.textContent = "table body";
   //var size = Object.keys(response).length
   //console.log("response size: " + size);
	
	for (var rout in response){
		//console.log("rout = " + rout);

		var newRow = document.createElement("tr");

		// make the id td
		var tdID = document.createElement("td");
		tdID.textContent = response[rout].id;
		newRow.appendChild(tdID);

		// make the routine name td
		var tdRName = document.createElement("td");
		tdRName.textContent = response[rout].name;
		newRow.appendChild(tdRName);

		// make the member id td
		var tdMID = document.createElement("td");
		tdMID.textContent = response[rout].mid;
		newRow.appendChild(tdMID);

		// make the owner td
		var tdown = document.createElement("td");
		tdown.textContent = response[rout].f_name;
		tdown.textContent += " ";
		tdown.textContent += response[rout].l_name;
		newRow.appendChild(tdown);

		newTB.appendChild(newRow);
	}
   return newTB;
}