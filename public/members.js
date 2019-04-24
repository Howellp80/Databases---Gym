// handles onclick event for Add Member button
document.getElementById("addMButton").addEventListener('click', function(event) {
 	// get info from text fields
 	var fname = document.getElementById("MFName").value;
 	var lname = document.getElementById("MLName").value;
 	var msid = document.getElementById("MType").value;
 	//var numOfChecks = (document.getElementById("checkboxes").childElementCount)/2;
 	//console.log(numOfChecks);
 	if ((fname != "")&&(lname != "")){

 		
      var newMData = {};
      newMData.fname = fname;
      newMData.lname = lname;
      newMData.msid = msid;

		var req = new XMLHttpRequest();
      req.open('POST', '/addM', true);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("mTable");
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




// builds the original Members table body with data already in database
// first we need to fetch the current data...
var req = new XMLHttpRequest();
req.open('GET', '/fetchM', true);
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
	      var tT = document.getElementById("mTable");
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
   newTB.id = "theMTB";
   //newTB.textContent = "table body";
   //var size = Object.keys(response).length
   //console.log("response size: " + size);
	
	for (var memb in response){
		//console.log("memb = " + memb);

		var newRow = document.createElement("tr");

		// make the id td
		var tdID = document.createElement("td");
		tdID.textContent = response[memb].id;
		newRow.appendChild(tdID);

		// make the first name td
		var tdFName = document.createElement("td");
		tdFName.textContent = response[memb].f_name;
		newRow.appendChild(tdFName);

		// make the last name td
		var tdLName = document.createElement("td");
		tdLName.textContent = response[memb].l_name;
		newRow.appendChild(tdLName);

		// make the membership id td
		var tdMsid = document.createElement("td");
		tdMsid.textContent = response[memb].msid;
		newRow.appendChild(tdMsid);

		// make the membership type td
		var tdMtype = document.createElement("td");
		tdMtype.textContent = response[memb].type;
		newRow.appendChild(tdMtype);		


		newTB.appendChild(newRow);
	}
   return newTB;
}