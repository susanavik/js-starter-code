/********** GLOABL VARIABLES **********/

const logoPlacement = document.querySelector("#logo > img")
logoPlacement.src = "assets/main-page-logo.png"
const appBodyContainer = document.querySelector("div.parent")
let visible = appBodyContainer.style.display="none"
const carousel = document.querySelector("#carousel-container > div.carousel-inner")
const login = document.querySelector("#login")



/********** opening carosel and log in  **********/
document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body")
    body.addEventListener("click", () => {
    //   hide & seek with the form
    if (event.target.id ==="login"){
           appBodyContainer.style.display = ""
            carousel.style.display = "none"
    console.log(carousel)
        }
        else if (event.target.className ==="logout"){
            appBodyContainer.style.display = "none"
            carousel.style.display = ""
            console.log(appBodyContainer)

        }
  })
})


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
    listingLi.className = "listing-item"

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

    // const listingReview = document.querySelector("#review-container > ul")
    // listingReview.innerHTML += `<li> ${listingObj.review}, star rating: ${listingObj.rating} </li>`
    

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
            console.log(event.target)
            }
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


    fetch(`http://localhost:3000/listings/${listing_id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({rating, review})
    })
        .then(resp => resp.json())
        .then(updatedListing => {
            console.log(updatedListing)
        })

    const newLi = document.createElement('li')
    newLi.innerText = `${review}
     star rating: ${rating}`
    // ratingLi.innerText = rating
    const reviewView = document.querySelector("#review-container > ul")
    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-btn'
    deleteButton.id = listing_id
    deleteButton.innerText = "delete"

    reviewView.append(newLi)
    
    reviewView.append(deleteButton)



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