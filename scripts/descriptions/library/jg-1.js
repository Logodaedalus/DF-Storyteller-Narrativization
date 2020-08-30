
async function change_hf_job_desc(he) {

	var site = await load_ref_data(`sites/${he.site_id}`);           //load data for the event's site (he.site_id)
	var hf = await load_ref_data(`historical_figures/${he.hf_id}`);  //load data for the historical figure (he.hf_id)

	var eventDesc = "";      //create a blank string

	he.new_job = formatJob(he.new_job);         //run formatter on job (in description-utils)
	he.old_job = formatJob(he.old_job);         //run formatter on job (in description-utils)

	if(he.new_job == "standard") {              //create text
		eventDesc += `${hf.name} stopped being a ${he.old_job} in ${site.name}`;
	} else if (he.old_job == "standard"){
		eventDesc += `${hf.name} became a ${he.new_job} in ${site.name}`;
	} else {
		eventDesc += `${hf.name} gave up being a ${he.old_job} to become a ${he.new_job} in ${site.name}`;
	}

   eventDesc += "."

	return eventDesc;
}
//---------------------------------------------------------------
async function change_hf_state_desc(he) {

	var site = await load_ref_data(`sites/${he.site_id}`);              //load data for the event's site (he.site_id)
	var hf = await load_ref_data(`historical_figures/${he.hf_id}`);     //load data for the historical figure (he.hf_id)

	var eventDesc = "";

	switch(he.state){
		case "settled":
			eventDesc += `${hf.name} settled in ${site.name}`;
			break;
		case "wandering":
			eventDesc += `${hf.name} began wandering the world`;	//TODO: why?
			break;
		case "scouting":
			eventDesc += `${hf.name} began scouting around ${site.name}`;		//TODO: scouting where? why?
			break;
		case "snatcher":
			eventDesc += `${hf.name} started looking for someone to abduct`;	//TODO: why?	
			break;
		case "refugee":
			eventDesc += `${hf.name} became a refugee`;	//TODO: of what conflict? Why?
			break;
		case "thief":
			eventDesc += `${hf.name} became a thief`;
			break;
		case "hunting":
			eventDesc += `${hf.name} starting hunting for game around ${site.name}`;	//TODO: biome-specific?
			break;
		default:
			eventDesc += `${hf.name} changed their state in some unknown way`;
			break;
	};

   eventDesc += "."

	return eventDesc;
}
//---------------------------------------------------------------
//It appears this event type doesn't contain the "relationship" field necessary to figure out what the hell is going on??
//But hf_relationship_denied does???
async function hf_relationship_desc(he) {

    var source_hf = await load_ref_data(`historical_figures/${he.source_hf_id}`);     //load historical figure data
    source_hf.name = formatName(source_hf.name);
    var target_hf = await load_ref_data(`historical_figures/${he.target_hf_id}`);
    target_hf.name = formatName(target_hf.name);

    return `${source_hf.name} formed some kind of relationship with ${target_hf.name}`;
}
//---------------------------------------------------------------
//TODO: get name of where they died...is subregion_id the same as a region id???
async function hf_died_desc(he) {

	var hf = await load_ref_data(`historical_figures/${he.hf_id}`);     //load historical figure data
    hf.name = formatName(hf.name);
    hf.pronouns = getPronouns(hf.caste);

    if (he.slayer_race !== undefined) {      //if hf was killed...

        var slayer;
        if (he.slayer_hf_id > -1) {
            slayer = await load_ref_data(`historical_figures/${he.slayer_hf_id}`)     //load slayer data
            slayer.name = formatName(slayer.name);
        }
        else {
            slayer = {
                name : "an unknown " + he.slayer_race.toLowerCase(),
                caste : "nb",
            }
        }
        
        slayer.pronouns = getPronouns(slayer.caste);

        switch(he.death_cause) {        //TODO: find out if it would be good to put race in here (undead, monster, etc)

            case "dragons_fire":
                eventDesc = `${hf.name} was incinerated by a blast of fire from ${slayer.name}.`;
                break;
            case "burned":
                eventDesc = `${hf.name} was burned to death by ${slayer.name}'s fire.`;
                break;
            case "murdered":
                eventDesc = `${hf.name} was cruelly murdered by ${slayer.name}`;
                break
            case "shot":
                eventDesc = `${hf.name} was shot by ${slayer.name}`;
                break;
            case "struck_down":
                eventDesc = `${hf.name} was struck down by ${slayer.name}`;
                break;
            case "executed_buried_alive":
                eventDesc = `${hf.name} was buried alive by ${slayer.name} for ${hf.pronouns.their} crimes`;
                break;
            case "executed_burned_alive":
                eventDesc = `${hf.name} was burned alive by ${slayer.name} for ${hf.pronouns.their} crimes`;
                break;
            case "executed_crucified":
                eventDesc = `${hf.name} was crucified by ${slayer.name} for ${hf.pronouns.their} crimes`;
                break;
            case "executed_drowned":
                eventDesc = `${hf.name} was drowned by ${slayer.name} for ${hf.pronouns.their} crimes`;
                break;
            case "executed_fed_to_beasts":
                eventDesc = `${hf.name} was fed to beasts by ${slayer.name} for ${hf.pronouns.their} crimes`;
                break;
            case "executed_hacked_to_pieces":
                eventDesc = `${hf.name} was hacked to pieces by ${slayer.name} for ${hf.pronouns.their} crimes`;
                break;
            case "executed_beheaded":
                eventDesc = `${hf.name} was buried alive for ${hf.pronouns.their} crimes`;
                break;
            case "drained_blood":
                eventDesc = `${hf.name} was drained of ${hf.pronouns.their} blood by ${slayer.name}`;
                break;
            case "collapsed":
                eventDesc = `${hf.name} collapsed, succumbing to wounds inflicted by ${slayer.name}`;
                break;
            case "scared_to_death":
                eventDesc = `${hf.name} was scared to death by  ${slayer.name}`;
                break;
            default:
                console.error("unhandled death type: " + he.death_cause + " for " + he.id);
                eventDesc = `${hf.name} was slain by ${slayer.name}.`;
                break;
        }

        if (he.SlayerItemID >= 0) {
            eventDesc += " using a (" + he.SlayerItemID + ")";         //TODO: how do we get the item name???
        }
        else if (he.SlayerShooterItemID >= 0) {
            eventDesc += " with a shot from a (" + he.SlayerShooterItemID + ")";
        }
        else {
            eventDesc += ".";
        }

    }

   else {      //if they died some other way...

        switch(he.death_cause) {
            case "thirst":
                eventDesc = `${hf.name} died of thirst`;
                break;
            case "old_age":
                if (hf.birth_year !== -1 && hf.death_year !== -1) {
                    eventDesc = `${hf.name} died naturally at the ripe age of ${Math.abs(hf.death_year - hf.birth_year)}`;
                } else {
                    eventDesc = `${hf.name} died naturally of old age`
                }
                break;
            case "suffocated":
                eventDesc = `${hf.name} suffocated`;
                break;
            case "bled":
                eventDesc = `${hf.name} bled to death`;                     //TODO: get wounds caused by
                break;
            case "cold":
                eventDesc = `${hf.name} froze to death`;
                break;
            case "crushed_by_a_bridge":
                eventDesc = `${hf.name} was crushed by a lowering drawbridge`;          //TODO: get site of drawbridge
                break;
            case "drowned":
                eventDesc = `${hf.name} drowned`;           //TODO: get name of water body
                break;
            case "starved":
                eventDesc = `${hf.name} starved to death`;
                break;
            case "infection":
                eventDesc = `${hf.name} succumbed to infection`;        //TODO: find out if being treated / what disease if possible?
                break;
            case "collided_with_an_obstacle":
                eventDesc = `${hf.name} died after smashing into something`;
                break;
            case "put_to_rest":
                eventDesc = `${hf.name} was laid to rest`;
                break;
            case "starved_quit":
                eventDesc = `${hf.name} starved to death`;
                break;
            case "trap":
                eventDesc = `${hf.name} was killed by a clever trap`;
                break;
            case "cave_in":
                eventDesc = `${hf.name} was crushed by falling rocks`;          //TODO: find out if in fortress or not
                break;
            case "in_a_cage":
                eventDesc = `${hf.name} died confined in a cage`;
                break;
            case "frozen_in_water":
                eventDesc = `${hf.name} died after being encased in ice `;
                break;
            case "scuttled":
                eventDesc = `${hf.name} was scuttled`;
                break;
            default:
                console.error("unhandled death type: " + he.death_cause + " for " + he.id);
                eventDesc = `${hf.name} died of some unknown cause`;
                break;
        }

        eventDesc += ".";
   }
   
	return eventDesc;
}