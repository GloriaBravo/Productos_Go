import { useContext } from "react";
import { context } from "../context/context";
import './AddProducts.css'

export const AddProducts = () => {
  const {
    nameProduct,
    setNameProduct,
    priceProduct,
    setPriceProduct,
    dateProduct,
    setDateProduct,
    products,
    setProducts,
  } = useContext(context);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      nameProduct.trim() === "" ||
      isNaN(priceProduct) ||
      priceProduct <= 0 ||
      dateProduct.trim() === ""
    ) {
      return alert("Todos los campos son obligatorios");
    } else {
      setProducts([
        ...products,
        { name: nameProduct, price: priceProduct, date: dateProduct },
      ]);
      setNameProduct("");
      setPriceProduct("");
      setDateProduct("");
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="form-container">
      <h1 className="form-title">Agregar Producto</h1>
      <input
        value={nameProduct}
        onChange={(e) => setNameProduct(e.target.value)}
        className="form-input"
        type="text"
        placeholder="Nombre del producto"
      />
      <input
        value={priceProduct}
        onChange={(e) => setPriceProduct(Number(e.target.value))}
        className="form-input"
        type="number"
        placeholder="Precio"
      />
      <input
        value={dateProduct}
        onChange={(e) => setDateProduct(e.target.value)}
        className="form-input"
        type="date"
      />
      <button className="form-button">Agregar a la lista</button>
    </form>
  );
};
