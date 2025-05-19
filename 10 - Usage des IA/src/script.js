const inputBox = document.getElementById("inputHumeur");
const submitBtn = document.getElementById("submitBtn");
const recetteResult = document.getElementById("recetteResult");
const sentimentResult = document.getElementById("sentimentResult");
const imagesContainer = document.getElementById("imagesContainer");
let sentiment;
let salade;
let score;

function preload() {
  sentiment = ml5.sentiment("movieReviews");
}

function setup() {
  noCanvas();
  submitBtn.addEventListener("click", () => {
    getSentiment();
  });
}

function getSentiment() {
  const texte = inputBox.value;
  if (texte == "") {
    sentimentResult.innerHTML = "0 / 1";
    score = 0;
    progressBar.style.width = `${score * 100}%`;
    recetteResult.innerHTML =
      "Tu dois écrire un texte pour que je puisse te proposer une salade";
    return;
  }
  console.log("Texte entré :", texte);
  sentiment.predict(texte, gotResult);
}

function gotResult(prediction) {
  console.log("Prédiction reçue :", prediction);
  if (!prediction || typeof prediction.confidence !== "number") {
    recetteResult.html("Erreur : impossible d'analyser. Réessaie.");
    console.error("Erreur : prediction invalide →", prediction);
    return;
  }

  score = prediction.confidence;

  if (score > 0.75) {
    salade = "roquette, avocat, concombre";
  } else if (score > 0.4) {
    salade = "laitue, tomate, emmental";
  } else {
    salade = "mâche, olive, oeuf";
  }
  sentimentResult.innerHTML = `${score.toFixed(2)} / 1`;
  progressBar.style.width = `${score * 100}%`;
  recetteResult.innerHTML = `Recette : ${salade}`;
  displaySalade();
}

function displaySalade() {
  imagesContainer.innerHTML = `
  <div id="bolContainer" class="w-full h-full relative">
    <img
      id="bolFront"
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 object-contain z-50 w-1/2"
      src="./img/bol/bol_front.svg"
    />
    <img
      id="bolBack"
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[95%] object-contain z-0 w-1/2"
      src="./img/bol/bol_back.svg"
      />
  </div>
  `;
  const bolContainer = document.getElementById("bolContainer");
  bolContainer.style.animation = "RollAnimation 1s ease-in-out";
  const saladeFront = document.createElement("img");
  saladeFront.classList.add(
    "absolute",
    "left-1/2",
    "-translate-x-1/2",
    "top-1/2",
    "-translate-y-[110%]",
    "object-contain",
    "z-[2]",
    "w-1/4"
  );
  saladeFront.src = "./img/salade/salade_front.svg";
  saladeFront.style.animation = "FallAnimation 1s ease-in-out";
  imagesContainer.appendChild(saladeFront);

  const saladeBack = document.createElement("img");
  saladeBack.classList.add(
    "absolute",
    "left-1/2",
    "-translate-x-1/2",
    "top-1/2",
    "-translate-y-full",
    "object-contain",
    "z-[1]",
    "w-1/2"
  );
  saladeBack.src = "./img/salade/salade_back.svg";
  saladeBack.style.animation = "FallAnimation 1s ease-in-out";
  imagesContainer.appendChild(saladeBack);

  const ingredientsArray = salade
    .split(", ")
    .map((ingredient) => ingredient.trim());

  let i = 0;
  ingredientsArray.forEach((ingredient) => {
    console.log(i);
    const ingredientImage = document.createElement("img");
    if (i == 0) {
    } else if (i == 1) {
      ingredientImage.src = `./img/ingredients/${ingredient}.svg`;
      ingredientImage.classList.add(
        "absolute",
        "left-1/2",
        "translate-x-[20%]",
        "top-1/2",
        "-translate-y-[120%]",
        "object-contain",
        "z-[1]",
        "w-1/5",
        "rotate-15"
      );
      ingredientImage.style.animation = "FallAnimation 1s ease-in-out";
      imagesContainer.appendChild(ingredientImage);
    } else if (i == 2) {
      ingredientImage.src = `./img/ingredients/${ingredient}.svg`;
      ingredientImage.classList.add(
        "absolute",
        "left-1/2",
        "-translate-x-[120%]",
        "top-1/2",
        "-translate-y-[120%]",
        "object-contain",
        "z-[1]",
        "w-1/5",
        "-rotate-10"
      );
      ingredientImage.style.animation = "FallAnimation 1s ease-in-out";
      imagesContainer.appendChild(ingredientImage);
    }
    i++;
  });
}
