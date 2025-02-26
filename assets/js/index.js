import generateSEOSafeProductName from "./functions.js";

const urlParams = new URLSearchParams(window.location.search);
const sessionID = urlParams.get("itemID");

window.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('./assets/js/blog.json');
        const data = await response.json();

        mainUI(data);

        for (const itemData of data) {
            createDivMostLiked(itemData);

            if (itemData.itemCategory === "Electronics") {
                createDivElectronics(itemData);
            }
        }

    } catch (error) {
        console.error('Error during fetching data:', error);
    }
});

function mainUI(data) {
    const l_card = document.querySelector("[data-itemData='l_card']");
    const sm_card_1 = document.querySelector("[data-itemData='sm_card_1']");
    const sm_card_2 = document.querySelector("[data-itemData='sm_card_2']");

    l_card.querySelector("img").setAttribute('src', data[0].itemPic);
    l_card.querySelector("img").setAttribute('alt', data[0].itemShortName);
    l_card.querySelector(".headline").innerText = data[0].itemShortName;
    l_card.setAttribute('href', `blog.html?itemID=${data[0].itemID}&itemName=${generateSEOSafeProductName(data[0].itemName)}`);

    sm_card_1.querySelector("img").setAttribute('src', data[1].itemPic);
    sm_card_1.querySelector("img").setAttribute('alt', data[1].itemShortName);
    sm_card_1.querySelector(".headline").innerText = data[1].itemShortName;
    sm_card_1.setAttribute('href', `blog.html?itemID=${data[1].itemID}&itemName=${generateSEOSafeProductName(data[1].itemName)}`);

    sm_card_2.querySelector("img").setAttribute('src', data[2].itemPic);
    sm_card_2.querySelector("img").setAttribute('alt', data[2].itemShortName);
    sm_card_2.querySelector(".headline").innerText = data[2].itemShortName;
    sm_card_2.setAttribute('href', `blog.html?itemID=${data[2].itemID}&itemName=${generateSEOSafeProductName(data[2].itemName)}`);
}

function createDivMostLiked(e) {
    const itemHTML = `
        <li class="item">

            <a href="blog.html?itemID=${e.itemID}&itemName=${generateSEOSafeProductName(e.itemName)}" hreflang="en" class="card" aria-label="Blog item">

                <div class="card_header">

                    <img src="${e.itemPic}" alt="${e.itemShortName}"></img>

                    <div class="brand">
                        <b>${e.itemBrand}</b>
                    </div>

                </div>

                <div class="card_body">
                    <p class="time"><span>${e.itemCategory}, ${e.itemSubCategory}</span> | <span>${e.itemTime}</span></p>
                </div>

                <div class="card_footer">

                    <div class="card_title">
                        ${e.itemName}
                    </div>

                </div>

            </a>

        </li>
      `;

    const mostLikedContainer = document.querySelector("[data-itemData='most_liked']");
    if (mostLikedContainer) {
        mostLikedContainer.insertAdjacentHTML("beforeend", itemHTML);
    }
}

function createDivElectronics(e) {
    const itemHTML = `
        <li class="item">

            <a href="blog.html?itemID=${e.itemID}&itemName=${generateSEOSafeProductName(e.itemName)}" hreflang="" class="card">

                <div class="card_header">

                    <img src="${e.itemPic}" alt="${e.itemShortName}"></img>

                    <div class="brand">
                        <b>${e.itemBrand}</b>
                    </div>

                </div>

                <div class="card_body">
                    <p class="time"><span>${e.itemCategory}, ${e.itemSubCategory}</span> | <span>30 Jun 2024</span></p>
                </div>

                <div class="card_footer">

                    <div class="card_title">
                        ${e.itemName}
                    </div>

                </div>

            </a>

        </li>
`;

    const electronicsContainer = document.querySelector("[data-itemData='electronics']");
    if (electronicsContainer) {
        electronicsContainer.insertAdjacentHTML("beforeend", itemHTML);
    }
}