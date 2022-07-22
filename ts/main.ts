const wordId = document.getElementById("wordOfTheDay");
const defId = document.getElementById("defOfWord");

async function httpGet(url: string) {
  const res = await fetch(url);
  const json = await res.json();

  let jsonString = JSON.stringify(json);
  let array = JSON.parse(jsonString);
  let object = array[0];

  return object;
}

let object: any;

async function getObject() {
  object = await httpGet("https://random-words-api.vercel.app/word");

  return object;
}

getObject();

async function getWord() {
  return `${object.word}`;
}

async function getDef() {
  return object.definition;
}

let changeWord: boolean;

function getDate() {
  const d = new Date();

  if (d.getHours() === 20 && d.getMinutes() === 18) {
    changeWord = true;
  }
}

function changeFunc() {
  changeWord = true;
}

window.onload = () => {
  changeFunc();
};

async function setInnerHtml() {
  if (changeWord === true) {
    wordId!.innerHTML = await getWord();
    defId!.innerHTML = await getDef();
    changeWord = false;
  }
}

getDate();
setInterval(() => getDate(), 100);
setInterval(() => setInnerHtml(), 100);
