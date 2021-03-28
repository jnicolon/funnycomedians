const searchBar = document.getElementById('search-bar');
const searchSuggestions = document.querySelector('#search-suggestions');
const searchContainer = document.querySelector('.search-container');



searchBar.addEventListener('input', async (e)=>{
    try {
        if (e.target.value.length > 0){

            let selected = 0;
            
            searchSuggestions.innerHTML = "";
            
            const response = await fetch(`https://funny-comedians.herokuapp.com/api/${e.target.value}`, {
                    mode:'no-cors'
                });
                
                const filteredSearchResults = await response.json();
     
                
            //For testing search bar functionality

            // let searchResults = [{comedian_name: "Juan Nicolon"}, {comedian_name: "John Raynolds"}, {comedian_name: "Jenny McArthy"}, {comedian_name: "Julio Diaz"}]
            // function filterItems(arr, query) {
            //     return arr.filter(function(el) {
            //         return el.comedian_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            //     })
            //   }
            // const filteredSearchResults =filterItems(searchResults, e.target.value);
            

            filteredSearchResults.forEach((result, index) =>{
                let li = document.createElement('li');
                li.classList.add('search-suggestion')
                let a = document.createElement('a');
                a.classList.add('search-link');
                a.href = result.comedian_name;
                let p = document.createElement('p')
                p.classList.add('hovered-link');
                p.id = index; 
                p.innerText = result.comedian_name; 

                a.appendChild(p);
                li.appendChild(a);

                searchSuggestions.appendChild(li)

            })


            const allLinks = document.querySelectorAll('.hovered-link');
            
            checkSelected(allLinks, selected)

            allLinks.forEach(link =>{
                link.addEventListener('mouseenter', ()=>{
                    selected = link.id
                    checkSelected(allLinks, selected)
                })
            })

            function checkSelected(array, id){
                array.forEach(element =>{
                    element.classList.remove("selected")
                })
                array[id].classList.add('selected')
                
            }

           

            document.addEventListener('keydown', (e)=>{
                const key = e.key;
            switch (key) {
                case "ArrowUp":
                    selected > 0 && selected--
                    checkSelected(allLinks, selected)
                    e.target.value = allLinks[selected].innerText
                    
                    break;
                case "ArrowDown":

                    if (allLinks.length === 1 ){
                        selected = 0
                    } else {
                        selected < allLinks.length && selected++
                    }
                   
                    checkSelected(allLinks, selected)
                    e.target.value = allLinks[selected].innerText

                    break;
                }
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
}) 
