//---------------------------------------------------------------
async function hf_relationship_desc(he) {

	var source_hf = await load_ref_data(`historical_figures/${he.source_hf_id}`);     //load historical figure data
    var target_hf = await load_ref_data(`historical_figures/${he.target_hf_id}`);

    // await source_hf;
    // await target_hf;

    if (source_hf.name !== null) { source_hf.name = formatName(source_hf.name); }
    else {source_hf.name = "a mysterious stranger";}
    if (target_hf.name !== null) { target_hf.name = formatName(target_hf.name); }
    else {target_hf.name = "a mysterious stranger";}


    source_hf.pronouns = getPronouns(source_hf.caste);
    target_hf.pronouns = getPronouns(target_hf.caste);

    var eventDesc = "";

	switch (he.relationship) {
		case "mother":
			eventDesc = `${source_hf.name} became the proud mother of ${target_hf.name}.`;
			break;
		case "father":
			eventDesc = `${source_hf.name} became the proud father of ${target_hf.name}.`;
			break;
		case "spouse":
			eventDesc = `${source_hf.name} and ${target_hf.name} were married.`;
			break;
		//TODO: is adoption a thing? Check if birth year matches event year?
		case "child":
			eventDesc = `${source_hf.name} became the child of ${target_hf.name}.`;
			break;
		case "deity":
			eventDesc = `${source_hf.name} became a fervant worshipper of ${target_hf.name}.`;
			break;
		case "lover":
			eventDesc = `${source_hf.name} and ${target_hf.name} became lovers.`;
			if (source_hf.name == "a mysterious stranger" && target_hf.name == "a mysterious stranger") {
				eventDesc = "two people unknown to history became lovers.";
			}
			break;
		case "former_lover":
			eventDesc = `${source_hf.name} and ${target_hf.name} broke off their romantic entanglement.`;
			break;
		case "prisoner":
			eventDesc = `${source_hf.name} was imprisoned by ${target_hf.name}.`;
			break;
		case "imprisoner":
			eventDesc = `${source_hf.name} imprisoned ${target_hf.name}.`;
			break;
		//TODO: would be great to check for skill increases (if possible) after this to find out what they were apprenticed for?
		case "master":
			eventDesc = `${source_hf.name} became ${target_hf.name}'s master.`;
			break;
		case "apprentice":
			eventDesc = `${source_hf.name} became ${target_hf.name}'s apprentice.`;
			break;
		case "companion":
			eventDesc = `${source_hf.name} became a trusty companion of ${target_hf.name}.`;
			break;
		//TODO: would be great to find out if there are different reasons these end, and update accordingly
		case "former_master":
			eventDesc = `${target_hf.name} ended ${target_hf.pronouns.their} apprenticeship under ${source_hf.name}.`;
			break;
		case "former_apprentice":
			eventDesc = `${source_hf.name} ended ${source_hf.pronouns.their} apprenticeship under ${target_hf.name}.`;
			break;
		case "pet_owner":
			eventDesc = `${source_hf.name} adopted ${target_hf.name} as a pet.`;
			break;
		case "former_spouse":
			eventDesc = `${source_hf.name} divorced their partner ${target_hf.name}.`;
			break;
		case "deceased_spouse":
			var term;
			if (source_hf.caste == "male") { eventDesc = `${source_hf.name} became a widower.`; }
			else if (source_hf.caste == "female") { eventDesc = `${source_hf.name} was widowed.`; }
			else { eventDesc = `${source_hf.name}'s partner died.`}
			break;
		//-----all cases below are "vague relationships"...not sure what that means??
		case "war_buddy": 
			eventDesc = `${source_hf.name} and ${target_hf.name} became war buddies.`;
			break;
        case "athlete_buddy":
        	eventDesc = `${source_hf.name} and ${target_hf.name} bonded over feats of athleticism.`;
        	break;
        case "childhood_friend":
        	eventDesc = `${source_hf.name} and ${target_hf.name} became childhood friends.`;
        	break;
        case "persecution_grudge":
        	eventDesc = `${source_hf.name} came to hate ${target_hf.name} due to ${target_hf.pronouns.their} unending persecution.`;
        	break;
        case "supernatural_grudge":
        	eventDesc = `${source_hf.name} formed a supernatural grudge against ${target_hf.name}.`;
        	break;
        case "religious_persecution_grudge":
        	eventDesc = `${source_hf.name} came to hate ${target_hf.name} due to ${target_hf.pronouns.their} relentless religious persecution.`;
        	break;
        case "artistic_buddy":
        	eventDesc = `${source_hf.name} and ${target_hf.name}'s common interest in art kindled to friendship.`;
        	break;
        case "jealous_obsession":
	        eventDesc = `${source_hf.name} became jealously obsessed with ${target_hf.name}.`
	        break;
        case "grudge":
        	eventDesc = `${source_hf.name} formed a grudge against ${target_hf.name}.`;
        	break;
        case "jealous_relationship_grudge":
        	eventDesc = `${source_hf.name}, jealous of ${target_hf.name}'s relationships, formed a grudge against ${target_hf.pronouns.them}.`;
        	break;
        case "scholar_buddy":
        	eventDesc = `${source_hf.name} and ${target_hf.name} bonded over their common interest in scholarly matters.`;
        	break;
        case "business_rival":
        	eventDesc = `${source_hf.name} and ${target_hf.name} became fierce business rivals.`;
        	break;
        case "atheletic_rival": 		//this is misspelled but is the correct key value
        	eventDesc = `${source_hf.name} and ${target_hf.name} became heated athletic rivals.`;
        	break;
        default:
		console.error("unhandled relationship type '" + he.relationship);
		eventDesc = `${source_hf.name} formed some kind of relationship with ${target_hf.name}`;
		break;
	}

    return eventDesc;		

    
}