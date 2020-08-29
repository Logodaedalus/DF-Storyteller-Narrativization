//---------------------------------------------------------------
//loads up the event table
async function load_table(prefix, link){
    var data = fetch(link)
        .then(response => response.json())
        .then(data => {
            add_data_to_table(prefix, data.data);
            // Set info on next and prev buttons
            // Got all the html DOM elements
            var first_link = document.getElementById(`${prefix}_table_first`);
            var prev_link = document.getElementById(`${prefix}_table_prev`);
            var next_link = document.getElementById(`${prefix}_table_next`);
            var last_link = document.getElementById(`${prefix}_table_last`);

            // Disable the button if there is no link in the response
            first_link.disabled = data.links.first == null;
            // Set the link to the value we got in the response
            // The `onclick` function will run if someone clicks the button.
            // It will then run `load_table` with the `data.links.first` URL that is in there
            // For example: `load_table("http://localhost:8000/api/...")`
            first_link.onclick = function(){load_table(prefix, data.links.first)};
            // Same for the other buttons
            prev_link.disabled = data.links.prev == null;
            prev_link.onclick = function(){load_table(prefix, data.links.prev)};

            next_link.disabled = data.links.next == null;
            next_link.onclick = function(){load_table(prefix, data.links.next)};
            last_link.disabled = data.links.last == null;
            last_link.onclick = function(){load_table(prefix, data.links.last)};

            // Display the current page number
            var page_nr = document.getElementById(`${prefix}_page_nr`);
            // `innerHTML` will refer to everything inside the tag: 
            // `<span id="page_nr">  everything in here  </span>`
            page_nr.innerHTML = data.page_nr;
        });
}

//---------------------------------------------------------------
async function add_data_to_table(prefix, data){

    var table = document.getElementById(`${prefix}_table`);

    switch(prefix) {
        case "he":
            // Reset table to default content
            table.innerHTML = 
                `<tr>
                    <th>id</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>`;

            // Add a row for each event
            data.forEach(
                async he => {

                    formatTime(he);
                    // Add a new item to the table at the end.
                    // Create a new row in the table
                    var row = table.insertRow(-1);
                    // Fill all the cells in the row.
                    // The `-1` means that it will insert it at the end of the row
                    var clickCell = row.insertCell(-1);
                    //clickCell.innerHTML = `<a href="javascript:showJson(${he})">${he.id}</a>`;
                    clickCell.innerHTML = `<a href="#">${he.id}</a>`;
                    clickCell.onclick = function(){showJson(he, prefix);};
                    row.insertCell(-1).innerHTML = he.displayTime;
                    row.insertCell(-1).innerHTML = he.type;
                    var chronicleCell = row.insertCell(-1);
                    chronicleCell.innerHTML = "";
                    chronicleCell.id = "he_" + he.id;
                    var processedInfo = await historical_event_desc(he);
                    var he_info = document.getElementById("he_" + he.id);
                    he_info.innerHTML = processedInfo;
                },
            );
        break;
    }
}

function showJson(he, prefix) {
    var jsonDiv = document.getElementById(`${prefix}_jsonDiv`);
    jsonDiv.innerHTML = JSON.stringify(he, null, 4);
}

//--------TAB STUFF-----------------------------------------------
function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
//-----------------------------------------------------------------