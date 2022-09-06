const main = document.querySelector('main');


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
    var photoUrl = "https://picsum.photos/id/"+element.id+"/600/600/";
    cardPhoto.src = photoUrl ;
}



function display(object){
    object.forEach(element => {
        newCard(element);
    });
}


//recuperer photo api
let page = 2;
let limit = 10;
let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
fetch(url)
.then(function(response){
    if(response.ok){
        return Promise.resolve(response.json());
    }else{
        return Promise.reject(new Error("Erreur dans la requete"))
    }
}).then((photos)=>{
    display(photos);
    
}).catch(function(e){
    console.log(e);
})










