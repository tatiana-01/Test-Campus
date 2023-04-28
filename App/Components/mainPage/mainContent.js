export class MainContent extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        this.shadowRoot.innerHTML = /* html */`
          <style rel="stylesheet">
              @import "./App/Components/mainPage/mainStyle.css";
          </style>
            <div class="first-message">
                <h1>Bienvenid@ Camper</h1>
                <p>Campus programmers lands</p>
                <h3>Acerca de la pagina</h3>
                <p>Esta es una pagina informativa acerca de nuestros servicios ofrecidos a <br> nuestros queridos campers</p>
            </div>
            <section class="contactanos">
            <div>
                <img src="img/Space astronaut cartoon.png">
            </div>
            <div class="contact-info">
                <p>¡Contactanos!</p>
                <div class="social">
                    <div class="contact-info-container">
                        <img src="img/whatsapp.svg">
                    </div>
                    <a class="a" href="#">+57 311-8807653</a>
                </div>

            </div>
            </section>

        `;
      }
}     
customElements.define("main-content", MainContent);