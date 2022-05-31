// /* eslint-env browser */
// // main.js
const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

update.addEventListener("click", () => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
      quote: "I find your lack of faith disturbing.",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response);
    });
});

deleteButton.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No quote to delete") {
        messageDiv.textContent = "No Darth Vadar quote to delete";
      } else {
        window.location.reload(true);
      }
    })
    .catch(console.error);
});

const deleteIndividual = document.querySelectorAll(".individual-delete");

deleteIndividual.forEach((button) => {
  button.addEventListener("click", (e) => {
    let currentDeleteId = e.path[1].id;
    console.log(currentDeleteId);
    fetch("/quotes", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentDeleteId,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
      })
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
