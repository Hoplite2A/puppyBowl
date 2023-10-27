const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2308-FTB-ET-WEB-PT";
// Use the APIURL variable for fetch requests
const BASEURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
//* allOrAddPlayer is used for both fetchAllPlayers() && addNewPlayer() since they share the same End Point.
const allOrAddPlayers = "players";
const singlePlayer = "players/PLAYER-ID";
const deletePlayer = "players/PLAYER-ID";

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const res = await fetch(`${BASEURL}${allOrAddPlayers}`);
    if (res.ok) {
      console.log("fetchAllPlayers Function: SUCCESS");
    } else {
      console.log("fetchAllPlayers Function: NOT-SUCCESSFUL");
    }
    const fetchAllPlayersjson = await res.json();
    return fetchAllPlayersjson;
  } catch (error) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const res = await fetch(`${BASEURL}${singlePlayer}`);
    if (res.ok) {
      console.log("fetchAllPlayers Function: SUCCESS");
    } else {
      console.log("fetchAllPlayers Function: NOT-SUCCESSFUL");
    }
    const fetchSinglePlayerjson = res.json();
    return fetchSinglePlayerjson;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const res = await fetch(`${BASEURL}${allOrAddPlayers}`, {
      method: "POST",
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify({
        name: `${playerObj.name}`,
        breed: `${playerObj.breed}`,
        status: `${playerObj.status}`,
        imageUrl: `${playerObj.imageUrl}`,
        teamId: `${playerObj.teamId}`,
      }),
    });
    if (res.ok) {
      console.log("fetchAllPlayers Function: SUCCESS");
    } else {
      console.log("fetchAllPlayers Function: NOT-SUCCESSFUL");
    }
    const addNewPlayerjson = await res.json();
    return addNewPlayerjson;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const res = await fetch(`${BASEURL}${deletePlayer}`, {
      method: "DELETE",
    });
    const removePlayerjson = res.json();
    return removePlayerjson;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
//!------------------------------------------------------------------------------------------------------------//
const renderAllPlayers = (playerList) => {
  try {
    playerList.innerHTML = "";
    playerList.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("renderAllPlayersDiv");
      playerElement.innerHTML = `
            
            `;
    });

    //!------------------------------------------------------------------------------------------------------------//
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
