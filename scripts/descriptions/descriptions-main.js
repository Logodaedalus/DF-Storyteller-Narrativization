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
		case "creature_devoured":
			eventDesc += await creature_devoured_desc(historicalEvent);
			break;
		case "written_content_composed":
			eventDesc += await written_content_composed_desc(historicalEvent);
			break;
		case "add_hf_entity_link":
			eventDesc += await add_hf_entity_link_desc(historicalEvent);
			break;
		case "hf_simple_battle_event":
			eventDesc += await hf_simple_battle_event_desc(historicalEvent);
			break;
		default:
			eventDesc += `Unknown Event: ${historicalEvent.type}`;
		break;
	}

	return eventDesc;

}

async function load_ref_data(apiUrl) {

	var formatResult = true;

	var unknownSite = {					//default object for unknown sites
		id: -1,
		type: "place",
		name: "an unknown place",
		structures: [],
		site_properties: [],
		civ_id: null,
		cur_owner_id: null
	}

	var unknownWork = {
		id:-1,
		title: "some unknown work",
		author_hf_id : "an anonymous author",
		form: "an unknown form"
	}

	var unknownHf = {					//default object for unknown sites
		id: -1,
		name: "an unknown person",
		race: "an unknown race",
		caste: "default"
	}

	switch(apiUrl){
		case "sites/-1":
			return unknownSite;
			break;
		case "written_contents/-1":
			return unknownWork;
			break;
		case "historical_figures/-1":
			return unknownHf;
			break;
	};

	var base_url = "http://localhost:20350";

	var response = await fetch(`${base_url}/api/${apiUrl}`);
	var data = await response.json();

	if (data.name) { data.name = formatName(data.name); }
	return data;
}

function display_all_he_info(he) {
	// Display the json
    var he_all_info = document.getElementById("he_all_info");
    he_all_info.innerHTML = JSON.stringify(he, null, 4);
}


