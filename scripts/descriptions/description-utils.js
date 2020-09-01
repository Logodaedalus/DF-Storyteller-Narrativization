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
    if (text.ToLower().StartsWith("a") || 
        text.ToLower().StartsWith("e") || 
        text.ToLower().StartsWith("i") || 
        text.ToLower().StartsWith("o") || 
        text.ToLower().StartsWith("u"))
    {
        return = "an " + word;
    }
    else
    {
        return = "a " + word;
    }
}