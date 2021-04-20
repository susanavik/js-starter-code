/********** GLOABL VARIABLES **********/

const logoPlacement = document.querySelector("#logo > img")
logoPlacement.src = "assets/main-page-logo.png"



/********** SHOWS LISTINGS IN SIDEBAR  **********/
function fetchAllListings() {
    fetch('http://localhost:3000/listings')
        .then(response => response.json())
        .then(listingsArr => {
            listingsArr.forEach(listingObj => {
                // console.log(listingObj)
                renderEachListing(listingObj)
            })
        })
}

function renderEachListing(listingObj) {

    const listingLi = document.createElement('li.item')
    listingLi.dataset.id = listingObj.id

    listingLi.innerText = `
    ${listingObj.name}
    `

    const allListingsContainer = document.querySelector('#side-bar > ul')
    allListingsContainer.append(listingLi)
}



/********** CLICKED LISTING DETAILS  **********/
function showListingDetailsHelper(listingObj) {
    const listingImg = document.querySelector('#listing-details > div > img')
    listingImg.src = listingObj.image
    listingImg.alt = listingObj.name

    const listingLocation = document.querySelector('#listing-details > div > div > h4')
    listingLocation.innerText = listingObj.location

    const listingPrice = document.querySelector('#listing-details > div > div > h4')
    listingPrice.innerText = `$${listingObj.price}`

    const listingDesc = document.querySelector('#listing-details > h4')
    listingDesc.innerText = `Description: ${listingObj.description}`
}

function showListingDetails() {
    const listingContainer = document.querySelector('#side-bar')

    listingContainer.addEventListener('click', event => {
        console.log(event.target.dataset.id)

        if (event.target.dataset.id)
            fetch(`http://localhost:3000/listings/${event.target.dataset.id}`)
                .then(resp => resp.json())
                .then(singleListing => {
                    showListingDetailsHelper(singleListing)
                })
    })
}




/********** APP INIT **********/
fetchAllListings()
showListingDetails()