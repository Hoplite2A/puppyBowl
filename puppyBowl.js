//? Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2308-FTB-ET-WEB-PT";
//? Use the APIURL variable for fetch requests
const BASEURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
//! allOrAddPlayer is used for both fetchAllPlayers() && addNewPlayer() since they share the same End Point.
const allOrAddPlayers = "players";
//! singleOrDeletePlayer is used for both fetchSinglePlayer() && removePlayer() since they share the same End Point.
const singleOrDeletePlayer = "players/";

const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

/*
? It fetches all players from the API and returns them
 ? @returns An array of objects.
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
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerID) => {
  try {
    const res = await fetch(`${BASEURL}${singleOrDeletePlayer}${playerID}`);
    if (res.ok) {
      console.log("fetchSinglePlayers Function: SUCCESS");
    } else {
      console.log("fetchSinglePlayers Function: NOT-SUCCESSFUL");
    }
    const fetchSinglePlayerjson = res.json();
    return fetchSinglePlayerjson;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerID}!`, err);
  }
};

const addNewPlayer = async (newPlayerName, newPlayerBreed) => {
  try {
    const res = await fetch(`${BASEURL}${allOrAddPlayers}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newPlayerName,
        breed: newPlayerBreed,
        imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F5230440-cute-german-shepherd-puppy-smiling-cartoon-vector-illustration&psig=AOvVaw25qp7RHbIi_DUmoVEWxs-j&ust=1698971867354000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCICils2JpIIDFQAAAAAdAAAAABAE"
      }),
    });
    if (res.ok) {
      console.log("addNewPlayer Function: SUCCESS");
    } else {
      console.log("addNewPlayer Function: NOT-SUCCESSFUL");
    }
    const addNewPlayerjson = await res.json();
    return addNewPlayerjson;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const res = await fetch(`${BASEURL}${singleOrDeletePlayer}${playerId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("removePlayer Function: SUCCESS");
    } else {
      console.log("removePlayer Function: NOT-SUCCESSFUL");
    }
    const removePlayerjson = res.json();
    return removePlayerjson;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/*
? It takes an array of player objects, loops through them, and creates a string of HTML for each
? player, then adds that string to a larger string of HTML that represents all the players.
?
? Then it takes that larger string of HTML and adds it to the DOM.
?
? It also adds event listeners to the buttons in each player card.
?
? The event listeners are for the "See details" and "Remove from roster" buttons.
?
? The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
? API to get the details for a single player.
?
? The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
? the API to remove a player from the roster.
?
? The `fetchSinglePlayer` and `removePlayer` functions are defined in the
? @param playerList - an array of player objects
? @returns the playerContainerHTML variable.
*/
function renderSinglePlayerDetails (playerDetails) {
  try {
    playerContainer.innerHTML = '';
    const seeSinglePlayerDetails = document.createElement("div");
    seeSinglePlayerDetails.classList.add("singlePlayerDetailsdiv");
    seeSinglePlayerDetails.innerHTML = `
      <h2 class="seeDetailspName" id="seeDetailsName">Name: ${playerDetails.name}</h2>
      <p class="seeDetailspBreed" id="seeDetailsBreed">Breed: ${playerDetails.breed}</p>
      <p class="seeDetailspStatus" id="seeDetailsStatus">Status: ${playerDetails.status}</p>
      <p class="seeDetailspTeamId" id="seeDetailsTeamId">Team: ${playerDetails.teamId}</p>
      <button class="singleCloseButton" id="seeDetailsCloseButton">Close</button>
    `;

    playerContainer.appendChild(seeSinglePlayerDetails);

    const seeDetailsCloseButton = seeSinglePlayerDetails.querySelector(".singleCloseButton");
    seeDetailsCloseButton.addEventListener("click", async (event) => {
      seeSinglePlayerDetails.remove();
      const playerArray = await fetchAllPlayers();
      const playerList = playerArray.data.players;
      renderAllPlayers(playerList);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering single player details!", err);
  }
};

const renderAllPlayers = async (playerList) => {
  try {
    playerContainer.innerHTML = "";
    playerContainer.classList.add("allPlayersContainer");
    playerList.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("dogPlayerTiles");
      playerElement.innerHTML = `
                <img class="playerTileImage" id="dogImage" src="${player.imageUrl}" alt="Image of ${player.breed} breed of dog">
                <h2 class="playerTileName" id="playerTileName">${player.name}</h2>
                    <div class="dogPlayerTileButtons">
                      <button class="see-details-button" data-id="${player.id}">See Details</button>
                      <button class="remove-button" data-id=${player.id}">Remove</button>
                    </div>
              `;
              
      //*See Details Button
      const seeDetailsButton = playerElement.querySelector(".see-details-button");
      seeDetailsButton.addEventListener("click", async (event) => {
        const detailId = await fetchSinglePlayer(player.id)
        const newDetail = detailId.data.player;
        renderSinglePlayerDetails(newDetail);
      });

      //* Remove Player Button
      const removePlayerButton = playerElement.querySelector(".remove-button");
      removePlayerButton.addEventListener("click", async (event) => {
        removePlayer(player.id);
        init();
      });
      playerContainer.appendChild(playerElement);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering all players!", err);
  }
};

/*
? It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
? fetches all players from the database, and renders them to the DOM.
*/
const renderNewPlayerForm = () => {
  try {
    newPlayerFormContainer.innerHTML = "";
    const newPlayerFormElement = document.createElement("div");
    newPlayerFormElement.classList.add("newPlayersFormElement");
    newPlayerFormElement.innerHTML = `
      <h2 class="newPlayerForm">Enter New Player</h2>
      <label type="text" for="newPlayerName" id="newPlayerNameLabel">Name: </label>
      <input type="text" name="newPlayerName" id="newPlayerName">
      <label type="text" for="newPlayerBreed" id="newPlayerBreedLabel">Breed: </label>
      <input type="text" name="newPlayerBreed" id="newPlayerBreed">
      <button class="addNewPlayerButton">Add</button>
    `;

    newPlayerFormContainer.appendChild(newPlayerFormElement);

    const addNewPlayerButton = newPlayerFormElement.querySelector(".addNewPlayerButton");
    addNewPlayerButton.addEventListener("click", async (event) => {
      let newPlayerName = document.getElementById("newPlayerName").value;
      let newPlayerBreed = document.getElementById("newPlayerBreed").value;
      await addNewPlayer(newPlayerName, newPlayerBreed);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const playerArray = await fetchAllPlayers();
  const playerList = playerArray.data.players;
  renderAllPlayers(playerList);
  renderNewPlayerForm();
};

init();
