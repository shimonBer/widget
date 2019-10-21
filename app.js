try {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400){
            var itemsArr = JSON.parse(this.response).list;
            var widgetDiv = document.querySelector(".widget");
            itemsArr.forEach(item => {
            var itemDiv = document.createElement("div");
            var itemTitle = document.createElement("div");
            var itemBrand = document.createElement("div");
            var itemThumbnail = document.createElement("img");
            itemThumbnail.setAttribute("src", item.thumbnail[0].url)

            var thumbnailLink = document.createElement("a");
            thumbnailLink.setAttribute("href", item.url);
            thumbnailLink.setAttribute("class", "link");
            thumbnailLink.appendChild(itemThumbnail);
            var titleLink = document.createElement("a");
            titleLink.setAttribute("href", item.url);
            titleLink.setAttribute("class", "link");
            titleLink.appendChild(itemTitle);
            var brandLink = document.createElement("a");
            brandLink.setAttribute("href", item.url);
            brandLink.setAttribute("class", "link");
            brandLink.appendChild(itemBrand);

            widgetDiv.appendChild(itemDiv);
            itemDiv.appendChild(thumbnailLink);
            
            if(item.categories){
                
                var itemcategory = document.createElement("div");
                itemcategory.setAttribute("class", "category");
                itemcategory.setAttribute("dir", "ltr");
           
                itemDiv.appendChild(itemcategory);
                if ('textContent' in itemcategory) { //for  Firefox
                    itemcategory.textContent = item.categories[0];
                    
                } else { // for IE8
                    itemcategory.innerText = item.categories[0];
                }
            }
            itemDiv.appendChild(titleLink);
            itemDiv.appendChild(brandLink);

            itemDiv.setAttribute("class", "item");
            itemTitle.setAttribute("class", "item-title"); 
            itemBrand.setAttribute("class", "item-brand");
         
            if ('textContent' in itemTitle) { //for  Firefox
                itemTitle.textContent = item.name;
                itemBrand.textContent = item.branding;
                
            } else { // for IE8
                itemTitle.innerText = item.name;
                itemBrand.innerText = item.branding;
            }
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
  



