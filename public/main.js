// /* eslint-env browser */
const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

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

// Code to delete a single - unspecified quote (old & unscalable)
// deleteButton.addEventListener("click", (_) => {
//   fetch("/quotes", {
//     method: "delete",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name: "Darth Vadar",
//     }),
//   })
//     .then((res) => {
//       if (res.ok) return res.json();
//     })
//     .then((response) => {
//       if (response === "No quote to delete") {
//         messageDiv.textContent = "No Darth Vadar quote to delete";
//       } else {
//         window.location.reload(true);
//       }
//     })
//     .catch(console.error);
// });

const deleteIndividual = document.querySelectorAll(".individual-delete");
// TODO/FIX: Update message div repending on success or not (maybe not necessary)
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
