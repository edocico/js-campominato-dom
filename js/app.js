//console.log('ok')

// Recupero elementi dal DOM

const gridDOMElement = document.querySelector('.grid')

const selectDOMElement = document.getElementById('difficulty-select')

const playBtnDOMElement = document.querySelector('.play-btn')

const scoreDOMElement = document.querySelector('.punteggio')



playBtnDOMElement.addEventListener('click', function() {

  const cellNumber = parseInt(selectDOMElement.value);

  let punteggio = 0

  scoreDOMElement.innerHTML = `<span> il tuo punteggio è di ${punteggio} </span>`

  creaGriglia(cellNumber);

  const bombsPosition = getArrayOfRandomIntBetween(1,cellNumber,16)
  console.log(bombsPosition)

  const cellDOMElement = document.querySelectorAll(".grid-cell");

  for (let i = 0; i < cellDOMElement.length; i++) {
      
    const currentCellDOMElement = cellDOMElement[i];

    currentCellDOMElement.addEventListener("click", function () {
      //console.dir(currentCellDOMElement)
      if (bombsPosition.includes(parseInt(currentCellDOMElement.innerHTML))) {

        currentCellDOMElement.classList.add('bg-red')

        alert(`hai perso e hai totalizzato ${punteggio} punti!`)

        gridDOMElement.innerHTML = "";

      } else {

        currentCellDOMElement.classList.add('bg-skyblue')

        currentCellDOMElement.classList.add('events-none')

        punteggio++

        console.log(punteggio)

        if (punteggio === (cellNumber - 16)) {

          alert('hai vinto!')

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


