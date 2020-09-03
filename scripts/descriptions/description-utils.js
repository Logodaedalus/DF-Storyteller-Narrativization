//---------------------------------------------------------------
//utility function to capitalize proper names correctly
function formatName(name) {
  var i, j, str, lowers, uppers;
  str = name.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
      uppers[i].toUpperCase());

  return str;
}
//---------------------------------------------------------------
function formatJob(job) {

	var formattedJob;

	switch(job) {
		default:
			formattedJob = job.replace(/_/g, " ")
	}


	return formattedJob;
}
//---------------------------------------------------------------

//---------------------------------------------------------------
//processes time from seconds72 to something nice
//There are 12 months in a Dwarf Fortress year, exactly 28 days in each month, 24 hours in each day, 60 minutes in each hour, and 60 seconds in each minute. Divide seconds by 72 to get the seconds72 value. There are 1,200 seconds72 in a day. There are 403,200 seconds72 in a Dwarf Fortress year.
function formatTime(historicalEvent) {

    if (historicalEvent.displayTime != undefined ) {
        return historicalEvent.displayTime;
    }

    var displayTime = {
        year : "a time before time",
        month :  undefined,
        dwarfMonth : undefined,
        day :  undefined,
        season :  undefined,
        fullDate :  "a time before time",
        dwarfFullDate : "a time before time"
    }

    //if it's a known year...
    if (historicalEvent.year >= 0) {
        displayTime.year = historicalEvent.year;
        displayTime.fullDate = `some time in the year ${historicalEvent.year}`;
        displayTime.dwarfFullDate = `some time in the year ${historicalEvent.year}`;
    }
    //if we have both...
    if (historicalEvent.year >=0 && historicalEvent.seconds72 > -1) {
		displayTime.year = historicalEvent.year;
        var seasonFull = "";
        var temp = historicalEvent.seconds72 % 100800;
        if (temp <= 33600) { seasonFull += "early "; }
            else if (temp <= 67200) { seasonFull += "mid"; }
            else if (temp <= 100800) { seasonFull += "late "; }
        var season = historicalEvent.seconds72 % 403200;
        if (season < 100800) { seasonFull += "spring"; }
            else if (season < 201600) { seasonFull += "summer"; }
            else if (season < 302400) { seasonFull += "autumn"; }
            else if (season < 403200) { seasonFull += "winter"; }

        displayTime.season = seasonFull;

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dwarfMonths = ["Granite", "Slate", "Felsite", "Hematite", "Malachite", "Galena", "Limestone", "Sandstone", "Timber", "Moonstone", "Opal", "Obsidian"];

        var monthIndex = 1 + Math.ceil(historicalEvent.seconds72 / (28 * 1200));
        displayTime.month = months[monthIndex];
        displayTime.dwarfMonth = dwarfMonths[monthIndex];
        displayTime.day = 1 + historicalEvent.seconds72 % (28 * 1200) / 1200;

        displayTime.fullDate = `${displayTime.month} ${ordinal(displayTime.day)}, ${displayTime.year}`;
        displayTime.dwarfFullDate = `${displayTime.dwarfMonth} ${ordinal(displayTime.day)}, ${displayTime.year}`;
	}

    historicalEvent.displayTime = displayTime;

    return displayTime;

}
//---------------------------------------------------------------
//formatting function that returns titles with failovers for missing data in a variety of fields
//ie if a "long title" is requested but there isn't data to support it, it will return a short title
// type: title, titleForm, titleFormStyle
function getWorkTitle(work, type) {
//type = title: The Ignited Copper
//type = titleForm: The Ignited Copper, a musical composition
//type = titleFormStyle: Unholinesses: Suddenly The Wind Knows Afterward, a floridly disjointed poem

    var titleType = {
        title : "an unknown work",
        titleForm : "",
        titleFormStyle : "",
    }

    if (work.title != null) { titleType.title = "<em>" + work.title + "</em>"; }

    if (type == "title") { return titleType.title; }
    //----------------------
    //type = titleForm: The Ignited Copper, a musical composition
    //if (work.title == null && work.form == null) { titleType.titleForm = "an unknown work"; }
    //if (work.title != null && work.form == null) { titleType.titleForm = titleType.title; }
    if (work.form == null) { titleType.titleForm = titleType.title; }

    var form = ""

    switch(work.form) {
        case "autobiography":
            form = "autobiography";
            break;
        case "biography":
            form = "biography";
            break;
        case "chronicle":
            form = "chronicle";
            break;
        case "dialog":
            form = "dialog";
            break;
        case "essay":
            form = "essay";
            break;
        case "guide":
            form = "guide";
            break;
        case "letter":
            form = "letter";
            break;
        case "manual":
            form = "manual";
            break;
        case "novel":
            form = "novel";
            break;
        case "play":
            form = "play";
            break;
        case "poem":
            form = "poem";
            break;
        case "short story":
            form = "short story";
            break;
        case "musical composition":
            form = "musical composition";
            break;
        case "choreography":
            form = "choreography";
            break;
        case "cultural history":
            form = "cultural history";
            break;
        case "star chart":
            form = "star chart";
            break;
        case "comparative biography":
            form = "comparative biography";
            break;
        case "cultural comparison":
            form = "cultural comparison";
            break;
        case "atlas":
            form = "atlas";
            break;
        case "treatise on technological evolution":
            form = "treatise on technological evolution";
            break;
        case "alternate history":
            form = "alternate history";
            break;
        case "star catalogue":
            form = "star catalogue";
            break;
        case "dictionary":
            form = "dictionary";
            break;
        case "genealogy":
            form = "genealogy";
            break;
        case "encyclopedia":
            form = "encyclopedia";
            break;
        case "biographical dictionary":
            form = "biographical dictionary";
            break;
        default:
            form = "an unknown form";
            console.error("unknown form " + work.form);
            break;
    }
    
    if (work.title == null && work.form != null) { titleType.titleForm = `an untitled ${form}`; }
    if (work.title != null && work.form != null) { titleType.titleForm = `${titleType.title}, ${a_an(form)}`; }

    if (type == "titleForm") { return titleType.titleForm; }
    //--------------
    //type = titleFormStyle: Unholinesses: Suddenly The Wind Knows Afterward, a floridly disjointed poem
    if (work.title == null && work.form == null && work.style.length == 0) { titleType.titleFormStyle = "an unknown work"; }
    if (work.title == null && work.form != null && work.style.length == 0) { titleType.titleFormStyle = `an untitled ${form}`; }
    if (work.title != null && work.form == null && work.style.length == 0) { titleType.titleFormStyle = titleType.title; }
    if (work.title != null && work.form != null && work.style.length == 0) { titleType.titleFormStyle = titleType.titleForm; }

    var style = "";

    for (var x=0; x < work.style.length; x++) {
        switch(work.style[x].label){
            case "self indulgent":
            work.style[x].label = "self-indulgent";
            case "rant":
            work.style[x].label = "ranting";
        }
    }

    if (work.style.length == 1) { 
        style = work.style[0].label; }
    if (work.style.length > 1) { 
        style = adverbify(work.style[0].label) + " " + work.style[1].label; }

    if (work.title == null && work.form == null && work.style.length > 0) { titleType.titleFormStyle = `${a_an(style)} untitled work`; }
    if (work.title == null && work.form != null && work.style.length > 0) { titleType.titleFormStyle = `${a_an(style)} untitled ${form}`; }
    if (work.title != null && work.form == null && work.style.length > 0) { titleType.titleFormStyle = `${titleType.title}, ${a_an(style)} work`;}
    if (work.title != null && work.form != null && work.style.length > 0) { titleType.titleFormStyle = `${titleType.title}, ${a_an(style)} ${form}`;}

    return titleType.titleFormStyle;
}
//---------------------------------------------------------------
//returns the adjective form of the adverb (used for style descriptions)
function adverbify(adjective) {
    switch(adjective){
        case "meandering":
        return "meanderingly";
        case "cheerful":
        return "cheerfully";
        case "melancholy":
        return "melancholically";
        case "mechanical":
        return "mechanically";
        case "serious":
        return "earnestly";
        case "disjointed":
        return "disjointedly";
        case "florid":
        return "floridly";
        case "forceful":
        return "forcefully";
        case "humorous":
        return "humorously";
        case "puerile":
        return "immaturely";
        case "self-indulgent":      //this is the type "self indulgent" but we format it before this function to "self-indulgent"
        return "self-indulgently";
        case "compassionate":
        return "compassionately";
        case "vicious":
        return "viciously";
        case "concise":
        return "concisely";
        case "sardonic":
        return "sardonically";
        case "witty":
        return "wittily";
        case "ranting":             //this is the type "rant" but we format it before this function to "ranting"
        return "bombastically";
        case "tender":
        return "tenderly";
        default:
        console.error("unhandled adverbification for " + adjective);
        return adjective + "ly";
    }
}
//---------------------------------------------------------------
//--adds "th", "st" to numbers
function ordinal(n) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
//---------------------------------------------------------------
function getPronouns(caste) {
//They went to their doctor themself to see if it was theirs
  switch (caste) {
    case "male":
        return {
            they: "he",
            their: "his",
            theirs: "his",
            themself: "himself"
        };
        break;
    case "female":
        return {
            they: "she",
            their: "her",
            theirs: "hers",
            themself: "herself"
        };
        break;
    default:
        return {
            they: "they",
            their: "their",
            theirs: "theirs",
            themself: "themself"
        };
  }
}
//---------------------------------------------------------------
function a_an(word) {
    if (word.toLowerCase().startsWith("a") || 
        word.toLowerCase().startsWith("e") || 
        word.toLowerCase().startsWith("i") || 
        word.toLowerCase().startsWith("o") || 
        word.toLowerCase().startsWith("u"))
    {
        return "an " + word;
    }
    else
    {
        return "a " + word;
    }
}