# DF-Storyteller-Narrativization
Collection of JS files for use with [DF Storyteller](https://dfstoryteller.com/) to narrativize events

# How To See
1. Download [DF Storyteller](https://dfstoryteller.com/)
2. Download this repo (I assume all files are in a folder named "DF-Storyteller-Narrativization") and stick it in DF Storyteller's "serve-paintings" folder
3. Generate a Legends file using DFHack (or unzip the one I put in the repo and use that one)
3. Follow all [the instructions for DF Storyteller](https://guide.dfstoryteller.com/) to get the server started (processing legends file, etc)
4. Point yer browser to http://127.0.0.1:20350/paintings/DF-StoryTeller-Narrativization

# How To Make
1. Check out the [Progress Spreadsheet](https://docs.google.com/spreadsheets/d/1zibCyKqFcGRJJAd8bNuZajhuvU5_9NBSVnEu0V_6JDU/edit?usp=sharing)
2. Pick an event type / event types you wanna do
3. Put your name in the "Who's Working On It?" column
4. If it's not one of the already-made files, make a new file (either grouped by theme somehow, or put your initials and a number, like `jg-1.js`)
5. Write your description! If you have general utility functions (name formatting, etc) add them to `description-utils.js` so everyone can find them!
6. Function example:
```
async function hf_attacked_site_desc(length) {
  var site = await load_ref_data(`sites/${he.site_id}`);           //this is how you load data for the event's site (he.site_id)
  site.name = formatName(site.name)                             //this is how you call a formatter (in description-utils.js)
  eventDesc = `Some jerk attacked ${site.name}.`;
  return eventDesc;
}
```

7. Add your new function call to the switch case in `descriptions-main.js:historical_event_desc()`. Example:
```
switch(historicalEvent.type) {
    ...buncha cases in here....
    case "change_hf_job":       //your cool new event
      eventDesc += await hf_attacked_site_desc(historicalEvent);
      break;
    default:                    //the end of the cases
      eventDesc += `Unknown Event: ${historicalEvent.type}`;
      break;
```
8. If you are adding a new file, make sure you add it to the "pattern libraries" section at the top of `index.html`!
9. Commit after making sure it doesn't break stuff
10. Mark the spreadsheet green because you did it, thanks!

# Requested Style

* Event descriptions should be relatively self-contained, and shouldn't rely heavily (if at all) on other events.
* The idea is to first put in a one-event baseline, then build up with more elaborate story scaffolds after that's established.
* For example: "Thorkron was strangled by Beedle the goblin" is what we're doing now. Later (soon?) we'll do scaffolds so we can do "Beedle the goblin strangled Thorkon, finally getting revenge for his poor murdered brother."
