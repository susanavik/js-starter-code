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
    listingImg.dataset.id = listingObj.id

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
        console.log(event.target.dataset.id)

        if (event.target.dataset.id)
            fetch(`http://localhost:3000/listings/${event.target.dataset.id}`)
                .then(resp => resp.json())
                .then(singleListing => {
                    showListingDetailsHelper(singleListing)
                })
    })
}

/********** REVIEW FORM **********/

const reviewForm = document.querySelector("#review-container > div")
const listingImg = document.querySelector('#listing-details > div > img')

reviewForm.addEventListener('submit', event => {
    event.preventDefault()


    const rating = event.target.rating.value
    const review = event.target.review.value
    const newLi = document.createElement('li')
    newLi.innerText = review
    const reviewView = document.querySelector("#review-container > ul")
    reviewView.append(newLi)

    
    fetch(`http://localhost:3000/bookings/${listingImg.dataset.id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({rating, review})
    })
        .then(resp => resp.json())
        .then(updatedListing => {
            console.log(updatedListing)
        })
})

/********** REMOVE REVIEW **********/
const reviewView = document.querySelector("#review-container > ul")

reviewView.addEventListener('click', event => {
    const reviewId = event.target.parentElement.dataset.id
    event.target.parentElement.parentElement.remove()
    deleteReview(reviewId)
})

function deleteReview(ReviewId){
    fetch(`http://localhost:3000/bookings/${ReviewId}`, {
      method: "DELETE"
    })
  }

/********** APP INIT **********/
fetchAllListings()
showListingDetails()