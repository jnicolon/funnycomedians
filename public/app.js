const searchBar = document.getElementById('search-bar');


searchBar.addEventListener('keyup', (e)=>{
    
    if (e.target.value.length > 0){
        fetch(`http://localhost:5000/api/${e.target.value}`)
            .then(response => response.json())
            .then( data => console.log(data))
    }
});

