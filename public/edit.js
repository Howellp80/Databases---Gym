
// handles onclick event for Submit Edit button
document.getElementById("editExerButton").addEventListener('click', function(event) {
 	var name = document.getElementById("editName").value;
 	if (name != ""){

 		// get info from eddit text fields
      var editExerData = {};
      editExerData.name = name;
      editExerData.sets = document.getElementById("editSets").value;
      editExerData.reps = document.getElementById("editReps").value;
		editExerData.id = document.getElementById("editID").value;
		//console.log(editExerData);

		var req = new XMLHttpRequest();
      req.open('POST', '/edit', true);
      req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				 location.href = "/exercises";
	      } 
	      else {
	          console.log("Err: " + req.statusText);
			}
		});
		//var tester = JSON.stringify(editExerData);
		//console.log("tester: " + tester);

		req.send(JSON.stringify(editExerData));
 		event.preventDefault();
 	}
 	event.preventDefault();
});


