//Add another required item button pressed.

//get the information from the form inputs

//on click submit, post the information to the database.

document
  .querySelector("#new-guide-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    let guideTitle = document.getElementById("inputTitle").value;
    let photoURL = document.getElementById("photo_url").value;
    let guideDescription = document.getElementById("inputDescription").value;
    let requiredItems = document.getElementById("inputRequirements").value;
    let stepItems = document.getElementById("inputSteps").value;

    console.log(typeof guideTitle);

    //post request that sends the data to the backend
    axios
      .post("http://localhost:4000/guidepage", {
        title: guideTitle,
        imageURL: photoURL,
        description: guideDescription,
        reqItems: requiredItems,
        steps: stepItems,
      })
      .then(() => {
        window.location.pathname = "frontend/mainpage/mainpage.html";
      });
  });

//Tested, now need to create a POST request to the backend.
