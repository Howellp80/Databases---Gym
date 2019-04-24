// handles onclick event for Add Exercise to Routine button
document.getElementById("addREButton").addEventListener('click', function(event) {
 	// get info from text fields
 	var rid = document.getElementById("RName").value;
 	var eid = document.getElementById("EName").value;
 	
 	if ((rid != "")&&(eid != "")){
      var newMData = {};
      newMData.rid = rid;
      newMData.eid = eid;

		var req = new XMLHttpRequest();
      req.open('POST', '/addRE', true);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("reTable");
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




// builds the original routExerers table body with data already in database
// first we need to fetch the current data...
var req = new XMLHttpRequest();
req.open('GET', '/fetchRE', true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function() {
   if (req.status >= 200 && req.status < 400) {
	   var response = JSON.parse(req.responseText);
	   //console.log("response from fetchM:");
	   //console.log(response);
	   var hasObjects = response.length;
	   //console.log(hasObjects);

	   // call to build the table body
		if (hasObjects) {
	      var tT = document.getElementById("reTable");
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
   newTB.id = "theRETB";
   //newTB.textContent = "table body";
   //var size = Object.keys(response).length
   //console.log("response size: " + size);
	
	for (var routExer in response){
		//console.log("routExer = " + routExer);

		var newRow = document.createElement("tr");

		// make the routine name td
		var tdrName = document.createElement("td");
		tdrName.textContent = response[routExer].name;
		newRow.appendChild(tdrName);

		// make the exercise name td
		var tdeName = document.createElement("td");
		tdeName.textContent = response[routExer].ename;
		newRow.appendChild(tdeName);

		newTB.appendChild(newRow);
	}
   return newTB;
}