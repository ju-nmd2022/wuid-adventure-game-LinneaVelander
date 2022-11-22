const FIRST_SCENE = "images/Background2.png";
const SECOND_SCENE = "images/Chimney.png";
const THIRD_SCENE = "images/Livingroom.png";
const FORTH_SCENE = "images/Backgroundvillage.png";

const canvas = document.getElementById("canvas");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

const ladder = document.getElementById("ladder");
const sack = document.getElementById("sack");
const coal = document.getElementById("coal");
const gift = document.getElementById("gift");
const bow = document.getElementById("bow");

const placedGift = document.getElementById("placedGift");
const placedCoal = document.getElementById("placedCoal");
const placePresent = document.getElementById("placePresent");

const inventory_ladder = document.getElementById("inventory_ladder");
const inventory_sack = document.getElementById("inventory_sack");
const inventory_coal = document.getElementById("inventory_coal");
const inventory_gift = document.getElementById("inventory_gift");
const inventory_bow = document.getElementById("inventory_bow");

const randomCoal = document.getElementById("randomCoal");
const randomGift = document.getElementById("randomGift");
const randomButton = document.getElementById("randomButton");
const randomScreen = document.getElementById("randomScreen");
const randomHeader = document.getElementById("randomHeader");

const errorMessage = document.getElementById("guide");
const placedPresent = document.getElementById("placedPresent");
const finished = document.getElementById("finished");

const LADDER_KEY = "ladder";
const SACK_KEY = "sack";
const COAL_KEY = "coal";
const GIFT_KEY = "gift";
const BOW_KEY = "bow";
const CURRENT_SCENE_KEY = "currentScene";

let hasLadder = false;
let hasSack = false;
let hasCoal = false;
let hasGift = false;
let hasBow = false;
let hasPlacedGift = false;
let hasPlacedCoal = false;

inventory_ladder.style.filter = "opacity(0.1)";
inventory_sack.style.filter = "opacity(0.1)";
inventory_coal.style.filter = "opacity(0.1)";
inventory_gift.style.filter = "opacity(0.1)";
inventory_bow.style.filter = "opacity(0.1)";

let currentScene = sessionStorage.getItem(CURRENT_SCENE_KEY);

if (currentScene == null) {
  currentScene = 1;
} else {
  currentScene = parseInt(currentScene);
}

getPreviousSession();

changeScene(currentScene);

hideErrorMessage();

function saveSession() {
  sessionStorage.setItem(LADDER_KEY, hasLadder.toString());
  sessionStorage.setItem(SACK_KEY, hasSack.toString());
  sessionStorage.setItem(COAL_KEY, hasCoal.toString());
  sessionStorage.setItem(GIFT_KEY, hasGift.toString());
  sessionStorage.setItem(BOW_KEY, hasBow.toString());
}

function getPreviousSession() {
  // Ladder
  let hasLadderValue = sessionStorage.getItem(LADDER_KEY);
  hasLadder = hasLadderValue === "true";
  if (hasLadder) {
    inventory_ladder.style.filter = "";
  }

  // Sack
  let hasSackValue = sessionStorage.getItem(SACK_KEY);
  hasSack = hasSackValue === "true";
  if (hasSack) {
    inventory_sack.style.filter = "";
  }

  // Coal
  let hasCoalValue = sessionStorage.getItem(COAL_KEY);
  hasCoal = hasCoalValue === "true";
  if (hasCoal) {
    inventory_coal.style.filter = "";
  }

  // Gift
  let hasGiftValue = sessionStorage.getItem(GIFT_KEY);
  hasGift = hasGiftValue === "true";
  if (hasGift) {
    inventory_gift.style.filter = "";
  }

  // Bow
  let hasBowValue = sessionStorage.getItem(BOW_KEY);
  hasBow = hasBowValue === "true";
  if (hasBow) {
    inventory_bow.style.filter = "";
  }
}

function changeScene(scene) {
  let imageSource;
  hideErrorMessage();
  if (scene == 1) {
    currentScene = 1;
    hideFinished();
    hidePlacedPresent();
    hideAllItems();
    showGift();
    showLadder();
    imageSource = FIRST_SCENE;
  } else if (scene == 2) {
    if (hasLadder) {
      hideFinished();
      hidePlacedPresent();
      hideAllItems();
      currentScene = 2;
      showCoal();
      imageSource = SECOND_SCENE;
    } else {
      showErrorMessage("You need to pick up a ladder!");
    }
    if (hasPlacedCoal || hasPlacedGift) {
      showFinished();
    }
  } else if (scene == 3) {
    if (hasLadder) {
      hideFinished();
      hideAllItems();
      hidePlacedPresent();
      if (hasPlacedCoal) {
        showPlacedCoal();
      } else if (hasPlacedGift) {
        showPlacedGift();
      } else {
        showPlacePresent();
      }
      currentScene = 3;
      imageSource = THIRD_SCENE;
    } else {
      showErrorMessage("You need to pick up a ladder!");
    }
  } else if (scene == 4) {
    hideFinished();
    hideAllItems();
    hidePlacedPresent();
    if (hasPlacedCoal || hasPlacedGift) {
      showFinished();
    }
    currentScene = 4;
    showBow();
    showSack();
    imageSource = FORTH_SCENE;
  }

  if (imageSource != null) {
    sessionStorage.setItem(CURRENT_SCENE_KEY, currentScene.toString());
    canvas.src = imageSource;
  }
}

