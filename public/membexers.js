// handles onclick event for Add Exercise to membExerer button
document.getElementById("addMEButton").addEventListener('click', function(event) {
 	// get info from text fields
 	var mid = document.getElementById("MName").value;
 	var eid = document.getElementById("EName").value;
 	
 	if ((mid != "")&&(eid != "")){
      var newMData = {};
      newMData.mid = mid;
      newMData.eid = eid;

		var req = new XMLHttpRequest();
      req.open('POST', '/addME', true);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("meTable");
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




// builds the original membExerers table body with data already in database
// first we need to fetch the current data...
var req = new XMLHttpRequest();
req.open('GET', '/fetchME', true);
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
	      var tT = document.getElementById("meTable");
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
   newTB.id = "theMETB";
   //newTB.textContent = "table body";
   //var size = Object.keys(response).length
   //console.log("response size: " + size);
	
	for (var membExer in response){
		//console.log("membExer = " + membExer);

		var newRow = document.createElement("tr");

		// make the name td
		var tdname = document.createElement("td");
		tdname.textContent = response[membExer].f_name;
		tdname.textContent += " ";
		tdname.textContent += response[membExer].l_name;
		newRow.appendChild(tdname);

		// make the exercise name td
		var tdeName = document.createElement("td");
		tdeName.textContent = response[membExer].name;
		newRow.appendChild(tdeName);

		newTB.appendChild(newRow);
	}
   return newTB;
}