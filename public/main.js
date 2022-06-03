// /* eslint-env browser */
const updateBtns = document.querySelectorAll(".update-button");

let quoteId;

// Add event listener to edit buttons
updateBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    quoteId = event.path[2].id; // Save quoteId
  });
});

const sendQuoteBtn = document.querySelector(".send-message"); // send msg button in modal

sendQuoteBtn.addEventListener("click", () => {
  // on submit, send put request
  let modalNewText = document.querySelector("#message-text");
  updateQuoteText(modalNewText.value);
});

function updateQuoteText(newQuote) {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: quoteId,
      quote: newQuote,
    }),
  }).then((res) => {
    location.reload();
    if (res.ok) return res.redirect("/");
  });
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
