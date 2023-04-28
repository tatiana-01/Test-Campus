import { Products } from "../../db/productos.js";
import { ProductsCart } from "./productosCarritos.js";
let totalProductos = [];
export class ShopContent extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }    
      connectedCallback() {
        this.shadowRoot.innerHTML = /* html */`
          <style rel="stylesheet">
              @import "./App/Components/shop/shopStyle.css";

          </style>
          <div class=carrito>
          <img src="./img/cart-regular-24.png" alt="" srcset="" style="height:50px;"><span id="cantidadTotal"></span>
          </div>
          
          <div class="titulo">
            <h1>Cafeteria Virtual</h1>
            <p>Sección compra</p>
          </div>
          <h3 class="titulo">Catalogo</h3>
          <div class="products"></div>

          <div class="cart-products">
            <div class="close-btn">X</div>
            <h3>Mi Carrito</h3>
              <div id="productosCarrito"></div>
              <p class="total"></p>
          </div>


        `;
        if (localStorage.getItem("totalProductos") != null){
          totalProductos = JSON.parse(localStorage.getItem("totalProductos"));
          this.htmlCarrito();
      }

        this.mostrarTarjeta();
        this.mostrarProductoCarrito();
        this.mostrarSpan();
        this.mostrarCarrito();
        this.cerrarCarrito();
        //this.eliminarProducto();
       // this.mostrarNavCarrito();
        
      }
      mostrarTarjeta(){
        Products.forEach(e => {
            let divTarjeta = this.shadowRoot.querySelector(".products");
            let content = document.createElement("div");
            content.className="carts"
            content.innerHTML=/*html*/`
              <p>${e.nombre}</p>
              <img src="${e.img}">
              <p>${this.formatoMoneda(e.precio)}</p>
            `;            

            divTarjeta.append(content);
            let verDatos = document.createElement("a");
            verDatos.id="btn"+e.id;
            verDatos.className="producto";
            verDatos.setAttribute("data-producto",[e.id]);
            verDatos.innerText="comprar";
            content.append(verDatos);
        });      
        
    }

    mostrarProductoCarrito(){
      let cantidad=1;
        this.shadowRoot.querySelectorAll('.producto').forEach(element => {
          element.addEventListener("click",(e)=>{
            const result = Products.filter(product=>product.id==e.target.dataset.producto);
            const resultf =JSON.parse(JSON.stringify({...result[result.length-1]}));
            if (totalProductos==0){
              let producto = new ProductsCart(resultf.id, resultf.nombre, resultf.img, resultf.precio,cantidad)
                totalProductos.push(producto);
                localStorage.setItem("totalProductos",JSON.stringify(totalProductos));
                this.htmlCarrito();
                 
            }else{
              totalProductos.forEach(element => {
                if(element._id==resultf.id){
                  element._cantidad++;
                  this.htmlCarrito();    
                  localStorage.setItem("totalProductos",JSON.stringify(totalProductos));
                        
                }
                else{
                  let todosID=[];
                    let productoCart= this.shadowRoot.querySelectorAll('.item')
                    productoCart.forEach(element => {
                      let idProductoCarrito=element.dataset.producto;
                      todosID.push(parseInt(idProductoCarrito));
                    });
                      if(!todosID.includes(resultf.id)){
                        cantidad=1;
                        let producto = new ProductsCart(resultf.id, resultf.nombre, resultf.img, resultf.precio,cantidad)
                        totalProductos.push(producto);
                        localStorage.setItem("totalProductos",JSON.stringify(totalProductos));
                        this.htmlCarrito();
                      }
                }              
              });
            } 
          })
        });
    }

    eliminarProducto(){
      let botonEliminar=this.shadowRoot.querySelectorAll('.delete-product');
      botonEliminar.forEach(element => {
        element.addEventListener("click",(e)=>{
          console.log(e);
           totalProductos.forEach((elementArray,posicion) => {
            if(parseInt(e.target.id)==elementArray._id){
                elementArray._cantidad--;
                if(elementArray._cantidad<=0){
                  totalProductos.splice(posicion,1)
                  console.log(totalProductos);
                }
                localStorage.setItem("totalProductos",JSON.stringify(totalProductos));
                this.htmlCarrito();
            }
          }) 
        })
      })
    }


    htmlCarrito(){
      let divTarjeta = this.shadowRoot.querySelector("#productosCarrito");
      divTarjeta.innerHTML="";
      totalProductos.forEach(element => {
        let content = document.createElement("div");
        content.className="item"
        content.dataset.producto=element._id;
        content.innerHTML=/*html*/`
        <img src="../../${element._imagen}" alt="">
        <p>${element._nombre}</p>
        <p>${element._precio}</p>
        <p>${element._cantidad}</p>
        <div class="delete-product" id="${element._id}">x</div>
        `;         
        divTarjeta.append(content);
      });
      this.mostrarSpan();
      this.total();
      this.eliminarProducto();
    }


    total(){
      let total=0;
      let divTarjeta = this.shadowRoot.querySelector(".total");
      totalProductos.forEach(element => {
        let totalProducto=element._cantidad*element._precio;
        total += totalProducto
      });
      divTarjeta.innerHTML=this.formatoMoneda(total);
    }

    formatoMoneda = (valor)=>{
      return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
    }  
    
    mostrarSpan(){
            let dataTotal=0;
            let span=this.shadowRoot.querySelector('#cantidadTotal')
            totalProductos.forEach(element => {
              dataTotal+=element._cantidad;
            });
           span.innerHTML=dataTotal;
          }

  mostrarCarrito(){
    let carro=this.shadowRoot.querySelector('.carrito');
    carro.addEventListener('click', (e)=>{
      let cart=this.shadowRoot.querySelector('.cart-products')
      cart.style.display='block'
    })
  }
  cerrarCarrito(){
    this.shadowRoot.querySelector('.close-btn').addEventListener('click',(e)=>{
      let cart=this.shadowRoot.querySelector('.cart-products')
      cart.style.display='none'
    })
  }
}  
customElements.define("shop-content", ShopContent);