// #region EventListeners

arrowLeft.addEventListener("click", function () {
  let newScene = currentScene - 1;
  if (newScene <= 0) {
    newScene = 4;
  }
  changeScene(newScene);
});

arrowRight.addEventListener("click", function () {
  let newScene = currentScene + 1;
  if (newScene > 4) {
    newScene = 1;
  }
  changeScene(newScene);
});

ladder.addEventListener("click", function () {
  inventory_ladder.style.filter = "";
  if (!hasLadder) {
    hasLadder = true;
    hideLadder();
    hideErrorMessage();
    saveSession();
  }
});

sack.addEventListener("click", function () {
  inventory_sack.style.filter = "";
  if (!hasSack) {
    hasSack = true;
    hideSack();
    saveSession();
  }
});

coal.addEventListener("click", function () {
  if (!hasCoal) {
    if (!hasSack) {
      showErrorMessage("You need to pick up the sack first!");
      return;
    }
    inventory_coal.style.filter = "";
    hasCoal = true;
    hideCoal();
    saveSession();
  }
});

gift.addEventListener("click", function () {
  if (!hasGift) {
    if (!hasBow) {
      showErrorMessage("You need to pick up the bow first!");
      return;
    }
    inventory_gift.style.filter = "";
    hasGift = true;
    hideGift();
    saveSession();
  }
});

bow.addEventListener("click", function () {
  if (!hasBow) {
    if (!hasSack) {
      showErrorMessage("You need to pick up the sack first!");
      return;
    }
    inventory_bow.style.filter = "";
    hasBow = true;
    hideBow();
    saveSession();
  }
});

placePresent.addEventListener("click", function () {
  if (!hasCoal || !hasGift) {
    showErrorMessage("You need to pick up coal and gift first!");
    return;
  }
  showRandomScreen();
});

randomButton.addEventListener("click", function () {
  let rand = Math.floor(Math.random() * 2) + 1;
  if (rand == 2) {
    hasPlacedCoal = true;
    showPlacedCoal();
    hideRandomScreen();
    hidePlacePresent();
    showPlacedPresent(
      "Good job! You've placed a coal, now get out before anyone wakes up!"
    );
  } else {
    hasPlacedGift = true;
    showPlacedGift();
    hideRandomScreen();
    hidePlacePresent();
    showPlacedPresent(
      "Good job! You've placed a gift, now get out before anyone wakes up!"
    );
  }
});

// #endregion

// #region Hide & Show

function hideAllItems() {
  hideBow();
  hideCoal();
  hideSack();
  hidePlacedCoal();
  hidePlacedGift();
  hideGift();
  hideLadder();
  hidePlacePresent();
  hideRandomScreen();
}

function hideLadder() {
  ladder.hidden = true;
}

function hideSack() {
  sack.hidden = true;
}

function hideCoal() {
  coal.hidden = true;
}

function hideGift() {
  gift.hidden = true;
}

function hideBow() {
  bow.hidden = true;
}

function showLadder() {
  if (!hasLadder) {
    ladder.hidden = false;
  }
}

function showSack() {
  if (!hasSack) {
    sack.hidden = false;
  }
}

function showCoal() {
  if (!hasCoal) {
    coal.hidden = false;
  }
}

function showPlacedCoal() {
  if (hasPlacedCoal) {
    placedCoal.hidden = false;
  }
}

function hidePlacedCoal() {
  placedCoal.hidden = true;
}

function showGift() {
  if (!hasGift) {
    gift.hidden = false;
  }
}

function showPlacedGift() {
  if (hasPlacedGift) {
    placedGift.hidden = false;
  }
}

function hidePlacedGift() {
  placedGift.hidden = true;
}

function showBow() {
  if (!hasBow) {
    bow.hidden = false;
  }
}

function hidePlacePresent() {
  placePresent.hidden = true;
}

function showPlacePresent() {
  if (!hasPlacedCoal || !hasPlacedGift) {
    placePresent.hidden = false;
  }
}

function showRandomScreen() {
  if (hasGift && hasCoal) {
    randomScreen.style.display = "grid";
  }
}

function hideRandomScreen() {
  randomScreen.style.display = "none";
}

function hideFinished() {
  finished.hidden = true;
}

function showFinished() {
  if (hasPlacedCoal || hasPlacedGift) {
    finished.hidden = false;
  }
}

// #endregion

function showErrorMessage(message) {
  errorMessage.innerHTML = message;
  errorMessage.hidden = false;
}

function hideErrorMessage() {
  errorMessage.hidden = true;
}

function showPlacedPresent(message) {
  placedPresent.innerHTML = message;
  placedPresent.hidden = false;
}

function hidePlacedPresent() {
  placedPresent.hidden = true;
}
