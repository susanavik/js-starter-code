/********** GLOABL VARIABLES **********/

const logoPlacement = document.querySelector("#logo > img")
logoPlacement.src = "assets/main-page-logo.png"



/********** SHOWS LISTINGS IN SIDEBAR  **********/
function fetchAllListings() {
    fetch('http://localhost:3000/listings')
        .then(response => response.json())
        .then(listingsArr => {
            listingsArr.forEach(listingObj => {
                renderEachListing(listingObj)
            })
        })
}

function renderEachListing(listingObj) {

    const listingLi = document.createElement('li')
    listingLi.dataset.id = listingObj.id
    listingLi.className = "listing-item"

    listingLi.innerText = listingObj.name

    const allListingsContainer = document.querySelector('#side-bar > ul')
    allListingsContainer.append(listingLi)

    if (listingObj.id == 12){
        showListingDetailsHelper(listingObj)
    }
}



/********** CLICKED LISTING DETAILS  **********/
function showListingDetailsHelper(listingObj) {
    const listingImg = document.querySelector('#listing-details > div > img')
    listingImg.src = listingObj.image
    listingImg.alt = listingObj.name

    const listingLocation = document.querySelector('#listing-details > div > div > h2')
    listingLocation.innerText = listingObj.location

    const listingPrice = document.querySelector("#listing-details > div > div > h3")
    listingPrice.innerText = `$${listingObj.price}`

    const listingDesc = document.querySelector('#listing-details > h3')
    listingDesc.innerText = `Description: ${listingObj.description}`
}

function showListingDetails() {
    const listingContainer = document.querySelector('#side-bar')

    listingContainer.addEventListener('click', event => {
        const listingId = event.target.dataset.id

        if (event.target.className === "listing-item")
            fetch(`http://localhost:3000/listings/${listingId}`)
                .then(resp => resp.json())
                .then(singleListing => {
                    showListingDetailsHelper(singleListing)
                })
    })
}




/********** APP INIT **********/
fetchAllListings()
showListingDetails()