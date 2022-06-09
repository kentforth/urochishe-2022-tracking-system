const fs = require("fs");
require("dotenv").config();

function readLogFile() {
  fs.readFile(process.env.LOG_FILEPATH, function (err, data) {
    if (err) throw err;

    const textLines = data.toString().replace(/\r\n/g, "\n").split("\n");
    const riders = getRiders(textLines);
    console.log("RIDERS", riders);
    readNameFile();
  });
}

function readNameFile() {
  fs.readFile(process.env.NAME_FILEPATH, function (err, data) {
    if (err) throw err;

    const textLines = data.toString().replace(/\r\n/g, "\n").split("\n");
    const riders = getRidersFromNameFile(textLines);
    return riders;
  });
}

function getRiders(textLines) {
  const riders = [];
  for (let i of textLines) {
    const words = i.split(" ");
    if (words[3] !== undefined) {
      const tagId = i.match(/{(.*)}/);
      const cleanedTagId = tagId[0].replace(/[{}]/g, "");

      const rider = {
        time: +words[3],
        tagId: cleanedTagId,
      };
      riders.push(rider);
    }
    /*   if (i) {
      const tagId = i.match(/{(.*)}/);
      const cleanedTagId = tagId[0].replace(/[{}]/g, "");
      console.log(cleanedTagId);
    }*/
  }
  return riders;
}

function getRidersFromNameFile(textLines) {
  const riders = [];
  for (let i of textLines) {
    const words = i.split(" ");
    if (
      words[words.length - 2] !== undefined ||
      words[words.length - 2] !== ""
    ) {
      riders.push(getWordsInCurlyBraces(i));
    }
  }
  return riders;
}

function getWordsInCurlyBraces(str) {
  const myStr = str.match(/{([^}]+)}/g);
  if (myStr !== null) {
    const tagId = myStr[0].replace(/{|}/g, "");
    const name = myStr[1].replace(/{|}/g, "");
    const number = myStr[2].replace(/{|}/g, "");

    const rider = {
      number: +number,
      name,
      tagId: tagId,
    };
    return rider;
  }

  /*if (str !== null) {
    const result = str
      .match(/{([^}]+)}/g)
      .map((res) => res.replace(/{|}/g, ""));
    console.log(result);
  }*/
}

function replaceCurlyBraces(str) {
  const text = str.replace(/{|}/g, "");
  return text;
}

function convertDate(date) {}

module.exports = { readLogFile, getRiders };
