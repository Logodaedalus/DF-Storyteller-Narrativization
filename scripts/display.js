//---------------------------------------------------------------
//loads up the event table
async function load_table(prefix, link){
    var data = fetch(link)
        .then(response => response.json())
        .then(data => {
            add_data_to_table(prefix, data.data);           //add table values in
            setPager(prefix, data);
        });
}
//---------------------------------------------------------------
//sets up the pager on a table
function setPager(prefix, data) {
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
                    clickCell.innerHTML = `<a class='pseudoLink'>${he.id}</a>`;
                    clickCell.onclick = function(){showJson(he, prefix + "_jsonDiv");};
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
        case "hf":
            // Reset table to default content
            table.innerHTML = 
                `<tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Race</th>
                    <th>Actions</th>
                </tr>`;

            var rowCounter = 0;

            // Add a row for each event
            data.forEach(
                async hf => {

                    // Add a new item to the table at the end.
                    // Create a new row in the table
                    var row = table.insertRow(-1);
                    row.id = `row_${rowCounter}`;
                    rowCounter++;
                    // Fill all the cells in the row.
                    // The `-1` means that it will insert it at the end of the row
                    var clickCell = row.insertCell(-1);
                    clickCell.innerHTML = `<a class='pseudoLink'>${hf.id}</a>`;
                    clickCell.onclick = function(){showJson(hf, "character-moreInfo", row.id);};
                    row.insertCell(-1).innerHTML = formatName(hf.name);     //Name
                    row.insertCell(-1).innerHTML = hf.race.charAt(0).toUpperCase() + hf.race.slice(1);      //Race
                    var actionsCell = row.insertCell(-1);
                    //create stats link
                    var statsLink = document.createElement('a');
                        statsLink.classList = "pseudoLink";
                        statsLink.innerHTML = "Show Stats";
                        statsLink.onclick = function() { highlightRow("hf_table", row.id); showStats(hf, row.id); }
                        actionsCell.appendChild(statsLink);
                    actionsCell.innerHTML += " ";
                    //create event link
                    var eventLink = document.createElement('a');
                        eventLink.classList = "pseudoLink";
                        eventLink.innerHTML = "Show Events";
                        eventLink.onclick = function() { highlightRow("hf_table", row.id); showHfEvents(hf, row.id); }
                        actionsCell.appendChild(eventLink);
                        
                    //statsCell.onclick = function(){showHfStats(hf, prefix);};
                },
            );
        break;
        case "tt":
            // Reset table to default content
            table.innerHTML = 
                `<tr>
                    <th>id</th>
                    <th>Description</th>
                </tr>`;

            // Add a row for each event
            data.forEach(
                async he => {

                    // Add a new item to the table at the end.
                    // Create a new row in the table
                    var row = table.insertRow(-1);
                    // Fill all the cells in the row.
                    // The `-1` means that it will insert it at the end of the row
                    var clickCell = row.insertCell(-1);
                    //clickCell.innerHTML = `<a href="javascript:showJson(${he})">${he.id}</a>`;
                    clickCell.innerHTML = `<a class='pseudoLink'>${he.id}</a>`;
                    clickCell.onclick = function(){showJson(he, prefix + "_jsonDiv");};
                    var chronicleCell = row.insertCell(-1);
                    chronicleCell.innerHTML = await historical_event_desc(he);
                },
            );
        break;
    }
}

function showJson(he, targetDivId) {
    var jsonDiv = document.getElementById(`${targetDivId}`);
    jsonDiv.innerHTML = `<pre>${JSON.stringify(he, null, 4)}</pre>`;
}

//--------TAB STUFF-----------------------------------------------
function openTab(evt, tabName) {
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
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.tabName += " active";
  switch (tabName) {
    case "all-events-container":
    load_table("he", `${base_url}/api/historical_events?per_page=20`);
    break;
    case "character-container":
    load_table("hf", `${base_url}/api/historical_figures?per_page=20`);
    break;
    }
}
//==========================================================
//Historical Figure functions

//highlights the row after unhighlighting other rows
function highlightRow(tableId, rowId) {
    //unhighlight all rows
    //document.getElementById("hf_table").rows.forEach(element => element.className = "");
    for (let row of document.getElementById(tableId).rows) {
        row.className = "";
    }
    //highlight selected row
    var row = document.getElementById(rowId);
    row.className = "highlighted";
}
//-----------------------------------------------------
//shows the stats of the hf
function showStats(hf) {

}
//-----------------------------------------------------
//shows the events for the hf
async function showHfEvents(hf, rowId) {

    var infoDiv = document.getElementById("character-moreInfo");
    infoDiv.innerHTML =
        `<h3>${formatName(hf.name)}'s Events</h3>
        <table id="hfEventTable"><tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
        </tr></table>`;

    var hfEventTable = document.getElementById("hfEventTable");

    var data = fetch(`${base_url}/api/link_he_hf/${hf.id}?order=asc&order_by=year`)
        .then(response => response.json())
        .then(data => {
            // Add a row for each event
            data.data.forEach(
                async he => {
                    formatTime(he);
                    // Add a new item to the table at the end.
                    // Create a new row in the table
                    var row = hfEventTable.insertRow(-1);
                    // Fill all the cells in the row.
                    // The `-1` means that it will insert it at the end of the row
                    row.insertCell(-1).innerHTML = he.displayTime;
                    row.insertCell(-1).innerHTML = he.type;
                    var historicalEventCell = row.insertCell(-1);
                    historicalEventCell.innerHTML = "";
                    historicalEventCell.id = "char_he_" + he.id;
                    var processedInfo = await historical_event_desc(he);
                    var he_info = document.getElementById("char_he_" + he.id);
                    he_info.innerHTML = processedInfo;
                },
            );
        });
    
}

