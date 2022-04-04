
const reportLinkClass = document.querySelector('.report-link');
const reportClass = document.querySelector('.report');
const reportBtn = document.querySelector('#report-btn');
const generateBtn = document.querySelector('#generate');

async function getRandomObjectsInfo() {
  const res = await fetch(
    `http://localhost:3000/generate`
  );
  return res.json();
}

function setObjectValues(randomObjectsInfo) {
  let reportParagraph = document.querySelectorAll('.report p');
  reportParagraph[0].innerHTML="Alphabetical string: " + randomObjectsInfo.string;
  reportParagraph[1].innerHTML="Real numbers: " + randomObjectsInfo.realnum;
  reportParagraph[2].innerHTML="Integers: " + randomObjectsInfo.int;
  reportParagraph[3].innerHTML="Alphanumerics: " + randomObjectsInfo.alphanum;
}

generateBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  reportClass.style.display = 'none';
  reportLinkClass.style.display = 'block';
  const randomObjectsInfo = await getRandomObjectsInfo();
  setObjectValues(randomObjectsInfo);
});

reportBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  reportClass.style.display = 'block';
});
