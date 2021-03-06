// /* eslint-env browser */
const updateBtns = document.querySelectorAll(".update-button");
const modalText = document.querySelector(".col-form-label");

let quoteId;

// Add event listener to edit buttons
updateBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    quoteId = event.path[2].id; // Save quoteId

    // get character name to put in modal
    let charName = event.path[2].children[0].childNodes[5].innerText;
    modalText.innerHTML = `New quote for ${charName}.`;
  });
});

const sendQuoteBtn = document.querySelector(".update-quote--btn"); // send msg button in modal

sendQuoteBtn.addEventListener("click", () => {
  // on submit, send put request
  let modalNewText = document.querySelector("#message-text");
  updateQuoteText(modalNewText.value);
});

function updateQuoteText(newQuote) {
  // console.log(quoteId, newQuote);
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: quoteId,
      quote: newQuote,
    }),
  })
    .then((res) => {
      location.reload();
    })
    .catch(console.error);
}

// Callback for Edit Button click event
// TODO: remove modal once submitted
const deleteIndividual = document.querySelectorAll(".individual-delete");

deleteIndividual.forEach((button) => {
  button.addEventListener("click", (e) => {
    // console.log(e.path[2].id);
    let currentDeleteId = e.path[2].id;

    fetch("/quotes", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentDeleteId,
      }),
    })
      .then((res) => {
        if (res.ok) return location.reload();
      })
      .catch(console.error);
  });
});

// API request to LOTR API for random quote
//  + ADD RANDOM QUOTE BUTTON
const newQuoteBtn = document.querySelector(".new-quote");
newQuoteBtn.addEventListener("click", function (e) {
  fetch("/clicked", { method: "POST" })
    .then(function (response) {
      if (response.ok) return location.reload(); // if POST is ok, reload the page
    })
    .catch(function (error) {
      console.log(error);
    });
});

// const customQuoteForm = document.querySelector("#custom-quote");

const addCustomQuoteBtn = document.querySelector(".custom-submit");
setInterval(() => {
  let authorCustom = document.querySelector(".custom-author");
  let quoteCustom = document.querySelector(".custom-quote");
  if (authorCustom.value.length > 0 && quoteCustom.value.length > 0) {
    addCustomQuoteBtn.classList.remove("block-btn");
  } else {
    addCustomQuoteBtn.classList.add("block-btn");
  }
}, 500);
