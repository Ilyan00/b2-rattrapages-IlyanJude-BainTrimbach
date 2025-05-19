const inputBox = document.getElementById("inputHumeur");
const submitBtn = document.getElementById("submitBtn");
const recetteResult = document.getElementById("recetteResult");
const sentimentResult = document.getElementById("sentimentResult");
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
    salade = "roquette, avocat, fraises, poulet grillé";
  } else if (score > 0.4) {
    salade = "laitue, œufs, tomates, maïs, emmental";
  } else {
    salade = "pâtes froides, thon, olives, œuf dur";
  }
  sentimentResult.innerHTML = `${score.toFixed(2)} / 1`;
  progressBar.style.width = `${score * 100}%`;
  recetteResult.innerHTML = `Recette : ${salade}`;
}
