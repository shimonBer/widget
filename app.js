try {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://jsonplaceholder.typicode.com/photos', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400){
            var data = JSON.parse(this.response);
            var itemNum = 0;
            document.querySelectorAll(".item").forEach(item => {
            var itemTitle = item.querySelector(".item-title");
            var itemBrand = item.querySelector(".item-brand");
            var itemThumbnail = item.querySelector(".thumbnail");
            if ('textContent' in itemTitle) { //for  Firefox
                itemTitle.textContent = data[itemNum].title;
                itemBrand.textContent = data[itemNum].id;
            } else { // for IE8
                itemTitle.innerText = data[itemNum].title;
                itemBrand.innerText = data[itemNum].id;
            }
            itemThumbnail.src = data[itemNum].thumbnailUrl;
            itemNum ++;
            });


        }

        else{
            console.error("Err when requesting data");
        }
    
    }   
    request.send();

  } catch (err) { 
    console.error(`${err} occurred, message: ${err.message}`); 
  
  }



