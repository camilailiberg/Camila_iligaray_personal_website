console.log("page loaded");

// Global constants
const apiKey = "M8RRGw8VOWfVpQVuH9y13ZSUBupjhdR0";
const limit = 10;
const rating = "g";

// global variables
var pages = 0;
var offset = pages * limit;

const giftForm = document.querySelector("#giftForm");
const websiteContent = document.querySelector(".websiteContent");
const loadMoreButton = document.querySelector(".lodeMore");

giftForm.addEventListener("submit", getResults);

loadMoreButton.addEventListener("click", showMore);

function showMore() {
	pages = pages + 1;
	getResults();
}

async function getResults(event) {
	offset = pages * limit;
	event.preventDefault();
	const giftInput = event.target.giftName;
	const gift = giftInput.value;
	console.log(gift);
	const apiURL = `https://api.giphy.com/v1/gifs/search?q=${gift}&api_key=${apiKey}&limit=${limit}&offset=${offset}&rating=${rating}`;

	const response = await fetch(apiURL);
	const responseData = await response.json();

	console.log(responseData);

	generateHTML(responseData);

	if (loadMoreButton.classList.contains("hidden")) {
		loadMoreButton.classList.remove("hidden");
	}
}

function generateHTML(data) {
	// websiteContent.innerHTML = `
	// <img src="${data.data[0].images.original.url}" alt="${data.data[0].slug}" />
	// `;
	data.data.forEach((element) => {
		websiteContent.innerHTML += `
		<img src="${element.images.original.url}" alt="${element.slug}" />
		`;
	});
}
