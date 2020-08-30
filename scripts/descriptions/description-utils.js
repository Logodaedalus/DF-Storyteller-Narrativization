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
	if (historicalEvent.year < 0) {
		historicalEvent.displayTime = "the time before time"	
	} else {
		historicalEvent.displayTime = historicalEvent.year + " and " + historicalEvent.seconds72 + " seconds"
	}

}
//---------------------------------------------------------------
//
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