//----------------------------------------------------------------
function showStats(data) {

}


function populateTypeDropdown() {

    var types = [
        'add_hf_entity_honor',
        'add_hf_entity_link',
        'add_hf_hf_link',
        'add_hf_site_link',
        'agreement_formed',
        'agreement_made',
        'agreement_rejected',
        'artifact_claim_formed',
        'artifact_copied',
        'artifact_created',
        'artifact_destroyed',
        'artifact_found',
        'artifact_given',
        'artifact_lost',
        'artifact_possessed',
        'artifact_recovered',
        'artifact_stored',
        'assume_identity',
        'attacked_site',
        'body_abused',
        'building_profile_acquired',
        'ceremony',
        'change_hf_body_state',
        'change_hf_job',
        'change_hf_state',
        'changed_creature_type',
        'competition',
        'create_entity_position',
        'created_site',
        'created_structure',
        'created_world_construction',
        'creature_devoured',
        'dance_form_created',
        'destroyed_site',
        'entity_alliance_formed',
        'entity_breach_feature_layer',
        'entity_created',
        'entity_dissolved',
        'entity_equipment_purchase',
        'entity_incorporated',
        'entity_law',
        'entity_overthrown',
        'entity_persecuted',
        'entity_primary_criminals',
        'entity_rampaged_in_site',
        'entity_relocate',
        'entity_searched_site',
        'failed_frame_attempt',
        'failed_intrigue_corruption',
        'field_battle',
        'first_contact',
        'gamble',
        'hf_abducted',
        'hf_attacked_site',
        'hf_confronted',
        'hf_convicted',
        'hf_destroyed_site',
        'hf_died',
        'hf_disturbed_structure',
        'hf_does_interaction',
        'hf_enslaved',
        'hf_equipment_purchase',
        'hf_gains_secret_goal',
        'hf_interrogated',
        'hf_learns_secret',
        'hf_new_pet',
        'hf_performed_horrible_experiments',
        'hf_prayed_inside_structure',
        'hf_preach',
        'hf_profaned_structure',
        'hf_ransomed',
        'hf_recruited_unit_type_for_entity',
        'hf_relationship',
        'hf_relationship_denied',
        'hf_reunion',
        'hf_revived',
        'hf_simple_battle_event',
        'hf_travel',
        'hf_viewed_artifact',
        'hf_wounded',
        'hfs_formed_intrigue_relationship',
        'hfs_formed_reputation_relationship',
        'holy_city_declaration',
        'item_stolen',
        'knowledge_discovered',
        'masterpiece_arch_constructed',
        'masterpiece_arch_design',
        'masterpiece_created_arch_construct',
        'masterpiece_created_engraving',
        'masterpiece_created_item',
        'masterpiece_created_item_improvement',
        'masterpiece_food',
        'masterpiece_item',
        'masterpiece_item_improvement',
        'masterpiece_lost',
        'merchant',
        'modified_building',
        'musical_form_created',
        'new_site_leader',
        'peace_accepted',
        'peace_rejected',
        'performance',
        'plundered_site',
        'poetic_form_created',
        'procession',
        'razed_structure',
        'reclaim_site',
        'regionpop_incorporated_into_entity',
        'remove_hf_entity_link',
        'remove_hf_hf_link',
        'remove_hf_site_link',
        'replaced_structure',
        'sabotage',
        'site_died',
        'site_dispute',
        'site_retired',
        'site_taken_over',
        'site_tribute_forced',
        'sneak_into_site',
        'spotted_leaving_site',
        'squad_vs_squad',
        'tactical_situation',
        'trade',
        'written_content_composed',
    ];

    var ttDropdown = document.getElementById("ttDropdown");

    types.forEach(
        type => {
        var statsLink = document.createElement('a');
            statsLink.classList = "pseudoLink";
            statsLink.innerHTML = type;
            statsLink.onclick = function() { 
                load_table("tt", `${base_url}/api/historical_events?filter_on_type=${type}`); 
            }
        ttDropdown.appendChild(statsLink);
    });
        
    
}

//==========================================================
// Close the dropdown menu if the user clicks outside of it (runs on page-load)
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}