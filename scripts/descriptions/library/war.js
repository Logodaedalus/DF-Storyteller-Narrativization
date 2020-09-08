async function attacked_site_desc(he, length) {

	return "unwritten event type: attacked_site"
}

async function destroyed_site_desc(he, length) {

	return "unwritten event type: destroyed_site"
}

async function field_battle_desc(he, length) {

	return "unwritten event type: field_battle"
}

async function hf_attacked_site_desc(he, length) {

	return "unwritten event type: hf_attacked_site"
}

async function hf_destroyed_site_desc(he, length) {

	return "unwritten event type: hf_destroyed_site"
}

async function hf_simple_battle_event_desc(he, length) {

	var group1 = await load_ref_data(`historical_figures/${he.group_1_hf_id}`);     //load historical figure data
	group1.name = formatName(group1.name);
	var group2 = await load_ref_data(`historical_figures/${he.group_2_hf_id}`);     //load historical figure data
	group2.name = formatName(group2.name);

	var eventDesc = "";

	switch(he.subtype) {
		case "attacked":
			eventDesc += `${group1.name} attacked ${group2.name}`;
			break;
        case "scuffle":
        	eventDesc += `${group1.name} scuffled with ${group2.name}`;
        	break;
        case "confront":
        	eventDesc += `${group1.name} confronted ${group2.name}`;
        	break;
        case "2 lost after receiving wounds":
        	eventDesc += `${group1.name} defeated ${group2.name}, inflicting serious wounds upon ${getPronouns(group2.caste).them}`;
        break;
        case "2 lost after giving wounds":
        	eventDesc += `${group1.name} defeated ${group2.name}, but was wounded badly in the fight`;
        break;
        case "2 lost after mutual wounds":
        	eventDesc += `${group1.name} defeated ${group2.name}, after serious wounds were inflicted on both`;
        break;
        case "happen upon":
        	eventDesc += `${group1.name} happened upon ${group2.name}`;
        break;
        case "ambushed":
        	eventDesc += `${group1.name} ambushed ${group2.name}`;
        break;
        case "corner":
        	eventDesc += `${group1.name} cornered ${group2.name}`;
        break;
        case "surprised":
        	eventDesc += `${group1.name} surprised ${group2.name}`;
        break;
        case "got into a brawl":
        	eventDesc += `${group1.name} got into a brawl with ${group2.name}`;
        break;
        case "subdued":
        	eventDesc += `${group1.name} subdued ${group2.name}`;
        break;
        default:
        console.error("Unknown battle subtype: " + he.subtype);
        	eventDesc += `${group1.name} encountered ${group2.name}`;
        break;
    }

    eventDesc += ".";
    return eventDesc;
}

async function peace_accepted_desc(he, length) {

	return "unwritten event type: peace_accepted"
}

async function peace_rejected_desc(he, length) {

	return "unwritten event type: peace_rejected"
}

async function razed_structure_desc(he, length) {

	return "unwritten event type: razed_structure"
}

async function site_taken_over_desc(he, length) {

	return "unwritten event type: site_taken_over"
}

async function site_tribute_forced_desc(he, length) {

	return "unwritten event type: site_tribute_forced"
}

async function squad_vs_squad_desc(he, length) {

	return "unwritten event type: squad_vs_squad"
}

async function tactical_situation_desc(he, length) {

	return "unwritten event type: tactical_situation"
}