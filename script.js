// Variabili globali per gestire il gioco
let rispostaCorretta; 
let punteggioCorrente = 0;
let record = 0; 
let valoreTimer = 10; 
let intervalloTimer; 
// Funzione per generare una nuova operazione matematica
function generaOperazione() {
  const numero1 = Math.floor(Math.random() * 20);
  const numero2 = Math.floor(Math.random() * 20);
  const operazione = ["+", "-", "*"][Math.floor(Math.random() * 3)];
  const domanda = `${numero1} ${operazione} ${numero2}`;
  rispostaCorretta = eval(domanda);
  document.getElementById("question").textContent = domanda;
  generaBottoniRisposta(rispostaCorretta);
  resettaTimer();
}
function generaBottoniRisposta(corretta) {
  const contenitore = document.getElementById("buttons");
  contenitore.innerHTML = "";
  const posizioneCorretta = Math.floor(Math.random() * 4);
  const risposte = [];
  for (let i = 0; i < 4; i++) {
    if (i === posizioneCorretta) {
      risposte.push(corretta); 
    } else {
      let offset = Math.floor(Math.random() * 10) + 1;
      let sbagliata = Math.random() > 0.5 ? corretta + offset : corretta - offset;
      risposte.push(sbagliata);
    }
  }
  for (let i = 0; i < risposte.length; i++) {
    const bottone = document.createElement("button");
    bottone.textContent = risposte[i];
    bottone.onclick = function() {
      controllaRisposta(risposte[i]);
    };
    contenitore.appendChild(bottone);
  }
}
// Aggiorna il record nella funzione controllaRisposta
function controllaRisposta(scelta) {
  const risultato = document.getElementById("result");
  if (scelta === rispostaCorretta) {
    punteggioCorrente++;
    risultato.textContent = "✅ Corretto!";
    risultato.style.color = "#28a745"; // Verde
  } else {
    if (record < punteggioCorrente) {
      record = punteggioCorrente;
      document.getElementById("record-score").textContent = record;
    }
    punteggioCorrente = 0;
    risultato.textContent = "❌ Sbagliato!";
    risultato.style.color = "#dc3545"; // Rosso
  }
  document.getElementById("current-score").textContent = punteggioCorrente;
  setTimeout(function() {
    risultato.textContent = "";
    generaOperazione();
  }, 1500);
}
function resettaTimer() {
  clearInterval(intervalloTimer); 
  valoreTimer = 10; 
  document.getElementById("timer").textContent = `Tempo Rimasto: ${valoreTimer}s`;
  intervalloTimer = setInterval(function() {
    valoreTimer--;
    document.getElementById("timer").textContent = `Tempo Rimasto: ${valoreTimer}s`;
    if (valoreTimer <= 0) {
      clearInterval(intervalloTimer);
      document.getElementById("result").textContent = "❌ Tempo Scaduto!";
      document.getElementById("result").style.color = "#dc3545"; // Rosso
      if (record < punteggioCorrente) {
        record = punteggioCorrente;
      }
      punteggioCorrente = 0;
      document.getElementById("current-score").textContent = punteggioCorrente;
      document.getElementById("record-score").textContent = record;
      setTimeout(function() {
        document.getElementById("result").textContent = "";
        generaOperazione();
      }, 1500);
    }
  }, 1000); 
}
generaOperazione();
