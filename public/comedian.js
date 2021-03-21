const veredict = document.querySelector('.veredict');
const loadingContainer = document.querySelector('.loading-container');

function chooseVeredict(){
    let randomNum = Math.random();
    if(randomNum > 0.7){
        return "FUNNY!"
    } else {
        return "NOT FUNNY!"
    }
}

function animateVeredict(){
    veredict.classList.remove('off');
    loadingContainer.style.display = "none";
    veredict.textContent = chooseVeredict();
}



window.onload = ()=>{
    setTimeout(()=>{animateVeredict()}, 2500);
}