/********** GLOABL VARIABLES **********/
const appBodyContainer = document.querySelector("div.parent")
let visible = appBodyContainer.style.display = "none"
const carousel = document.querySelector("#carousel-container > div.carousel-inner")
const login = document.querySelector("#login")
let currentUserId;
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
        }
    })
})
function renderGuestName() {
    const userWelcome = document.querySelector('#welcome-banner h2')

    fetch('http://localhost:3000/guests')
        .then(resp => resp.json())
        .then(userArr => {
            userWelcome.textContent = `Welcome Back, ${userArr[0].name}!`
            currentUserId = userArr[0].id
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

    reviewView.innerHTML = ""
    if (listingObj.reviews){
        listingObj.reviews.forEach(review => {
            const reviewComment = review.comment
            const reviewRating = review.rating
            const reviewLi = document.createElement('li')
            reviewLi.dataset.id = review.id
            reviewLi.innerText = `${reviewComment}
             Rating: ${reviewRating}`
            reviewView.append(reviewLi)
            const deleteButton = document.createElement('button')
            deleteButton.className = 'delete-btn'
            deleteButton.innerText = "x"
            reviewView.append(deleteButton)
        
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
                    const listingRes = document.querySelector('#reservations > ul')
                    listingRes.innerHTML = ""
                    singleListing.bookings.forEach(singleBooking => {
                        showBookingsHelper(singleBooking)
                    })
                })
        }
    })
}



/********** REVIEW FORM **********/

reviewForm.addEventListener('submit', event => {
    event.preventDefault()

    const listingId = event.target.dataset.id
    console.log(listingId)
    
    const newReviewObj = {
        rating: event.target.rating.value,
        comment: event.target.comment.value,
        listing_id: listingId
    }

    const reviewComment = event.target.comment.value
    const reviewRating = event.target.rating.value
    const reviewLi = document.createElement('li')
    reviewLi.innerText = `${reviewComment}
     Rating: ${reviewRating}`
    reviewView.append(reviewLi)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-btn'
    deleteButton.innerText = "x"
    reviewView.append(deleteButton)


    reviewForm.reset()
    fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newReviewObj)
    })
})




/********** DELETE REVIEW: STILL WORKING... **********/
reviewView.addEventListener("click", event =>{
    
    if (event.target.className === 'delete-btn') {
        const reviewLi = event.target.previousElementSibling
        reviewLi.remove()
        event.target.remove()
        const liId = reviewLi.dataset.id
        fetch(`http://localhost:3000/reviews/${liId}`, {
                    method: 'DELETE'
                })
    }
})


/********** BOOKING FORM **********/
const modal = document.querySelector("#modal")
document.querySelector("#create-booking-button").addEventListener("click", () => {
    modal.style.display = "block"
    //   console.log(modal)
})
const exitButton = document.querySelector('#new-booking-form > input.exit-button')
exitButton.addEventListener('click', event => {
    modal.style.display = "none"
})

// Hide the form
modal.addEventListener("submit", event => {
    event.preventDefault()
    modal.style.display = "none"

    if (event.target.dataset.action === "close") {
    }
// modal.addEventListener("submit", event => {
// //     event.preventDefault()
// //     // console.log(e.target)
// //     modal.style.display = "none"
// //     if (event.target.dataset.action === "close") {

// modal.addEventListener("submit", e => {
//     e.preventDefault()
//     modal.style.display = "none"
//     if (e.target.dataset.id === "new-booking-form") {
//         const bookingId = parseInt(event.target.dataset.id)
//         console.log(bookingId)

//         // fetch ('http://localhost:3000/bookings', {

//         // })
//         // const bookingUl = document.createElement('ul.booking')
        

//     }
    const listingId = document.querySelector('.listing-img')

    const newBookingObj = {
        checkin: event.target.checkin.value,
        checkout: event.target.checkout.value,
        listing_id: listingId.dataset.id,
        guest_id: currentUserId
    }
    fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newBookingObj)
    })
    showBookingsHelper(newBookingObj)

    event.target.reset()
})

function showBookingsHelper(newBookingObj) {
    const listingRes = document.querySelector('#reservations > ul')
    const resLi = document.createElement('li.res')
    resLi.innerText = `${newBookingObj.checkin} - ${newBookingObj.checkout}`
    // console.log(newBookingObj)
    listingRes.append(resLi)
}

// function getRes() {
//     fetch('http://localhost:3000/bookings')
//         .then(resp => resp.json())
//         .then(bookingElement => {
//             bookingElement.forEach(bookingObj => {
//                 showBookingsHelper(bookingObj)
//             })
//         })
// }



/********** APP INIT **********/
fetchAllListings()
showListingDetails()
// getRes()
