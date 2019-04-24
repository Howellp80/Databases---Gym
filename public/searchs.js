// handles onclick event for Search button
document.getElementById("searchButton").addEventListener('click', function(event) {
 
 	// clear the old table data
 	var clear = [];
 	var tTl = document.getElementById("slTable");
	tTl.replaceChild(makeTBody(clear), tTl.childNodes[2]);
	var tTr = document.getElementById("srTable");
	tTr.replaceChild(makeTBody(clear), tTr.childNodes[2]);


 	var mid = document.getElementById("MName").value;
 	//console.log(mid);

	if (mid != ""){
      var searchData = {};
      searchData.id = mid;

      // fetch data for Routines Table
		var req = new XMLHttpRequest();
      req.open('POST', '/fetchSL', false);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			//console.log("req 1:");
			//console.log(req);
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("slTable");
					tT.replaceChild(makeTBody(response), tT.childNodes[2]);
	         }
	      } 
	      else {
	          console.log("Err: " + req.statusText);
			}
		});
		req.send(JSON.stringify(searchData));
 		event.preventDefault();


 		// fetch data for Exercises Table
	   var req = new XMLHttpRequest();
	   req.open('POST', '/fetchSR', true);
	   req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			//console.log("req 2:");
			//console.log(req);
			if (req.status >= 200 && req.status < 400) {
	         var response = JSON.parse(req.responseText);
	         //console.log(response);
	         var hasObjects = response.length;
	         //console.log(hasObjects);

	         //  call to rebuild the table body after adding a new row
				if (hasObjects) {
	         	var tT = document.getElementById("srTable");
					tT.replaceChild(makeTBody(response), tT.childNodes[2]);
	         }
	      } 
	      else {
	          console.log("Err: " + req.statusText);
			}
		});
		req.send(JSON.stringify(searchData));
		event.preventDefault();

 	}
 	event.preventDefault();
});



// this actually builds/rebuilds the tbodys...
function makeTBody(response) {
	//console.log("In makeTBody");
   var newTB = document.createElement("tbody");
	
	for (var element in response){
		//console.log("element = " + element);

		var newRow = document.createElement("tr");

		// make the routine name td
		var tdName = document.createElement("td");
		tdName.textContent = response[element].name;
		newRow.appendChild(tdName);

		newTB.appendChild(newRow);
	}
   return newTB;
}