const inputBox = document.getElementById("inputHumeur");
const submitBtn = document.getElementById("submitBtn");
const recetteResult = document.getElementById("recetteResult");
const sentimentResult = document.getElementById("sentimentResult");
let sentiment;
let salade;

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

  const score = prediction.confidence;

  if (score > 0.75) {
    salade = "roquette, avocat, fraises, poulet grillé";
  } else if (score > 0.4) {
    salade = "laitue, œufs, tomates, maïs, emmental";
  } else {
    salade = "pâtes froides, thon, olives, œuf dur";
  }
  sentimentResult.innerHTML = `${score.toFixed(2)} / 1`;
  recetteResult.innerHTML = `Recette : ${salade}`;
}
