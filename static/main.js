function test (){
    alert("Hello world")
}
function sortByRating (){
    const contentEl = document.querySelector(".content")
    const albumListEl = contentEl.querySelector(".album-list")
    const albums = Array.from(albumListEl.querySelectorAll(".album"))
    albums.sort((a,b)=>{
        const ratingA = a.getAttribute("data-rating")
        const ratingB = b.getAttribute("data-rating")
        return parseFloat(ratingA) - parseFloat(ratingB)
    })
    albumListEl.replaceChildren(...albums)
}
function sortByTitle(){
    const contentEl = document.querySelector(".content")
    const albumListEl = contentEl.querySelector(".album-list")
    const albums = Array.from(albumListEl.querySelectorAll(".album"))
    albums.sort((a,b)=>{
        const titleA = a.querySelector(".album-name").textContent
        const titleB = b.querySelector(".album-name").textContent
        if(titleA < titleB){
            return -1
        } else if (titleA > titleB){
            return 1
        } else {
            return 0
        }
    })
    albumListEl.replaceChildren(...albums)
}
addEventListener("load", (e)=>{
    const sortByTitleButton = document.querySelector("[name=sort-by-title]")
    console.log(sortByTitleButton)
    sortByTitleButton.addEventListener("click", sortByTitle)
    const sortByRatingButton = document.querySelector("[name=sort-by-rating]")
    sortByRatingButton.addEventListener("click", sortByRating)
    setTimeout(()=>{
        sortByRatingButton.textContent = "Sort by awesomeness"
    }, 2000)
    sortByRatingButton.textContent = "Sort by..."
})
