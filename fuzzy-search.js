// ideia = guardar pesos em uma array, por posição da entrada


window.onload = (function () {

  function findPatterns(pattern, name) {
    var matches = [];

    name.forEach(function(string, index) {
      var stringIndex   = 0,
          query         = pattern.replace(/\s+/g, '').split(''),
          queryIndex    = 0,
          matchPos      = [],
          nameObj       = makeNameObj(string),
          priorityMatch = false,
          otherMatch    = false,
          giveUpUpper   = false,
          giveUp        = false;

      while(query.length > 0) {
        if(priorityMatch === false && giveUpUpper === false) {
          //find uppercase matches (later, look for possible section starters)
          while(stringIndex < nameObj.length) {
            if(nameObj[stringIndex].c.toLowerCase() === query[queryIndex].toLowerCase() && nameObj[stringIndex].beginSection) {
              matchPos.push(stringIndex);
              query.splice(queryIndex,1);
              priorityMatch = true;
              break;
            } else stringIndex++;
          }

          if (priorityMatch === false) {
            giveUpUpper = true;
            stringIndex = 0;
          }
          else {
            stringIndex = matchPos[matchPos.length - 1] + 1; //gets index of last element added to list of matches
            priorityMatch = false; //reset search
          }
        }

        if(giveUpUpper === true) {
          while(stringIndex < nameObj.length) {
            if(nameObj[stringIndex].c.toLowerCase() === query[queryIndex].toLowerCase()) {
              matchPos.push(stringIndex);
              query.splice(queryIndex,1);
              otherMatch = true;
              giveUpUpper = false; //reset upper search
              break;
            } else stringIndex++;
          }

          if(otherMatch === false) {
            giveUp = true;
          }
          else {
            stringIndex = matchPos[matchPos.length - 1] + 1; //gets index of last element added to list of matches
            otherMatch = false; //reset search
          }
        }

        if(giveUp === true)
          break;
      }

      var matchedObj = {
        name: string,
        pos: index,
        nameObj: nameObj,
        matchPos: matchPos
      }
      if(giveUp === false)
        matches.push(matchedObj);
      // matchPos.length === query.length ? matches.push(matchedObj) : false;
    });

    return matches;
  }

  function isUpper(ch) {
    return ch.toUpperCase() === ch;
  }

  function makeNameObj(name) {
    var nameObj = [];

    for(var i = 0; i < name.length; i++) {
      var n = {
                c: name[i],
                beginSection: i === 0 || (isUpper(name[i]) && !isUpper(name[i - 1])) ? true : false,
                weight: 0
              }
      nameObj.push(n);
    }
    return nameObj;
  }

  console.log(findPatterns('jasi', ['JavaScriptInfo']));

  // sectionStartArray = sectionStart(name),

});