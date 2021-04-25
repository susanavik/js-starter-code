const homeBtn = document.querySelector("#home-tab")
const firstTabContent = document.querySelector("#home")

homeBtn.addEventListener("click", event =>{
    fetch(`http://localhost:3000/listings/71`)
                .then(resp => resp.json())
                .then(singleListing => {
    firstTabContent.innerText = singleListing.description
})
})


const ProfileBtn = document.querySelector("#profile-tab")
const secondTabContent = document.querySelector("#profile")

ProfileBtn.addEventListener("click", event =>{
    fetch(`http://localhost:3000/reviews/1`)
                .then(resp => resp.json())
                .then(singleReview => {
                    secondTabContent.innerText = singleReview.comment
})
})

const contactBtn = document.querySelector("#contact-tab")
const thirdTabContent = document.querySelector("#contact")

contactBtn.addEventListener("click", event =>{
    fetch(`http://localhost:3000/reviews/1`)
                .then(resp => resp.json())
                .then(singleReview => {
                    thirdTabContent.innerText = singleReview.rating
})
})
