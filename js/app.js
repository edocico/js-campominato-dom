//console.log('ok')

// Recupero elementi dal DOM

const gridDOMElement = document.querySelector('.grid')

const selectDOMElement = document.getElementById('difficulty-select')

const playBtnDOMElement = document.querySelector('.play-btn')

const scoreDOMElement = document.querySelector('.punteggio')



playBtnDOMElement.addEventListener('click', function() {
  // recupero il numero di celle da generare in base alla difficoltà scelta
  const cellNumber = parseInt(selectDOMElement.value);
  // dichiaro una variabile per il punteggio
  let punteggio = 0

  scoreDOMElement.innerHTML = `<span> il tuo punteggio è di ${punteggio} </span>`
  // creo la griglia con la difficoltà prescelta
  creaGriglia(cellNumber);
  // genero un array di numeri tutti diversi nel quale salvo le posizioni delle bombe
  const bombsPosition = getArrayOfRandomIntBetween(1,cellNumber,16)
  console.log(bombsPosition)
  // recupero dal DOM tutte le celle generate
  const cellDOMElement = document.querySelectorAll(".grid-cell");
  // ciclo tutte le celle
  for (let i = 0; i < cellDOMElement.length; i++) {
      
    const currentCellDOMElement = cellDOMElement[i];
    // aggiungo ad ogni cella un event listner click
    currentCellDOMElement.addEventListener("click", function () {
      //console.dir(currentCellDOMElement)
      // se la posizione di una bomba corrisponde ad una cella cliccata 
      if (bombsPosition.includes(parseInt(currentCellDOMElement.innerHTML))) {
        // aggiungo background red
        currentCellDOMElement.classList.add('bg-red')
        // alert hai perso con punteggio totalizzato
        alert(`hai perso e hai totalizzato ${punteggio} punti!`)
        // azzero la griglia
        gridDOMElement.innerHTML = "";
        // altrimenti se la cella non corrisponde alla posizione di una bomba
      } else {
        // aggiungo background azzurro
        currentCellDOMElement.classList.add('bg-skyblue')
        // applico la proprietà css pointer-events none
        currentCellDOMElement.classList.add('events-none')
        // incremento il contatore del punteggio
        punteggio++

        console.log(punteggio)
        // se il punteggio è uguale al numero totale delle celle - il numero delle bombe allora l'utente ha vinto
        if (punteggio === (cellNumber - 16)) {


          
          alert('hai vinto!')
          // resetto  la griglia per una nuova partita
          gridDOMElement.innerHTML = "";
        }
      }
      
    });
      
  }

})



// funzione di generazione delle celle

// Questa funzione crea una griglia di celle con numeri progressivi
// Il numero di celle dipende dal valore selezionato dall'utente

function creaGriglia(iNumber) {
    // Svuoto il contenuto dell'elemento gridDOMElement
    gridDOMElement.innerHTML = "";
    
    // Creo un ciclo for per generare le celle
    for (let i = 0; i < iNumber; i++) {
      // Calcolo il numero da inserire nella cella
      const n = i + 1;
      // Creo un elemento html per la cella con la classe appropriata in base al numero di celle
      let htmlCell = `<div class="grid-cell cell${iNumber}">${n}</div>`;
      // Aggiungo l'elemento html al contenuto dell'elemento gridDOMElement
      gridDOMElement.innerHTML += htmlCell;
    }
    
}

  



// function generazione bombe // in questo caso genera 16 numeri random tutti diversi , tra un minimo di 1 e un massimo del numero di celle presenti

function getArrayOfRandomIntBetween(min,max,number) {
  const bombArray = []
  while (bombArray.length < number) {
    const n = getRandomIntInclusive(min,max) 
  if (bombArray.includes(n) === false) {   
    bombArray.push(n)
  }
  }
  return bombArray
  
}

// genera un numero random tra un minimo e un massimo
function getRandomIntInclusive(min,max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}


// css pointer events none --> rende non cliccabile la casella


