async function add_hf_entity_honor_desc(length) {

	return "unwritten event type: add_hf_entity_honor"
}


//-------------------------------------------------------------
async function add_hf_entity_link_desc(he, length) {

	var hf = await load_ref_data(`historical_figures/${he.hf_id}`);     //load historical figure data
	hf.name = formatName(hf.name);
	var appointer = await load_ref_data(`historical_figures/${he.appointer_hf_id}`);     //load historical figure data
	var hfActionPromisedTo = await load_ref_data(`historical_figures/${he.promise_to_hf_id}`);     //load historical figure data
	var civ = await load_ref_data(`entities/${he.civ_id}`);

	var eventDesc = "";

	switch(he.link_type) {
		
		case "prisoner":
			eventDesc += `${hf.name} was imprisoned by ${getEntityName(civ, "nameRace")}`;
			break;
		case "enemy":
			eventDesc += `${hf.name} became an enemy of ${getEntityName(civ, "nameRace")}.`;
			break;
		case "member":
			eventDesc += `${hf.name} became a member of ${getEntityName(civ, "nameRace")}.`;
			break;
		case "former member":
			eventDesc += `${hf.name} became a former member of ${getEntityName(civ, "nameRace")}.`;
			break;
		case "slave":
			eventDesc += `${hf.name} was enslaved by ${getEntityName(civ, "nameRace")}`;
			break;
		case "position":
			if (he.position !== undefined) { eventDesc += `${hf.name} was given the position of ${he.position} within ${getEntityName(civ, "nameRace")}.`; }
			else { eventDesc += `${hf.name} was given a new position within ${getEntityName(civ, "nameRace")}.`; }
			break;
		case "squad":
			eventDesc += `${hf.name} became a member of ${getEntityName(civ, "nameRace")}`;
			break;
		default:
			console.error("unhandled link type: " + he.link_type);
			break;
	}
	return eventDesc;
/*

        public string Position { get; set; }
        public int PositionId { get; set; }

        public AddHfEntityLink(List<Property> properties, World world)
            : base(properties, world)
        {
            LinkType = HfEntityLinkType.Unknown;
            PositionId = -1;
            foreach (Property property in properties)
            {
                switch (property.Name)
                {
                    case "civ":
                    case "civ_id":
                        Entity = world.GetEntity(Convert.ToInt32(property.Value));
                        break;
                    case "hfid":
                    case "histfig":
                        HistoricalFigure = world.GetHistoricalFigure(Convert.ToInt32(property.Value));
                        break;
                    case "link":
                    case "link_type":
                        switch (property.Value.Replace("_"," "))
                        {
                            case "position":
                                LinkType = HfEntityLinkType.Position;
                                break;
                            case "prisoner":
                                LinkType = HfEntityLinkType.Prisoner;
                                break;
                            case "enemy":
                                LinkType = HfEntityLinkType.Enemy;
                                break;
                            case "member":
                                LinkType = HfEntityLinkType.Member;
                                break;
                            case "slave":
                                LinkType = HfEntityLinkType.Slave;
                                break;
                            case "squad":
                                LinkType = HfEntityLinkType.Squad;
                                break;
                            case "former member":
                                LinkType = HfEntityLinkType.FormerMember;
                                break;
                            default:
                                world.ParsingErrors.Report("Unknown HfEntityLinkType: " + property.Value);
                                break;
                        }
                        break;
                    case "position": Position = property.Value; break;
                    case "position_id": PositionId = Convert.ToInt32(property.Value); break;
                    case "appointer_hfid": AppointerHf = world.GetHistoricalFigure(Convert.ToInt32(property.Value)); break;
                    case "promise_to_hfid": PromiseToHf = world.GetHistoricalFigure(Convert.ToInt32(property.Value)); break;
                }
            }

            HistoricalFigure.AddEvent(this);
            Entity.AddEvent(this);
            AppointerHf.AddEvent(this);
            if (PromiseToHf != HistoricalFigure)
            {
                PromiseToHf.AddEvent(this);
            }
        }

        public override string Print(bool link = true, DwarfObject pov = null)
        {
            string eventString = GetYearTime();
            if (HistoricalFigure != null)
            {
                eventString += HistoricalFigure.ToLink(link, pov, this);
            }
            else
            {
                eventString += "UNKNOWN HISTORICAL FIGURE";
            }

            switch (LinkType)
            {
                case HfEntityLinkType.Prisoner:
                    eventString += " was imprisoned by ";
                    break;
                case HfEntityLinkType.Slave:
                    eventString += " was enslaved by ";
                    break;
                case HfEntityLinkType.Enemy:
                    eventString += " became an enemy of ";
                    break;
                case HfEntityLinkType.Member:
                    eventString += " became a member of ";
                    break;
                case HfEntityLinkType.FormerMember:
                    eventString += " became a former member of ";
                    break;
                case HfEntityLinkType.Squad:
                case HfEntityLinkType.Position:
                    EntityPosition position = Entity.EntityPositions.FirstOrDefault(pos => pos.Name.ToLower() == Position.ToLower() || pos.Id == PositionId);
                    if (position != null)
                    {
                        string positionName = position.GetTitleByCaste(HistoricalFigure?.Caste);
                        eventString += " became the " + positionName + " of ";
                    }
                    else if(!string.IsNullOrWhiteSpace(Position))
                    {
                        eventString += " became the " + Position + " of ";
                    }
                    else
                    {
                        eventString += " got an honorable position in ";
                    }
                    break;
                default:
                    eventString += " linked to ";
                    break;
            }

            eventString += Entity.ToLink(link, pov, this);
            eventString += PrintParentCollection(link, pov);
            if (AppointerHf != null)
            {
                eventString += ", appointed by ";
                eventString += AppointerHf.ToLink(link, pov, this);
            }
            if (PromiseToHf != null)
            {
                eventString += " as promised to ";
                eventString += PromiseToHf.ToLink(link, pov, this);
            }
            eventString += ".";
            return eventString;
        }

        public string PrintFeature(bool link = true, DwarfObject pov = null)
        {
            string eventString = "";
            eventString += "the ascension of ";
            if (HistoricalFigure != null)
            {
                eventString += HistoricalFigure.ToLink(link, pov, this);
            }
            else
            {
                eventString += "UNKNOWN HISTORICAL FIGURE";
            }

            eventString += " to the position of ";
            if (Position != null)
            {
                EntityPosition position = Entity.EntityPositions.FirstOrDefault(pos => pos.Name.ToLower() == Position.ToLower());
                if (position != null)
                {
                    string positionName = position.GetTitleByCaste(HistoricalFigure?.Caste);
                    eventString += positionName;
                }
                else
                {
                    eventString += Position;
                }
            }
            else
            {
                eventString += "UNKNOWN POSITION";
            }
            eventString += " of ";
            eventString += Entity?.ToLink(link, pov, this) ?? "UNKNOWN ENTITY";
            eventString += " in ";
            eventString += Year;
            return eventString;
*/


	return "unwritten event type: add_hf_entity_honor"
}

async function add_hf_hf_link_desc(length) {

	return "unwritten event type: add_hf_hf_link_desc"
}

async function add_hf_site_link_desc(length) {

	return "unwritten event type: add_hf_site_link_desc"
}

async function remove_hf_entity_link_desc(length) {

	return "unwritten event type: remove_hf_entity_link"
}

async function remove_hf_hf_link_desc(length) {

	return "unwritten event type: remove_hf_hf_link"
}

async function remove_hf_hf_link_desc(length) {

	return "unwritten event type: remove_hf_site_link"
}