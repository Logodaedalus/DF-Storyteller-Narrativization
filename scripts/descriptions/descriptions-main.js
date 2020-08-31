//---------------------------------------------------------------
//main templating function that kicks off processing based on event type
//check here for info: https://github.com/Kromtec/LegendsViewer/tree/master/LegendsViewer/Legends/Events
async function historical_event_desc(historicalEvent){

	// Add year
	var eventDesc = `In the year ${historicalEvent.year}, `;
	// Look at the type and select the right string
	switch(historicalEvent.type) {
		case "change_hf_job":
			eventDesc += await change_hf_job_desc(historicalEvent);
		break;
		case "change_hf_state":
			eventDesc += await change_hf_state_desc(historicalEvent);
		break;
		case "hf_died":
			eventDesc += await hf_died_desc(historicalEvent);
		break;
		case "hf_relationship":
			eventDesc += await hf_relationship_desc(historicalEvent);
		break;
		default:
			eventDesc += `Unknown Event: ${historicalEvent.type}`;
		break;
	}

	return eventDesc;

}

/*
Accepts a string URL, returns an object
apiUrl: "historical_events/275"
returns: { data object }
*/
//TODO: detect if returned value is "doesn't exist" and if so, return unknown data object
// function load_ref_data(apiUrl) {

// 	var unknownSite = {					//default object for unknown sites
// 		id: -1,
// 		type: "place",
// 		name: "an unknown place",
// 		structures: [],
// 		site_properties: [],
// 		civ_id: null,
// 		cur_owner_id: null
// 	}

// 	switch(apiUrl){
// 		case "sites/-1":
// 		return unknownSite;
// 		break;
// 	};

// 	var base_url = "http://localhost:20350";

// 	fetch(`${base_url}/api/${apiUrl}`)
// 		.then(function (response) {
// 			// Get a JSON object from the response
// 			// This is a weird quirk of Fetch
// 			return response.json();
// 		}).then(function (data) {

// 	 		// Cache the data to a variable
// 	 		return data;

// 		}).catch(function (error) {
// 			// if there's an error, log it
// 			console.log(error);
// 		});
// }

async function load_ref_data(apiUrl) {
	var unknownSite = {					//default object for unknown sites
		id: -1,
		type: "place",
		name: "an unknown place",
		structures: [],
		site_properties: [],
		civ_id: null,
		cur_owner_id: null
	}

	switch(apiUrl){
		case "sites/-1":
		return unknownSite;
		break;
	};

	var base_url = "http://localhost:20350";

	var response = await fetch(`${base_url}/api/${apiUrl}`);
	var data = await response.json();

	if (data.name) {
		data.name = formatName(data.name);
	}
	return data;
}

function display_all_he_info(he) {
	// Display the json
    var he_all_info = document.getElementById("he_all_info");
    he_all_info.innerHTML = JSON.stringify(he, null, 4);
}


