/********** GLOABL VARIABLES **********/
const appBodyContainer = document.querySelector("div.parent")
let visible = appBodyContainer.style.display = "none"
const carousel = document.querySelector("#carousel-container > div.carousel-inner")
const login = document.querySelector("#login")
const listingImg = document.querySelector('#listing-details > div > img')
const reviewForm = document.querySelector("#create-rating")
const reviewView = document.querySelector("#review-container > ul")



/********** LOGO  **********/

const logoBanner = document.querySelector('body > div.banner > img')
logoBanner.src = 'assets/cover.png'

const logoPlacement = document.querySelector('#logo > img')
logoPlacement.src = "assets/main-page-logo.png"



/********** OPENING CAROSEL AND LOGIN  **********/
document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.querySelector('div.container')
    const bannerImage = document.querySelector('body > div.banner')

    const body = document.querySelector("body")
    body.addEventListener("click", event => {
        //   hide & seek with the form
        if (event.target.id === "login") {
            appBodyContainer.style.display = ""
            carousel.style.display = "none"
            loginContainer.style.display = "none"
            bannerImage.style.display = "none"
            renderGuestName()
        }
        else if (event.target.className === "logout") {
            appBodyContainer.style.display = "none"
            carousel.style.display = ""
            loginContainer.style.display = ""
            bannerImage.style.display = ""
            // console.log(appBodyContainer)
        }
    })
})

function renderGuestName() {
    const userWelcome = document.querySelector('#welcome-banner h2')

    fetch('http://localhost:3000/guests')
        .then(resp => resp.json())
        .then(userArr => {
            userWelcome.textContent = `Welcome Back, ${userArr[0].name}!`
        })
}



/********** SHOWS LISTINGS IN SIDEBAR  **********/
function fetchAllListings() {
    fetch('http://localhost:3000/listings')
        .then(response => response.json())
        .then(listingsArr => {
            listingsArr.forEach(listingObj => {
                renderEachListing(listingObj)
                showListingDetailsHelper(listingsArr[8])
            })
        })
}

function renderEachListing(listingObj) {
    // console.log(listingObj)

    const listingLi = document.createElement('li.item')
    listingLi.dataset.id = listingObj.id
    listingLi.className = "listing-item"

    listingLi.innerText = `
    ${listingObj.name}
    `

    const allListingsContainer = document.querySelector('#side-bar > ul')
    allListingsContainer.append(listingLi)
}


/********** CLICKED LISTING DETAILS  **********/
function showListingDetailsHelper(listingObj) {
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

    reviewForm.dataset.id = listingObj.id
    reviewView.dataset.id = listingObj.id

    console.log(listingObj)
    reviewView.innerHTML = ""
    if (listingObj.reviews){
    // console.log(listingObj.reviews[1].comment)
        listingObj.reviews.forEach(review => {
            const reviewComment = review.comment
            const reviewRating = review.rating
            const reviewLi = document.createElement('li')
            reviewLi.innerText = reviewComment
            reviewView.append(reviewLi)
            console.log(review)
        })
    }
}

function showListingDetails() {
    const listingContainer = document.querySelector('#side-bar')

    listingContainer.addEventListener('click', event => {
        if (event.target.className === "listing-item") {
            fetch(`http://localhost:3000/listings/${event.target.dataset.id}`)
                .then(resp => resp.json())
                .then(singleListing => {
                    showListingDetailsHelper(singleListing)
                })
        }
    })
}

/********** REVIEW FORM **********/



reviewForm.addEventListener('submit', event => {
    event.preventDefault()

    const listingId = event.target.dataset.listingId
    console.log(event.target)
    
    const newReviewObj = {
        rating: event.target.rating.value,
        comment: event.target.comment.value,
        listing_id: listingId
    }
    console.log(newReviewObj)
    // const listingId = listingImg.dataset.id
    // console.log(listingId)
    // console.log(listingImg.dataset.id)

    // fetch('http://localhost:3000/reviews', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify(newReviewObj)
    // })
    //     .then(resp => resp.json())
    //     .then(newReviewObj => {
    //         console.log(newReviewObj)
    //         const newReviewLi = document.createElement('li')
    //         newReviewLi.innerText = `${newReviewObj.rating} ${newReviewObj.comment}`
    //         const viewReview = document.querySelector("#review-container ul.past-reviews")
    //         viewReview.append(newReviewLi)

    //         const deleteButton = document.createElement('button')
    //         deleteButton.className = 'delete-btn'
    //         // deleteButton.id = listing_id
    //         deleteButton.innerText = "x"
    //         viewReview.append(deleteButton)
    
    //         if (event.target.className === 'delete-btn') {
    //             const reviewLi = event.target.closest('li')
    //             reviewLi.remove()
    
    //             fetch(`http://localhost:3000/reviews/${reviewLi.dataset.id}`, {
    //                 method: 'DELETE'
    //             })
    //                 .then(response => response.json())
    //                 .then(console.log)
    //         }
        // })
        
})

/********** DELETE REVIEW: STILL WORKING... **********/


/********** REMOVE REVIEW **********/

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



/********** BOOKING FORM **********/
const modal = document.querySelector("#modal")
document.querySelector("#create-booking-button").addEventListener("click", () => {
    modal.style.display = "block"
    //   console.log(modal)
})
// Hide the form
// modal.addEventListener("submit", event => {
//     event.preventDefault()
//     // console.log(e.target)
//     modal.style.display = "none"
//     if (event.target.dataset.action === "close") {

modal.addEventListener("submit", e => {
    e.preventDefault()
    modal.style.display = "none"
    if (e.target.dataset.id === "new-booking-form") {
        const bookingId = parseInt(event.target.dataset.id)
        console.log(bookingId)

        // fetch ('http://localhost:3000/bookings', {

        // })
        // const bookingUl = document.createElement('ul.booking')
        

    }
})


/********** APP INIT **********/
fetchAllListings()
showListingDetails()

