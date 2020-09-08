function artifact_claim_formed_desc(length) {

	return "unwritten event type: artifact_claim_formed"
}

function artifact_copied_desc(length) {

	return "unwritten event type: artifact_copied"
}

async function artifact_created_desc(he) {

	var eventDesc = "";

  var creator = await load_ref_data(`historical_figures/${he.creator_hf_id}`);
  var artifact = await load_ref_data(`artifacts/${he.artifact_id}`);
  var site = await load_ref_data(`sites/${he.site_id}`);

  creator.name = creator.name !== null ? formatName(creator.name) : "an unknown person";

  // item_types can contain underscores, item_subtypes do not
  var itemType = artifact.item_subtype !== null ? artifact.item_subtype : format(artifact.item_type);
  itemType = artifact.item_mat !== null ? artifact.item_mat + " " + itemType : itemType;

  if (he.name_only) {
  	// artifact wasn't created, it just got named (for having a long kill list)
  	eventDesc += `${creator.name} named ${getPronouns(creator.caste).their} ${itemType} '${artifact.name}'`
  	if (he.site_id>-1 && site.name !== null) eventDesc += ` in ${site.name}`;
  } else {
  	eventDesc += `${creator.name} created ${a_an(itemType)}`;
  	if (artifact.name !== null) eventDesc += ` called '${artifact.name}'`;
  	if (he.site_id>-1 && site.name !== null) eventDesc += ` in ${site.name}`;
	}

	return eventDesc + ".";
}

function artifact_destroyed_desc(length) {

	return "unwritten event type: artifact_destroyed"
}

function artifact_found_desc(length) {

	return "unwritten event type: artifact_found"
}

function artifact_given_desc(length) {

	return "unwritten event type: artifact_given"
}

function artifact_lost_desc(length) {

	return "unwritten event type: artifact_lost"
}

function artifact_possessed_desc(length) {

	return "unwritten event type: artifact_possessed"
}

function artifact_recovered_desc(length) {

	return "unwritten event type: artifact_recovered"
}

function artifact_stored_desc(length) {

	return "unwritten event type: artifact_stored"
}

function hf_viewed_artifact_desc(length) {

	return "unwritten event type: hf_viewed_artifact"
}