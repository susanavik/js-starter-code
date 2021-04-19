// write JS code here

logoPlacement = document.createElement("img")

function fetchAllListings() {
    fetch('http://localhost:3000/listings')
        .then(response => response.json)
        .then(listingsArr => {
            renderEachListing(listingsArr)
        })
    }

fetchAllListings()

function renderEachListing(listingsArr) {
    listingsArr.forEach(listingObj => {
        const listingImg = document.querySelector("body > div > div > img")
        listingImg.scr = listingObj.image
    })

}