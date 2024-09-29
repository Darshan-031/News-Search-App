const apikey = '2735c616261d4ef7a1add4759c0dd8ab';
const blogContainor = document.getElementById("blog-containor");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandonNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apikey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json(); // Await here to get the JSON data
        
        return data.articles; // Ensure this returns articles
    } catch (e) {
        console.log("error: ", e);
        return [];
    }
}

searchButton.addEventListener('click', async ()=>{
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);

        }catch(e){
            console.log("error by query : ", e);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apikey}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json(); // Await here to get the JSON data
        
        return data.articles; // Ensure this returns articles
    }catch(e){
        console.log("error by query : ", e);
    }
}

function displayBlogs(articles) {
    blogContainor.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage; // Corrected from `source` to `src`
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click', ()=>{
            window.open(article.url, "_blank")
        })
        if(article.author)
        blogContainor.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandonNews();
        console.log(articles); // Add this line to check the articles

        displayBlogs(articles);
    } catch (e) {
        console.log("Error: ", e);
    }
})();
