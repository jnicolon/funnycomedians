const searchBar = document.getElementById('search-bar');
const searchSuggestions = document.querySelector('#search-suggestions');
const searchContainer = document.querySelector('.search-container');


searchBar.addEventListener('keyup', async (e)=>{
    try {
        if (e.target.value.length > 0){

            searchSuggestions.innerHTML = "";
        
            const response = await fetch(`http://localhost:5000/api/${e.target.value}`);
    
            const searchResults = await response.json();
            
            console.log(searchResults)

            searchResults.forEach(result =>{
                searchSuggestions.innerHTML += `
                    <li class='search-suggestion'>
                        <a class="search-link" href="/${result.comedian_name}">
                            <p class="hovered-link">${result.comedian_name}</p>
                            
                        </a>
                    </li>`

            });

            const allLinks = document.querySelectorAll('.hovered-link');

            

            allLinks.forEach(link =>{
                link.addEventListener('mouseenter', ()=>{
                    link.classList.add("selected");

                })

                link.addEventListener('mouseleave', ()=>{
                    link.classList.remove("selected");

                })
            })

        } else {
            searchSuggestions.innerHTML = "";
        }

    } catch (error) {
        console.log(error)
    }
});




searchContainer.addEventListener('submit', (e)=>{
    e.preventDefault();
    window.location = `/${searchBar.value}`
    console.log(searchBar.value)
}) 
