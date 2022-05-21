LOCAL_STORAGE_KEY = "Celeste-golden-property-calculator-result";
N_SUBCHAPTER = 7

function leftClickEvent(divNumber) {
  var elemUpper = document.getElementById("up" + divNumber);
  var elemLower = document.getElementById("lw" + divNumber);
  
  resString = elemLower.innerHTML;
  res = resString.split("/");
  success = Number(res[0]) + 1;
  total = Number(res[1]) + 1;

  lowerString = String(success) + " / " + String(total)
  elemLower.innerHTML = lowerString;
  elemUpper.innerHTML = calculatePercentage(lowerString);

  calculateTotal();
  saveLocalStatus();
}

function rightClickEvent(divNumber) {
  var elemUpper = document.getElementById("up" + divNumber);
  var elemLower = document.getElementById("lw" + divNumber);
  
  resString = elemLower.innerHTML;
  res = resString.split("/");
  success = Number(res[0]);
  total = Number(res[1]) + 1;

  lowerString = String(success) + " / " + String(total)
  elemLower.innerHTML = lowerString;
  elemUpper.innerHTML = calculatePercentage(lowerString);

  calculateTotal();
  saveLocalStatus();
}

function calculateTotal() {
  let percentageTotal = 1;
  for (let i = 1; i <= N_SUBCHAPTER; i++) {
    var elemUpper = document.getElementById("up" + i);
    var percentageEach = elemUpper.innerHTML;
    percentageTotal = (percentageTotal * percentageEach) / 100;
  }

  var elemTotal = document.getElementById("total-upper");
  elemTotal.innerHTML = Math.round(percentageTotal * 100);
}

function saveLocalStatus() {
  var localRecords = {};
  for (let i = 1; i <= N_SUBCHAPTER; i++) {
    var elemLower = document.getElementById("lw" + i.toString());
    resString = elemLower.innerHTML;
    localRecords["subChapter" + i.toString()] = resString;
  }

  localRecordsJson = JSON.stringify(localRecords);
  localStorage.setItem(LOCAL_STORAGE_KEY, localRecordsJson);
}

function loadStorageRecord() {
  var resJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (resJson == null) {
    return;
  }
  
  res = JSON.parse(resJson);
  
  for (let i = 1; i <= N_SUBCHAPTER; i++) {
    divNumber = i.toString();
    subResult = res["subChapter" + divNumber];

    var elemUpper = document.getElementById("up" + divNumber);
    var elemLower = document.getElementById("lw" + divNumber);
    elemLower.innerHTML = subResult;
    elemUpper.innerHTML = calculatePercentage(subResult);
  }
  calculateTotal();
  return;
}

function loadTestData(){
  console.log("test");
  testData = '{"subChapter1":"4 / 7","subChapter2":"1 / 1","subChapter3":"1 / 4","subChapter4":"5 / 7"}';
  
  res = JSON.parse(testData);
  for (let i = 1; i <= N_SUBCHAPTER; i++) {
    divNumber = i.toString();
    subResult = res["subChapter" + divNumber];

    var elemUpper = document.getElementById("up" + divNumber);
    var elemLower = document.getElementById("lw" + divNumber);
    resString = elemLower.innerHTML;
    elemLower.innerHTML = subResult;
    
    elemUpper.innerHTML = calculatePercentage(subResult);
  }
}

function calculatePercentage(lowerString) {
  splitres = lowerString.split("/");
  success = Number(splitres[0]);
  total = Number(splitres[1]);

  if (total == 0) {
    percentage = 0;
  } else {
    percentage = success / total;
  }
  return Math.round(percentage * 100);
}

function clearLocalData() {
  localStorage.clear(LOCAL_STORAGE_KEY);
}