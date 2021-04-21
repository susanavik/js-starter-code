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
                showListingDetailsHelper(listingObj)
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
    listingPrice.innerText = `$${listingObj.price}/Week`

    const listingDesc = document.querySelector('#listing-details > p.description')
    listingDesc.innerText = `${listingObj.description}`

    const listingMapImage = document.querySelector('#map-container img')
    listingMapImage.src = listingObj.map_img
    listingMapImage.alt = listingObj.location
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

    // let divCard = document.createElement('div')
    // divCard.setAttribute('class', 'card')
    // divCard.append(h2, img, p, btn)
    // divCollect.append(divCard)

    const listing_id = listingImg.dataset.id

    const rating = event.target.rating.value
    const review = event.target.review.value


    fetch(`http://localhost:3000/bookings/`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({listing_id, rating, review})
    })
        .then(resp => resp.json())
        .then(updatedListing => {
            console.log(updatedListing)
        })

    const newLi = document.createElement('li')
    newLi.innerText = review
    const reviewView = document.querySelector("#review-container > ul")
    reviewView.append(newLi)

    })

/********** REMOVE REVIEW **********/
const reviewView = document.querySelector("#review-container > ul")

// const deleteButton = document.createElement('button')
//     // deleteButton.setAttribute('class', 'delete-btn')
//     // deleteButton.setAttribute('id', booking.id)
//     deleteButton.innerText = "delete"
//     reviewView.append(deleteButton)


//     deleteButton.addEventListener('click', (event) => {
//     console.log(event.target.dataset)
//         delete(event)
//     })
//     // console.log(event.target.dataset)
//     //     delete(event)
//     // })


// function delete(event){
//     fetch(`http://localhost:3000/bookings/${ReviewId}`, {
//       method: "DELETE"
//     })
// }

// reviewView.addEventListener('click', event => {
//     const reviewId = event.target.parentElement.dataset.id
//     event.target.parentElement.parentElement.remove()
//     deleteReview(reviewId)
// })


/********** APP INIT **********/
fetchAllListings()
showListingDetails()