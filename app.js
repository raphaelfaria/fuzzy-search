var testInput = document.getElementById("test-input");

var sortItems = ["mediaCheck","clickable","cocktail","backgroundCheck","traceKit","$.masonry","10digit-geo","10digit-invoices","10digit-legal","10digit-payment","10digit-profile","10digit-services","10digit-utils","10digit-validation","ActiveSupport","BigVideo.js","Blueprint","Boxer","BuildingBlocks","Canteen","Case","Contextualize","Cookies","CornerCouch","Countable","walltime-js","wand","waria-checkbox","watch","watcher.js","watchjs-adapter-for-rivetsjs","waterline-criteria","weather","webL10n","webapp","tapmantwo-fork-of-jQuery-UI-MultiSelect-Widget"];

console.log(fuzzySearch.findPatterns("ckac", names));

console.log(sortItems);

testInput.onkeyup = function(event) {
  var search = fuzzySearch.findPatterns(testInput.value, sortItems);
  console.log(search);
};