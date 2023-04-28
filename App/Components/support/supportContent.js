import { Preguntas } from "../../db/preguntas.js";
export class SupportContent extends HTMLElement{
  constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.shadowRoot.innerHTML = /* html */`
        <style rel="stylesheet">
            @import "./App/Components/support/supportStyle.css";
        </style>
        <div class="FAQ">
        <h1>Preguntas mas frecuentes</h1>
        </div>
        
        <div id="preguntas"></div>
      `;
      this.PreguntasYRtas();
      this.mostrarRta();
    }
    PreguntasYRtas(){
        let htmlFAQ='';
        let htmlTodasFAQ='';
        Preguntas.forEach(element => {
            htmlFAQ=/*html*/`
            <div class="accordion">
            ${element.pregunta}
            </div>
            <div class="panel">
            <p>${element.rta}</p>
            </div>
        `
        htmlTodasFAQ+=htmlFAQ;
        });
        
        this.shadowRoot.querySelector('#preguntas').innerHTML=htmlTodasFAQ;
    }
    mostrarRta(){
      let panel=this.shadowRoot.querySelectorAll('.panel');
      this.shadowRoot.querySelectorAll('.accordion').forEach((element,pos) => {
          element.addEventListener("click",(e)=>{
              panel[pos].style.display="block";
              element.addEventListener("click",(e)=>{
                  panel[pos].style.display="none";
                  this.mostrarRta();
              })
          })
      });
  }
}     
customElements.define("support-content", SupportContent);