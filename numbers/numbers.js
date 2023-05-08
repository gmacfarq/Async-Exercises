"use strict";

const $contentArea = $("#content-area");
const NUMBERS_API_URL = "http://numbersapi.com";

async function oneFact(number){
  const response = await axios(`${NUMBERS_API_URL}/${number}`, { params: { q: 'json' } });
  return response.data;
}

async function onePromise(number){
  const response = axios(`${NUMBERS_API_URL}/${number}`, { params: { q: 'json' } });
  return response;
}

async function multipleFacts(numbers){
  const response = await axios(`${NUMBERS_API_URL}/${numbers}`, { params: { q: 'json' } });
  let facts = "";
  for(let key in response.data){
    facts += response.data[key] + " "
  }
  return facts;
}

async function fourFacts(number){
  const resultsPromise = await Promise.all(
    [onePromise(number), onePromise(number), onePromise(number), onePromise(number)]);

  let facts = "";
  for(let fact of resultsPromise){
    facts += fact.data + " "
  }
  return facts;
}

async function appendToContent(promise){
  let str = await promise
  $contentArea.append($('<p>').html(str))
}

appendToContent(oneFact(7))
appendToContent(multipleFacts("7,5,3,10,11"))
appendToContent(fourFacts(7))

