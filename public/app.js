const searchBar = document.getElementById('search-bar');
const searchSuggestions = document.querySelector('#search-suggestions');

searchBar.addEventListener('keyup', async (e)=>{

    try {
        if (e.target.value.length > 0){
        
            const response = await fetch(`http://localhost:5000/api/${e.target.value}`);
    
            const searchResults = await response.json();
            
            console.log(searchResults)

            searchResults.forEach(result =>{
                searchSuggestions.innerHTML += `
                    <li class='search-suggestion'>
                        <a href="/${result.comedian_name}">
                            ${result.comedian_name}
                        </a>
                    </li>`

            })
            



    
        }

    } catch (error) {
        console.log(error)
    }
    

});

