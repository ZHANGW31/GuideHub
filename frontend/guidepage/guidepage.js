//TODO - implementations needed for the guide page

//TODO: Implementation for comment submission

//TODO: Implementation for ratings

//TODO: GET request to backend to get the guide information

//Using local storage to get data from the mainpage to load this page.

//Create the page dynamically based on information provided.

let getResponse = [];

window.onload = (event) => {
  axios.get("/loadguide").then((response) => {
    getResponse = response.data;

    let guideTitle;
    let photoURL;
    let guideDescription;
    let requiredItems;
    let stepItems;

    for (var i = 0; i < getResponse.length; i++) {
      guideTitle = getResponse.title;
      photoURL = getResponse.imageURL;
      guideDescription = getResponse.description;
      requiredItems = getResponse.reqItems;
      stepItems = getResponse.stepItems;
    }
    setBannerImage(photoURL);

    let guide = buildGuide(
      guideTitle,
      guideDescription,
      requiredItems,
      stepItems
    );

    let guideContainer = document.getElementById("guide-container");
    guideContainer.appendChild(guide);
  });
};
//Set banner image
function setBannerImage(photoURL) {
  let banner = document.getElementById("guide-banner");
  let img = document.createElement("img");

  if (photoURL === "") {
    photoURL =
      "https://images.unsplash.com/photo-1582990760381-b0427c50519b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80";
    img.setAttribute("src", photoURL);
  } else {
    img.setAttribute("src", photoURL);
  }

  banner.appendChild(img);
}
//build the guide
function buildGuide(guideTitle, guideDescription, requiredItems, stepItems) {
  let guideContainer = document.getElementById("guide-container");

  let title = document.createElement("h1");
  title.setAttribute("class", "text-center pt-4 mb-3");
  title.innerHTML = guideTitle;

  let hRule = document.createElement("hr");
  hRule.setAttribute("mt-5");

  let descriptionHeader = document.createElement("h4");
  descriptionHeader.innerHTML = "Description";

  let guideDesBody = document.createElement("p");
  guideDesBody.innerText = guideDescription;

  let guideReqHeader = document.createElement("h4");
  guideReqHeader.setAttribute("class", "mt-4");
  guideReqHeader.innerHTML = "Requirements";

  let guideRequiredItems = document.createElement("p");
  guideRequiredItems.setAttribute("class", "mt-4");
  guideRequiredItems.innerText = requiredItems;

  let guideStepHeader = document.createElement("h4");
  guideStepHeader.setAttribute("class", "mt-4");
  guideStepHeader.innerHTML = "Steps";

  let guideStepItems = document.createElement("p");
  guideStepItems.setAttribute("class", "mt-4");
  guideStepItems.innerText = stepItems;

  guideContainer.appendChild(title);
  guideContainer.appendChild(hRule);
  guideContainer.appendChild(descriptionHeader);
  guideContainer.appendChild(guideDesBody);
  guideContainer.appendChild(guideReqHeader);
  guideContainer.appendChild(guideRequiredItems);
  guideContainer.appendChild(guideStepHeader);
  guideContainer.appendChild(guideStepItems);

  return guideContainer;
}
