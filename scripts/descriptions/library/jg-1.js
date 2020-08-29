
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
//TODO: get name of where they died...is subregion_id the same as a region id???
async function hf_died_desc(he) {

	var hf = await load_ref_data(`historical_figures/${he.hf_id}`);     //load historical figure data

	var eventDesc = "";

	var deathCause = formatDeathCause(he.death_cause);
	var slayer_race = he.slayer_race.toLowerCase();
	eventDesc += `${hf.name} was ${deathCause} by the ${slayer_race} ${he.slayer_hf_id} in ${he.subregion_id}`;
	
   eventDesc += "."

	return eventDesc;

	// switch(property.Name)
   //              {
   //                  case "slayer_item_id": SlayerItemID = Convert.ToInt32(property.Value); break;
   //                  case "slayer_shooter_item_id": SlayerShooterItemID = Convert.ToInt32(property.Value); break;
   //                  case "cause": switch (property.Value)
   //                      {
   //                          case "hunger": Cause = DeathCause.Starved; break;
   //                          case "struck": Cause = DeathCause.Struck; break;
   //                          case "murdered": Cause = DeathCause.Murdered; break;
   //                          case "old age": Cause = DeathCause.OldAge; break;
   //                          case "dragonfire": Cause = DeathCause.DragonsFire; break;
   //                          case "shot": Cause = DeathCause.Shot; break;
   //                          case "fire": Cause = DeathCause.Burned; break;
   //                          case "thirst": Cause = DeathCause.Thirst; break;
   //                          case "air": Cause = DeathCause.Suffocated; break;
   //                          case "blood": Cause = DeathCause.Bled; break;
   //                          case "cold": Cause = DeathCause.Cold; break;
   //                          case "crushed bridge": Cause = DeathCause.CrushedByABridge; break;
   //                          case "drown": Cause = DeathCause.Drowned; break;
   //                          case "infection": Cause = DeathCause.Infection; break;
   //                          case "obstacle": Cause = DeathCause.CollidedWithAnObstacle; break;
   //                          case "put to rest": Cause = DeathCause.PutToRest; break;
   //                          case "quitdead": Cause = DeathCause.StarvedQuit; break;
   //                          case "trap": Cause = DeathCause.Trap; break;
   //                          case "crushed": Cause = DeathCause.CaveIn; break;
   //                          case "cage blasted": Cause = DeathCause.InACage; break;
   //                          case "freezing water": Cause = DeathCause.FrozenInWater; break;
   //                          case "exec fed to beasts": Cause = DeathCause.ExecutedFedToBeasts; break;
   //                          case "exec burned alive": Cause = DeathCause.ExecutedBurnedAlive; break;
   //                          case "exec crucified": Cause = DeathCause.ExecutedCrucified; break;
   //                          case "exec drowned": Cause = DeathCause.ExecutedDrowned; break;
   //                          case "exec hacked to pieces": Cause = DeathCause.ExecutedHackedToPieces; break;
   //                          case "exec buried alive": Cause = DeathCause.ExecutedBuriedAlive; break;
   //                          case "exec beheaded": Cause = DeathCause.ExecutedBeheaded; break;
   //                          case "blood drained": Cause = DeathCause.DrainedBlood; break;
   //                          case "collapsed": Cause = DeathCause.Collapsed; break;
   //                          case "scared to death": Cause = DeathCause.ScaredToDeath; break;
   //                          case "scuttled": Cause = DeathCause.Scuttled; break;
   //                          default: Cause = DeathCause.Unknown; UnknownCause = property.Value; world.ParsingErrors.Report("Unknown Death Cause: " + UnknownCause); break;
   //                      } break;
   //                  case "slayer_race": SlayerRace = Formatting.FormatRace(property.Value); break;
   //                  case "slayer_caste": SlayerCaste = property.Value; break;
   //                  case "hfid": HistoricalFigure = world.GetHistoricalFigure(Convert.ToInt32(property.Value)); break;
   //                  case "slayer_hfid": Slayer = world.GetHistoricalFigure(Convert.ToInt32(property.Value)); break;
   //                  case "site_id": Site = world.GetSite(Convert.ToInt32(property.Value)); break;
   //                  case "subregion_id": Region = world.GetRegion(Convert.ToInt32(property.Value)); break;
   //                  case "feature_layer_id": UndergroundRegion = world.GetUndergroundRegion(Convert.ToInt32(property.Value)); break;
   //              }
   //              HistoricalFigure.AddEvent(this);
   //          if (HistoricalFigure.DeathCause == DeathCause.None)
   //              HistoricalFigure.DeathCause = Cause;
   //          if (Slayer != null)
   //          {
   //              Slayer.AddEvent(this);
   //              Slayer.NotableKills.Add(this);
   //          }
   //          Site.AddEvent(this);
   //          Region.AddEvent(this);
   //          UndergroundRegion.AddEvent(this);
   //      }
   //      public override string Print(bool link = true, DwarfObject pov = null)
   //      {
   //          string eventString = this.GetYearTime() + HistoricalFigure.ToLink(link, pov) + " ";
   //          string deathString = "";
   //          if (Cause == DeathCause.Thirst) deathString = "died of thirst";
   //          else if (Cause == DeathCause.OldAge) deathString = "died of old age";
   //          else if (Cause == DeathCause.Suffocated) deathString = "suffocated";
   //          else if (Cause == DeathCause.Bled) deathString = "bled to death";
   //          else if (Cause == DeathCause.Cold) deathString = "froze to death";
   //          else if (Cause == DeathCause.CrushedByABridge) deathString = "was crushed by a drawbridge";
   //          else if (Cause == DeathCause.Drowned) deathString = "drowned";
   //          else if (Cause == DeathCause.Starved) deathString = "starved to death";
   //          else if (Cause == DeathCause.Infection) deathString = "succumbed to infection";
   //          else if (Cause == DeathCause.CollidedWithAnObstacle) deathString = "died after colliding with an obstacle";
   //          else if (Cause == DeathCause.PutToRest) deathString = "was put to rest";
   //          else if (Cause == DeathCause.StarvedQuit) deathString = "starved";
   //          else if (Cause == DeathCause.Trap) deathString = "was killed by a trap";
   //          else if (Cause == DeathCause.CaveIn) deathString = "was crushed under a collapsing ceiling";
   //          else if (Cause == DeathCause.InACage) deathString = "died in a cage";
   //          else if (Cause == DeathCause.FrozenInWater) deathString = "was incased in ice";
   //          else if (Cause == DeathCause.Scuttled) deathString = "was scuttled";
   //          else if (Cause == DeathCause.Unknown) deathString = "died (" + UnknownCause + ")";

   //          if (Slayer != null || SlayerRace != "UNKNOWN")
   //          {
   //              string slayerString;
   //              if (Slayer == null) slayerString = " a " + SlayerRace.ToLower();
   //              else slayerString = Slayer.ToLink(link, pov);

   //              if (Cause == DeathCause.DragonsFire) deathString = "burned up in " + slayerString + "'s dragon fire";
   //              else if (Cause == DeathCause.Burned) deathString = "was burned to death by " + slayerString + "'s fire";
   //              else if (Cause == DeathCause.Murdered) deathString = "was murdered by " + slayerString;
   //              else if (Cause == DeathCause.Shot) deathString = "was shot and killed by " + slayerString;
   //              else if (Cause == DeathCause.Struck) deathString = "was struck down by " + slayerString;
   //              else if (Cause == DeathCause.ExecutedBuriedAlive) deathString = "was buried alive by " + slayerString;
   //              else if (Cause == DeathCause.ExecutedBurnedAlive) deathString = "was burned alive by " + slayerString;
   //              else if (Cause == DeathCause.ExecutedCrucified) deathString = "was crucified by " + slayerString;
   //              else if (Cause == DeathCause.ExecutedDrowned) deathString = "was drowned by " + slayerString;
   //              else if (Cause == DeathCause.ExecutedFedToBeasts) deathString = "was fed to beasts by " + slayerString;
   //              else if (Cause == DeathCause.ExecutedHackedToPieces) deathString = "was hacked to pieces by " + slayerString;
   //              else if (Cause == DeathCause.ExecutedBeheaded) deathString = "was beheaded by " + slayerString;
   //              else if (Cause == DeathCause.DrainedBlood) deathString = "was drained of blood by " + slayerString;
   //              else if (Cause == DeathCause.Collapsed) deathString = "collapsed, struck down by " + slayerString;
   //              else if (Cause == DeathCause.ScaredToDeath) deathString = " was scared to death by " + slayerString;
   //              else deathString += ", slain by " + slayerString;
   //          }

   //          eventString += deathString;

   //          if (SlayerItemID >= 0) eventString += " with a (" + SlayerItemID + ")";
   //          else if (SlayerShooterItemID >= 0) eventString += " with a (shot) (" + SlayerShooterItemID + ")";

   //          if (Site != null) eventString += " in " + Site.ToLink(link, pov);
   //          else if (Region != null) eventString += " in " + Region.ToLink(link, pov);
   //          else if (UndergroundRegion != null) eventString += " in " + UndergroundRegion.ToLink(link, pov);
   //          eventString += ". ";
}