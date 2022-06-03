// /* eslint-env browser */
const updateBtns = document.querySelectorAll(".update-button");

let quoteId;

// Add event listener to edit buttons
updateBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    quoteId = event.path[2].id; // Save quoteId
  });
});

const sendQuoteBtn = document.querySelector(".send-message");
sendQuoteBtn.addEventListener("click", () => {
  // console.log(quoteId);
  let modalNewText = document.querySelector("#message-text");
  updateQuoteText(modalNewText.value);
  console.log(modalNewText.value + " for ID:" + quoteId);
});

function updateQuoteText(newQuote) {
  console.log("gonna send the fetch!");

  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: quoteId,
      quote: newQuote,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response);
    });
}

// Callback for Edit Button click event

// update.addEventListener("click", () => {
//   fetch("/quotes", {
//     method: "put",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name: "Darth Vadar",
//       quote: "I find your lack of faith disturbing.",
//     }),
//   })
//     .then((res) => {
//       if (res.ok) return res.json();
//     })
//     .then((response) => {
//       console.log(response);
//     });
// });
// TODO: remove modal once submitted
const deleteIndividual = document.querySelectorAll(".individual-delete");

deleteIndividual.forEach((button) => {
  button.addEventListener("click", (e) => {
    // console.log(e.path[2].id);
    let currentDeleteId = e.path[2].id;
    console.log(currentDeleteId);
    fetch("/quotes", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentDeleteId,
      }),
    })
      .then((res) => {
        // console.log(res);
        location.reload();
        // if (res.ok) return res.json();
      })
      // .then(() => {
      //   location.reload();
      // })
      // .then((response) => {
      //   if (response === "No quote to delete") {
      //     messageDiv.textContent = "No Darth Vadar quote to delete";
      //   } else {
      //     window.location.reload(true);
      //   }
      // })
      .catch(console.error);
  });
});

// API request to LOTR API.
const newQuoteBtn = document.querySelector(".new-quote");
newQuoteBtn.addEventListener("click", function (e) {
  fetch("/clicked", { method: "POST" })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        console.log("Click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });

  // todo - refactor - Auto reload instead of a delay forced one to update the UI
  setTimeout(() => {
    location.reload();
  }, 800);
});
