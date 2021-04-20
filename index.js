// write JS code here

logoPlacement = document.createElement("img")
fetchAllListings()

function fetchAllListings() {
    // fetch('http://localhost:3000/listings')
    //     .then(response => response.json())
    //     .then(listingsArr => {
    //         renderEachListing(listingsArr)
    //     })
    }


function renderEachListing(listingsArr) {
    listingsArr.forEach(listingObj => {
        // const listingImg = document.createElement("img")
        // listingImg.src = listingObj.image

        // const imageCard = document.querySelector("body > div > div")
        // imageCard.append(listingImg)
    console.log(listingObj)
    })

}