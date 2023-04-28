export class ProductsCart {
    constructor(id,nombre,imagen,precio,cantidad) {
        this._id = id;
        this._nombre = nombre;
        this._imagen = imagen;
        this._precio = precio;
        this._cantidad = cantidad;
    }
    get id() {
        return this._id;
    }
    set id(v_id) {
        this._id = v_id;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(v_nombre) {
        this._nombre = v_nombre;
    }
    get imagen() {
        return this._imagen;
    }
    set imagen(v_imagen) {
        this._imagen = v_imagen;
    }
    get precio() {
        return this._precio;
    }
    set precio(v_precio) {
        this._precio = v_precio;
    }
    get cantidad() {
        return this._cantidad;
    }
    set cantidad(v_cantidad) {
        this._cantidad = v_cantidad;
    }
}