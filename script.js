
/** =======================================================
 *  Global Variables
 *  ======================================================= */
 let list = {
  "cards": []
}
let cards = list.cards;
let currentCard = 0;
let cardsEmpty = cards.length==0;
let isFlipped = false;


function dropMenu() {
  var x = document.getElementById("navigation");
  if (x.className === "navbar-back") {
    x.className += " responsive";
  } else {
    x.className = "navbar-back";
  }
}

/** =======================================================
 *  Initialization
 *  ======================================================= */

var json_str = getCookie('cards');

if(!json_str) {
  currentCard=0;
  cardsEmpty=true;
}else{
  cards = JSON.parse(json_str);
  cardsEmpty=false;
  currentCard = parseInt(getCookie("currentCard"));
}

if(cards.length==0) {
  cardsEmpty=true;
  currentCard = 0;
  createCookie("currentCard", currentCard);
}

/** =======================================================
 *  Functions
 *  ======================================================= */

function addCard() {
  var label = prompt("What should the label be?");
  if(!label || label === " ") return;
  var desc = prompt("What should the description be?");
  if(!desc || desc === " ") return;
  var temp = {
    "label": label,
    "desc": desc
  };
  cards[cards.length] = temp;
  if(cardsEmpty) {
    cardsEmpty = false;
    cardContent.style.fontSize = "large";
    cardContent.style.textAlign = "left";
    cardContent.style.fontWeight = 'normal';
    cardContent.style.color = 'black';
    cardContent.style.fontFamily = 'Montserrat, sans-serif';
    console.log(currentCard);
  }
  updateCardContent();
  var json_str = JSON.stringify(cards);
  createCookie('cards', json_str);
}

function removeCard() {
  if(cardsEmpty) return;
  if (confirm("Are you sure you want to delete this card?")) {
    if(isFlipped) flipCard();
    cards.splice(currentCard, 1);
    
    if(cards.length===0) cardsEmpty = true;
    if(cards.length===currentCard && currentCard!==0) currentCard--;
    updateCardContent();
    var json_str = JSON.stringify(cards);
    createCookie('cards', json_str);
  }
}

function tooEasy() {
  if(isFlipped) flipCard();
  cards.splice(currentCard, 1);
  
  if(cards.length===0) cardsEmpty = true;
  if(cards.length===currentCard && currentCard!==0) currentCard--;
  updateCardContent();
  var json_str = JSON.stringify(cards);
  createCookie('cards', json_str);
}

function gotIt() {
  if(isFlipped) flipCard();
  cards.splice(currentCard, 1);
  
  if(cards.length===0) cardsEmpty = true;
  if(cards.length===currentCard && currentCard!==0) currentCard--;
  updateCardContent();
  var json_str = JSON.stringify(cards);
  createCookie('cards', json_str);
}

function tooHard() {
  if(isFlipped) flipCard();
  cards.splice(currentCard, 1);
  
  if(cards.length===0) cardsEmpty = true;
  if(cards.length===currentCard && currentCard!==0) currentCard--;
  updateCardContent();
  var json_str = JSON.stringify(cards);
  createCookie('cards', json_str);
}

function updateCardContent() {
  let cardLabel = document.getElementById("cardLabel");
  let cardContent = document.getElementById("cardContent");
  if(cardsEmpty) {
    var moji = ['=(','（￣へ￣）','（￣□￣；）','└@(･ｪ･)@┐','┬┴┬┴┤(･_├┬┴┬┴','(ò_ó)','(¬_¬")', '( o_o)', '@_@']
    cardLabel.innerText = moji[Math.floor(Math.random() * moji.length)];
    cardContent.innerHTML="No cards found!";
    cardContent.style.fontSize = "large"; 
    cardContent.style.textAlign = "center";
    cardContent.style.color = 'Red';
    cardContent.style.fontWeight = 'bold';
    cardContent.style.fontFamily = 'Montserrat, sans-serif';
  } else {
    cardLabel.innerText = `(${currentCard+1} of ${cards.length}) ${cards[currentCard].label}`;
    cardContent.innerText = "<Click to reveal!>";
    cardContent.style.fontSize = "large";
    cardContent.style.textAlign = "center";
    cardContent.style.color = 'Gray';
    cardContent.style.fontWeight = 'bold';
    cardContent.style.fontFamily = 'Montserrat, sans-serif';
  }

  isFlipped = false;
}

function changeCurrentCardRight() {
  if(currentCard+1<cards.length) currentCard++;
  else currentCard = 0;
  updateCardContent();
  createCookie("currentCard", currentCard);
}

function changeCurrentCardLeft() {
  if(currentCard>0) currentCard--;
  else currentCard = cards.length-1;
  updateCardContent();
  createCookie("currentCard", currentCard);
}

function flipCard() {
  if(cardsEmpty) return;
  var cardContent = document.getElementById("cardContent");

  if(isFlipped) {
    console.log("Not Flipped");
    cardContent.innerText = "<Click to reveal!>";
    cardContent.style.textAlign = "center";
    cardContent.style.color = 'Gray';
    cardContent.style.fontWeight = 'bold';
    cardContent.style.fontFamily = 'Montserrat, sans-serif';
    isFlipped = !isFlipped;
  }else{
    cardContent.innerText = cards[currentCard].desc;
    cardContent.style.textAlign = "left";
    cardContent.style.color = 'black';
    cardContent.style.fontWeight = 'normal';
    cardContent.style.fontFamily = 'Montserrat, sans-serif';
    isFlipped = !isFlipped;
  }

  
}

function createCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/** =======================================================
 *  Import/Export
 *  ======================================================= */

function importCards() {
  if (confirm('Are you sure you want to import cards? WARNING: This will replace all of your current cards if you haven\'t exported them')) {
    var input = document.createElement('input');
    input.type = 'file';
  
    input.onchange = e => { 
  
      // getting a hold of the file reference
      var file = e.target.files[0]; 
  
      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file,'UTF-8');
  
      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
        var content = readerEvent.target.result; // this is the content!
        content = JSON.parse(content);
  
        if(content.length) {
          cards = content;
          cardsEmpty=false;
          currentCard = parseInt(getCookie("currentCard"));
          createCookie("currentCard", currentCard);
          currentCard = 0;
        } else {
          alert("Error, the file you gave us has no cards!");
        }
        
        updateCardContent();
      }
  
    }
  
    input.click();
  }

  
}

function exportCards() {
  var element = document.createElement('a');
  var json_str = JSON.stringify(cards);

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json_str));
  element.setAttribute('download', "Cards");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/** =======================================================
 *  Web Operations
 *  ======================================================= */

updateCardContent();

