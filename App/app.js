import './Components/navMenu/navMenu.js'; 
import './Components/mainPage/mainContent.js'; 
import './Components/servicios/serviceContent.js'; 
import './Components/shop/shopContent.js'; 
import './Components/support/supportContent.js'; 
window.addEventListener("load",(e)=>{
    let mainContent = document.querySelector('#mainContent');
    mainContent.innerHTML="<main-content></main-content>";
    e.stopImmediatePropagation();
    e.preventDefault();
});
