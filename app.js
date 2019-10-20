var request = new XMLHttpRequest();
request.open('GET', 'https://jsonplaceholder.typicode.com/photos', true);
var data;

request.onload = function () {

    if (request.status >= 200 && request.status < 400){
        data = JSON.parse(this.response);
        console.log(data);
    var count = 0;
    document.querySelectorAll(".item").forEach(item => {
    var itemTitle = item.querySelector(".item-title");
    var itemBrand = item.querySelector(".item-brand");
    var itemThumbnail = item.querySelector(".thumbnail");
    if ('textContent' in itemTitle) { //for  Firefox
        itemTitle.textContent = data[count].title;
        itemBrand.textContent = data[count].id;
    } else { // for IE8
        itemTitle.innerText = data[count].title;
        itemBrand.innerText = data[count].id;
    }
    itemThumbnail.src = data[count].thumbnailUrl;
    count ++;
});
    

    }

    else{
        //throw error
    }
    
}

   
   // Send request
request.send();
