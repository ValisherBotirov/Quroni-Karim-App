const outputSuraName = document.querySelector(".left__block--item");
const parentHtml1 = document.querySelector(".scroll--item");
const arabicText = document.querySelector(".arabicText");
const uzbekText = document.querySelector(".uzbekText");
const parentArabicText = document.querySelector(".arabic");
const parentUzbekText = document.querySelector(".uzbek");
const btnArabic = document.querySelector(".btn--arabic");
const btnUzbek = document.querySelector(".btn--uzb");
const audio = document.querySelector(".audio");

let tartibRaqami = 1;

// Suralarni arabcha va uzbekchasini oloib kelish
const getSura = async function (number) {
  // console.log(number);
  parentArabicText.innerHTML = "";
  parentUzbekText.innerHTML = "";
  const dataJson = await fetch(
    `https://quranenc.com/api/translation/sura/uzbek_mansour/${number}`
  );
  const data = await dataJson.json();
  const data2 = data.result;
  for (let el of data2) {
    // console.log(el);
    outputArabicText(el.arabic_text, el.translation);
  }
};

// Suralarni nomlarini chap tomondagi difga olib keladi
const suraName = async function () {
  const dataJson = await fetch(` http://api.alquran.cloud/v1/surah`);
  const data = await dataJson.json();
  const data2 = data.data;
  const suraNameArr = [];
  for (let el of data2) {
    renderHtml(el.englishName);
    suraNameArr.push(el.englishName);
  }
  let id;
  // console.log(suraNameArr);
  const suraNames = document.querySelectorAll(".left__block--item");
  suraNames.forEach(function (val) {
    val.addEventListener("click", function () {
      id = val.id;
      tartibRaqami = 1 + suraNameArr.indexOf(val.textContent);
      getSura(tartibRaqami);
      setAudio(tartibRaqami);
      let topilgan = suraNameArr.find((val) => val === id);
      if (val.id == topilgan) {
        val.classList.add("active");
      } else {
        val.classList.remove("active");
      }
    });
  });
};
suraName();

// output sura name
const renderHtml = function (suraName) {
  let html = `
  <p class="left__block--item" id="${suraName}">${suraName}</p>
  `;
  parentHtml1.insertAdjacentHTML("beforeend", html);
};

// Output arabic and uzbek text
const outputArabicText = function (arabicText, uzbekText) {
  let html1 = ` <p class="arabicText">${arabicText}</p>`;
  parentArabicText.insertAdjacentHTML("beforeend", html1);
  let html2 = `<p class="uzbekText">${uzbekText}</p>`;
  parentUzbekText.insertAdjacentHTML("beforeend", html2);
};

// Arabic to uzbek
btnUzbek.addEventListener("click", function (e) {
  e.preventDefault();
  parentArabicText.style.opacity = 0;
  parentUzbekText.style.opacity = 1;
  btnUzbek.classList.add("active");
  btnArabic.classList.remove("active");
});

// Uzbek to arabic
btnArabic.classList.add("active");
btnArabic.addEventListener("click", function (e) {
  e.preventDefault();
  parentArabicText.style.opacity = 1;
  parentUzbekText.style.opacity = 0;
  btnArabic.classList.add("active");
  btnUzbek.classList.remove("active");
});

// audioni qo'shish un
const setAudio = async function (number) {
  const dataJson = await fetch(`https://api.quran.sutanlab.id/surah/${number}`);
  const data = await dataJson.json();
  console.log(data.data.verses);
  const audios = data.data.verses;
  audios.forEach(function (val) {
    // console.log(val.audio.primary);
    getAudio(val.audio.primary);
  });
};
setAudio();

const getAudio = function (audio) {
  document.getElementById("my-audio").setAttribute("src", `${audio}`);
};

// audio chiqishi kerak edi
// audio = document.querySelector("audio");
// audio = new Audio(
//   "094. Tohir Mahkamov - Ko'rolmaslar bor (new version) (Bestmedia.Uz).mp3"
// );

// audio.addEventListener("ended", function () {
//   audio.src = "100. Tohir Mahkamov - Dada (Bestmedia.Uz).mp3";
//   audio.pause();
//   audio.load();
//   audio.play();
// });
