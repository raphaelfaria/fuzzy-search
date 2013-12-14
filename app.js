var testInput = document.getElementById("test-input");

var sortItems = ["mediaCheck", "mckacCeKdbCj","clickable","cocktail","backgroundCheck","traceKit","$.masonry","10digit-geo","10digit-invoices","10digit-legal","10digit-payment","10digit-profile","10digit-services","10digit-utils","10digit-validation","ActiveSupport","BigVideo.js","Blueprint","Boxer","BuildingBlocks","Canteen","Case","Contextualize","Cookies","CornerCouch","Countable","walltime-js","wand","waria-checkbox","watch","watcher.js","watchjs-adapter-for-rivetsjs","waterline-criteria","weather","webL10n","webapp","tapmantwo-fork-of-jQuery-UI-MultiSelect-Widget"];
// var sortItems = ["Case", "CanCteen", "Ccookies"];
// var sortItems = ["Case"];

console.log(fuzzySearch.findPatterns("cc", sortItems));

var content = "";

content = function () {
  var array = "";
  sortItems.forEach(function(item) {
    array += "<p>" + item + "</p>";
  });
  return array;
}();

var results = document.getElementById("result");
result.innerHTML = content;

testInput.onkeyup = function(event) {
  var search = fuzzySearch.findPatterns(testInput.value, sortItems);
  content = function () {
    var array = "";
    search.forEach(function(item) {
      array += "<p>" + item.name + "</p>";
    });
    return array;
  }();
  result.innerHTML = content;
};