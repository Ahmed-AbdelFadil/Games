row = document.getElementById("row");


async function getGames(category) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '87278b262fmsh9febcc64501cc67p19801ajsndb35afd0e783',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    var response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    response = await response.json();


    display(response);



}

getGames("mmorpg") //default





function display(gamesData) {

    var box = ``

    for (var i = 0; i < gamesData.length; i++) {

        box +=
            `
        <div class=" gameHolder col-md-3 g-4" data-uID="${i}">
        <div class="card p-3 animate__animated animate__backInUp"  data-uID="${i}">
             <div class="img"><img src=${gamesData[i].thumbnail} class="card-img-top" alt="Game Thumbinal"></div>    
        
            <div class="card-body" data-uID="${i}">
                <div class="game-name d-flex justify-content-between align-items-center" >
                    <h5 class="card-title">${gamesData[i].title}</h5>
                    <span class="badge rounded-2 px-2 py-1">Free</span>
                </div>
              <p class="card-text text-center text-white-50">${gamesData[i].short_description?.split(" ").slice(0, 10).join(" ") + "..."}</p>  <!-- nullish operator -->
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <span class="badge rounded-pill text-bg-secondary">${gamesData[i].genre}</span>
                <span class="badge rounded-pill text-bg-secondary">${gamesData[i].platform}</span>
              </div>
          </div>
    </div>


        `



    }

    row.innerHTML = box;
    catchCards(gamesData)
}




$("a").click(async function (e) {
    
    gameCategory = $(this).html()
    loader(gameCategory,2500)

    e.preventDefault();
    $(this).css("color", "yellow");
    $("a").not($(this)).css("color", "#0A8BBE");

})


function loader(catg,delay) {

    $("#row").html(        `
    <div id="load" class="mt-5">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
    </div>

    `) 

    setTimeout(()=>getGames(catg),delay)


}





async function getGameDetails(gameID){

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '87278b262fmsh9febcc64501cc67p19801ajsndb35afd0e783',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

        var response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`, options);
        response = await response.json();
        displayGameDetail(response)
}




function catchCards(gamesData){

    var gameHolder= document.querySelectorAll(".gameHolder")

for(var i=0; i<gameHolder.length;i++){
    gameHolder[i].addEventListener("click", function(e){
        var index = e.target.parentElement.parentElement.getAttribute("data-uID");
        var gamedID= gamesData[index].id;
        getGameDetails(gamedID)
    })

    
    
}
}


function displayGameDetail(details){
    
    gameDetialsBox=document.querySelector(".game-detials-box");

        var box=    `
    <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
    </div>

    `
    $(".main").addClass("d-none")
    $(".game-detials-box").removeClass("d-none")
    gameDetialsBox.innerHTML=box
    


    setTimeout(()=>{
       
        var box=
        `
        <div class="container text-white py-5 position-relative">
        <div class="close-icon position-absolute" id="close">
        <i class="fa-solid fa-circle-xmark fa-lg"></i>
        </div>
        <h1 class=" mb-5">Game Details</h1>
        <div class="row text-white">
    
            <div class="col-md-4 ">
    
                <img src="${details.thumbnail}" alt="Game Thumbinal" class="rounded-3">
            </div>
    
            <div class="col-md-8">
                <h2>
                    Title: <span class="ms-2">${details.title}</span>
                </h2>
    
                <h3>Category: <span class="bg-info px-3 py-1 rounded-5 fs-6 ms-2 text-black">${details.title}</span></h3>
                <h3>Platform: <span class="bg-info px-3 py-1 rounded-5 fs-6 ms-2 text-black">${details.platform}</span></h3>
                <h3>Status: <span class="bg-info px-3 py-1 rounded-5 fs-6 ms-2 text-black">${details.status}</span></h3>
                <p class="mt-md-4">${details.description}</p>
    
                <a href="${details.freetogame_profile_url}" target="_blank" class="btn btn-outline-warning mt-md-3"> Show Game</a>
    
            </div>
    
        `
        gameDetialsBox.innerHTML=box;
        close()
    
    },1000);



}




function close(){
    $("#close").click(function(){
        $(".game-detials-box").addClass("d-none")
        $(".main").removeClass("d-none")
    })
}


// ~ ////////////////////////   Scrolling Navbar //////////////////////////

let gamesContainer= $("#content").offset().top;
$(window).scroll(function () {
    if ($(window).scrollTop() > gamesContainer){
        $("#nav").css(
            {position: "fixed",
            top: "4%",
            left: "50%",
            })}
        else{
            $("#nav").css(
                {position: "absolute",
                top: "100%",
                left: "50%",
                })}
        }
)