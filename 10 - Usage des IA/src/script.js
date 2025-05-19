const inputBox = document.getElementById("inputHumeur");
const submitBtn = document.getElementById("submitBtn");
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
    sentimentResult.html("Erreur : impossible d'analyser. Réessaie.");
    console.error("Erreur : prediction invalide →", prediction);
    return;
  }

  const score = prediction.confidence;

  if (score > 0.75) {
    salade = "La joix";
  } else if (score > 0.4) {
    salade = "pas trop la joix";
  } else {
    salade = "triste";
  }
  sentimentResult.innerHTML = `Score : ${score.toFixed(2)}<br>${salade}`;
}
