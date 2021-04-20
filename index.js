// write JS code here

const logoPlacement = document.querySelector("#logo > img")
logoPlacement.src = "assets/main-page-logo.png"

fetchAllListings()

function fetchAllListings() {
    fetch('http://localhost:3000/listings')
        .then(response => response.json())
        .then(listingsArr => {
            const listingImg = document.querySelector("#listing-details > div > img")
            listingImg.src = listingsArr.image
        })
    }


function renderEachListing(listingsArr) {
    listingsArr.forEach(listingObj => {
        const listingImg = document.querySelector("#listing-details > div > img")
        listingImg.src = listingObj.image

        const listingLocation = document.querySelector("#listing-details > div > div")
        listingLocation.innerText = listingObj.location

        // const listingPrice = document.querySelector("#listing-details > div > div > h5")
        // listingPrice.innerText = listingObj.price
    // console.log(listingObj)
    })

}