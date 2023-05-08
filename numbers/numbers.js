"use strict";

const $contentArea = $("#content-area");
const NUMBERS_API_URL = "http://numbersapi.com";
//TODO: Clean up names, map function,
async function getOneFact(number){
  const response = await axios(`${NUMBERS_API_URL}/${number}`, { params: { q: 'json' } });
  return response.data;
}

async function getMultipleFacts(numbers){
  const response = await axios(`${NUMBERS_API_URL}/${numbers}`, { params: { q: 'json' } });
  let facts = ""; //TODO: Map functions
  for(let key in response.data){
    facts += response.data[key] + " "
  }
  return facts;
}

async function getFourFacts(number){
  const resultsPromise = await Promise.allSettled(
    [getOneFact(number), getOneFact(number), getOneFact(number), getOneFact(number)]);

  let facts = "";
  for(let fact of resultsPromise){
    facts += fact.value + " "
  }
  return facts;
}

async function appendToContent(promise){
  let str = await promise
  console.log("appended", str)
  $contentArea.append($('<p>').html(str))
}

appendToContent(getOneFact(7))
console.log("passed first append")
appendToContent(getMultipleFacts("7,5,3,10,11"))
console.log("passed second append")
appendToContent(getFourFacts(7))

