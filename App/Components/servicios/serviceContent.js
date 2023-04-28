import { Servicio } from "../../db/servicios.js";
export class ServiceContent extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        this.shadowRoot.innerHTML = /* html */`
          <style rel="stylesheet">
              @import "./App/Components/servicios/serviceStyle.css";
              @import "./App/Components/mainPage/mainStyle.css";
          </style>

          <div class="first-message">
            <h1>Servicios</h1>
            <a class="shop" data-verocultar='["s"]' href="#">Cafetería Virtual</a>
          </div>
          
          <div class="contenedor-tarjetas" id="tarjeta">
            
          </div> 
            
          <div id="modal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <div id="content-body">
              </div>
            </div>
            
          </div>
        `;
        this.mostrarTarjeta();
        this.shadowRoot.querySelector(".shop").addEventListener("click", (e)=>{
          let mainContent = document.querySelector('#mainContent');
          mainContent.innerHTML="<shop-content></shop-content>";

          });
        this.shadowRoot.querySelectorAll(".servicioDetalle").forEach((val, id) => {
          val.addEventListener("click" , (valor) =>{
            this.buscarServicio(valor.target.dataset.servicio);
            
            const modal = this.shadowRoot.querySelector(".modal");
            const closeModal = document.getElementsByClassName("close")[0];
            modal.style.display="block";
            valor.stopImmediatePropagation();
            valor.preventDefault();
            
          }) 
          
        });
        this.shadowRoot.querySelector(".close").addEventListener("click", () => {
          const modal = this.shadowRoot.querySelector(".modal");
          modal.style.display = "none";
          // valor.stopImmediatePropagation();
          // valor.preventDefault();
        });
        
      }
    mostrarTarjeta(){
        Servicio.forEach(e => {
            let divTarjeta = this.shadowRoot.querySelector("#tarjeta");
            let content = document.createElement("div");
            content.className="tarjetas"
            content.innerHTML=/*html*/`
            <h3>${e.nombre}</h3>
            <img src="${e.img}">`;            

            divTarjeta.append(content);
            let verDatos = document.createElement("button");
            verDatos.id="btn"+e.id;
            verDatos.className="servicioDetalle";
            verDatos.setAttribute("data-servicio",[e.id]);
            verDatos.innerText="Ver Datos";
            content.append(verDatos);
        });
    }  
    buscarServicio (servicio){
      let content = document.createElement("div");
      const modal = this.shadowRoot.querySelector("#content-body");
      modal.innerHTML = "";
      const result = Servicio.filter(service=>service.id==servicio);
      const resultf =JSON.parse(JSON.stringify({...result[result.length-1]}));
      //let {nombre,descripcion,disponibilidad} = result[0];
      content.innerHTML=/*html*/`
            <table>
              <tr>
                <th>Nombre</th>
                <th>Detalles</th>
                <th>Disponibilidad</th>
              </tr>
              <tr>
                <td>${resultf.nombre}</td>
                <td>${resultf.descripcion}</td>
                <td>${resultf.disponibilidad}</td>
              </tr>
            </table>
            `; 
      modal.appendChild(content);
    }     
}     
customElements.define("service-content", ServiceContent);