const main = document.querySelector('main');
const footerPages = document.querySelectorAll('footer ul li a'); 
var pages = [];
footerPages.forEach(element => {
    pages.push(element);
});
var page = 1;

//Creer nouvelle card

function newCard(element){
    var card = document.createElement('section');
    var cardInfo = document.createElement('div');
    var cardAuthor = document.createElement('h2');
    var cardButton = document.createElement('a');
    var cardPhotoContainer = document.createElement('div');
    var cardPhoto = document.createElement('img');
    cardInfo.classList.add('cardInfo');
    cardPhotoContainer.classList.add('cardPhotoContainer');
    main.append(card);
    card.append(cardInfo);
    cardInfo.append(cardAuthor);
    cardInfo.append(cardButton);
    card.append(cardPhotoContainer);
    cardPhotoContainer.append(cardPhoto);
    cardAuthor.textContent = element.author;
    cardButton.textContent = "Visit";
    cardButton.href = "/page2.html";
    var photoUrl = "https://picsum.photos/id/"+element.id+"/600/600/";
    cardPhoto.src = photoUrl ;
}



//Remplir ou supprimer tableau photos

function display(object){
    object.forEach(element => {
        newCard(element);
    });
}



function removeCard(){
    var cardsToRemove = document.querySelectorAll('section');
    console.log(cardsToRemove);
    cardsToRemove.forEach(card => {
        console.log(card);
        card.remove();
    });
    
}


//recuperer photo api
function fetchImages(){
    let limit = 6;
    let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    fetch(url)
    .then(function(response){
        if(response.ok){
            return Promise.resolve(response.json());
        }else{
            return Promise.reject(new Error("Erreur dans la requete"))
        }
    }).then((photos)=>{
        console.log(photos);
        display(photos);
        
    }).catch(function(e){
        console.log(e);
    })
}


window.onload = fetchImages();


// pagination 
pages.forEach(element => {
    element.addEventListener('click', e=>{
        //mettre a jour le footer
        pages.forEach(page => {
            page.classList.remove('focus');
        });
        element.classList.add('focus');

        //supprimer les anciennes donnees
        removeCard();

        //appeler un  nouveau fetch
        page=pages.indexOf(element)+1;
        fetchImages();
     })
});


// //redirection
// function loadNewPage(){
//     var cardButtons = document.querySelectorAll('section a');
//     cardButtons.forEach(link=> {
//         link.addEventListener('clik', e=>{
//             window.location.replace("./page2.html");
//         })
//     });
// }








