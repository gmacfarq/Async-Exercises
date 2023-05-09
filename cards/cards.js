"use strict";

const BASE_CARD_URL = "https://deckofcardsapi.com/api/deck"
const $contentArea = $("#content-area");

async function getShuffledDeck() {
  const deck = await axios(`${BASE_CARD_URL}/new/shuffle/`, {params: {deck_count: 1}});
  const deckId = deck.data.deck_id;

  return deckId
}

async function getSingleCard(deckId){
  deckId = await deckId;

  const card = await axios(`${BASE_CARD_URL}/${deckId}/draw/`, {params: {count: 1}});
  const cardData = card.data.cards[0];

  if (!cardData) {
    return false
  }
  return `${cardData.value} of ${cardData.suit}`
}

const deckId = getShuffledDeck();
// getSingleCard(deckId);
// getSingleCard(deckId);

$contentArea.on("click", "button", handleClick);

async function handleClick(evt){
  evt.preventDefault();

  const card = await getSingleCard(deckId);
  if (!card) {
    $("button").remove();
    return;
  }

  $contentArea.append(`<p>${card}</p>`);
}