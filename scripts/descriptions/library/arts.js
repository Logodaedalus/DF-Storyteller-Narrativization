function dance_form_created_desc(he) {

	return "unwritten event type: dance_form_created"
}

function musical_form_created_desc(he) {

	return "unwritten event type: musical_form_created"
}

function performance_desc(he) {

	return "unwritten event type: performance"
}

function poetic_form_created_desc(he) {

	return "unwritten event type: poetic_form_created"
}

function written_content_composed_desc(he) {

	var eventDesc = "";

	var author = await load_ref_data(`historical_figures/${he.hf_id}`);     //load historical figure data
    author.name = formatName(author.name);

    var work = await load_ref_data(`written_contents/${he.wc_id}`);

/*	if (he.reason == "glorify hf") {
        GlorifiedHf = world.GetHistoricalFigure(ReasonId);
        GlorifiedHf.AddEvent(this);
    }
    if (he.circumstance == "pray to hf" || he.circumstance == "dream") {
        CircumstanceHf = world.GetHistoricalFigure(CircumstanceId);
        if (GlorifiedHf != null && GlorifiedHf != CircumstanceHf)
        {
            CircumstanceHf.AddEvent(this);
        }
    }

    if (work.id == -1) {
    	eventString += "some unknown text";
    } else {
    	eventString += "work."
    }
    eventString +=  ? WrittenContent.ToLink(link, pov, this) : "Some unknown text";
    eventString += ` was authored by ${author}`;
    if (he.site_id != null)
    {
        eventString += " in ";
        eventString += Site.ToLink(link, pov, this);
    }
    if (GlorifiedHf != null)
    {
        eventString += " in order to glorify " + GlorifiedHf.ToLink(link, pov, this);
    }
    if (!string.IsNullOrWhiteSpace(Circumstance))
    {
        if (CircumstanceHf != null)
        {
            switch (Circumstance)
            {
                case "pray to hf":
                    eventString += " after praying to " + CircumstanceHf.ToLink(link, pov, this);
                    break;
                case "dream about hf":
                    eventString += " after dreaming of " + CircumstanceHf.ToLink(link, pov, this);
                    break;
            }
        }
        else
        {
            eventString += " after a " + Circumstance;
        }
    }
    */
    eventString += ".";
    return eventString;



	return eventDesc;
}