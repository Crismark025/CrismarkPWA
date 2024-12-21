const accessKey = "peHqz6j41CslohGdGllXiK_pNf4AASbwLD4xa2EVkgI";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = ""; // Clear previous results
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");

    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);

    document.getElementById('search-input').value = "";
  });

  // Show the "Show More" button only if there are more pages to load
  if (results.length === 0 || data.total_pages === page) {
    showMore.style.display = "none";
  } else {
    showMore.style.display = "block";
  }

  page++;
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // Reset to page 1 when a new search is made
  searchImages();
});

// Show More functionality
showMore.addEventListener("click", () => {
  searchImages();
});
