export class NavMenu extends HTMLElement{
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback() {
          this.shadowRoot.innerHTML = /* html */`
            <style rel="stylesheet">
                @import "./App/Components/navMenu/menuStyle.css";
            </style>
            <nav>
                <div class="nav-container">
                    <img id="logo" src="/img/logoWhite.png" alt="">
                    <ul class="links-container">               
                        <li class="link-item"><a class="mainMenu" href="#" data-verocultar='["i"]'>Inicio</a></li>
                        <li class="link-item"><a class="mainMenu" href="#" data-verocultar='["s"]'>Servicios</a></li>
                        <li class="link-item"><a class="mainMenu" href="#" data-verocultar='["t"]'>Soporte</a></li>

                    </ul>
                </div>
            </nav>
          `;
          this.shadowRoot.querySelectorAll(".mainMenu").forEach((val, id) => {
                val.addEventListener("click", (e)=>{
                    let data = JSON.parse(e.target.dataset.verocultar);
                    let mainContent = document.querySelector('#mainContent');
                    mainContent.innerHTML= "";
                    switch (data[0]){
                      case 'i':
                        mainContent.innerHTML="<main-content></main-content>";
                        break;
                      case 's':
                        mainContent.innerHTML="<service-content></service-content>";
                        break;
                      case 't':
                        mainContent.innerHTML="<support-content></support-content>";
                        break;
                    }
                    e.stopImmediatePropagation();
                    e.preventDefault();

                })
            });
       
      }
      

    }     

   
    
customElements.define("nav-menu", NavMenu);
