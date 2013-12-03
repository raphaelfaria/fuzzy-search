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
        matchPos: matchPos,
        totalWeight: 0
      }
      if(giveUp === false)
        matches.push(matchedObj);
      // matchPos.length === query.length ? matches.push(matchedObj) : false;
    });

    return calculateRank(matches);
  }

  function calculateRank(matches) {

    matches.forEach(function(match) {
      var substringSize = 0;
      match.matchPos.forEach(function(elem, index) {
        if(match.nameObj[elem].beginSection === true) {
          match.nameObj[elem].weight = (80 - elem);
          match.totalWeight += match.nameObj[elem].weight;
        }
        if(match.matchPos[index - 1] == elem - 1) {
          substringSize++;
          match.nameObj[elem].weight = 20 * Math.pow(2, substringSize) - elem;
          match.totalWeight += match.nameObj[elem].weight;
        }
        else {
          match.nameObj[elem].weight = 10 - elem;
          match.totalWeight += match.nameObj[elem].weight;
        }
      });
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

  console.log(findPatterns('jsc', ['jscrpe', 'JavaScriptCppRuby']));

  // sectionStartArray = sectionStart(name),

});