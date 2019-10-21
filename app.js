
try {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400){
            var itemsArr = JSON.parse(this.response).list;
            var widgetDiv = document.querySelector(".widget");
            itemsArr.forEach(item => {
                var itemDiv = creatItem(item);
                widgetDiv.appendChild(itemDiv);
                itemDiv.querySelector(".thumbnail").setAttribute("src", item.thumbnail[0].url);
                itemDiv.querySelector(".title-link").setAttribute("href", item.url);
                itemDiv.querySelector(".brand-link").setAttribute("href", item.url);
                var itemTitle = itemDiv.querySelector(".item-title");
                var itemBrand = itemDiv.querySelector(".item-brand");
                var itemCategory = itemDiv.querySelector(".item-category");

                if ('textContent' in itemTitle) { //for  Firefox
                    itemTitle.textContent = item.name;
                    itemBrand.textContent = item.branding;
                    if(item.categories) { itemCategory.textContent = item.categories.join(","); }
                    
                } else { // for IE8
                    itemTitle.innerText = item.name;
                    itemBrand.innerText = item.branding;
                    if(item.categories) { itemCategory.innerText = item.categories.join(","); }
                }
                if(containsHebrew(item.name)){
                    itemTitle.setAttribute("dir", "rtl");
                }
                if(containsHebrew(item.branding)){
                    itemBrand.setAttribute("dir", "rtl");
                }
            });
        }
    }   
    request.send();

  } catch (err) { 
    console.error(`${err} occurred, message: ${err.message}`); 
  }
  
  function creatItem(item){
      
        var itemDiv = document.createElement("div");
        var itemTitle = document.createElement("div");
        var itemBrand = document.createElement("div");
        var itemThumbnail = document.createElement("img");
        itemThumbnail.setAttribute("class", "thumbnail");

        var thumbnailLink = document.createElement("a");
        thumbnailLink.setAttribute("href", item.url);
        thumbnailLink.setAttribute("class", "link thumbnail-link");
        thumbnailLink.appendChild(itemThumbnail);
        var titleLink = document.createElement("a");

        titleLink.setAttribute("class", "link title-link");
        titleLink.appendChild(itemTitle);
        var brandLink = document.createElement("a");

        brandLink.setAttribute("class", "link brand-link");
        brandLink.appendChild(itemBrand);
        itemDiv.appendChild(thumbnailLink);

        if(item.categories){
            var itemcategory = document.createElement("div");
            itemcategory.setAttribute("class", "item-category");
            itemcategory.setAttribute("dir", "ltr");
            itemDiv.appendChild(itemcategory);
        }

        itemDiv.appendChild(titleLink);
        itemDiv.appendChild(brandLink);
        itemDiv.setAttribute("class", "item");
        itemTitle.setAttribute("class", "item-title"); 
        itemBrand.setAttribute("class", "item-brand");

        return itemDiv;

  }

function containsHebrew(str){
    var HebrewChars = new RegExp("[\u0590-\u05FF]");
    return HebrewChars.test(str);
}