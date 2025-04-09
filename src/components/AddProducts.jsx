import React, { useState, useContext } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import "../styles/AddProducts.module.css";

export const AddProducts = () => {
  const { products, setProducts, idCounter, setIdCounter } = useContext(ProductContext);
  const [nameProduct, setNameProduct] = useState("");
  const [brandProduct, setBrandProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [unitProduct, setUnitProduct] = useState("");
  const [storeProduct, setStoreProduct] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (
      !nameProduct ||
      !brandProduct ||
      isNaN(priceProduct) ||
      priceProduct <= 0 ||
      !unitProduct ||
      !storeProduct ||
      !category ||
      quantity <= 0
    ) {
      setError("Todos los campos son obligatorios y el precio debe ser válido.");
      return;
    }

    // Normalizar nombre y unidad para comparar (case-insensitive)
    const nameLower = nameProduct.trim().toLowerCase();
    const unitLower = unitProduct.trim().toLowerCase();

    const existingProduct = products.find(
      (product) =>
        product.name.trim().toLowerCase() === nameLower &&
        product.unit.trim().toLowerCase() === unitLower
    );

    if (existingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === existingProduct.id
          ? { ...product, quantity: product.quantity + quantity }
          : product
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      const newProduct = {
        id: idCounter,
        name: nameProduct.trim(), // Guardamos el nombre con formato original
        brand: brandProduct.trim(),
        price: parseFloat(priceProduct),
        unit: unitProduct.trim(),
        store: storeProduct.trim(),
        category: category.trim(),
        date: new Date().toLocaleDateString(),
        quantity: quantity,
      };
      setProducts([...products, newProduct]);
      setIdCounter(idCounter + 1);
      localStorage.setItem("idCounter", JSON.stringify(idCounter + 1));
    }

    // Limpiar formulario
    setNameProduct("");
    setBrandProduct("");
    setPriceProduct("");
    setUnitProduct("");
    setStoreProduct("");
    setCategory("");
    setQuantity(1);
    setMessage("Producto agregado correctamente.");
    setError("");

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div>
      <img src="/assets/img/logo_inicial.png" alt="Logo" className="logo" />

      <form onSubmit={handleAddProduct} className="product-form">
        <h2>Agregar Producto</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <input
          value={nameProduct}
          onChange={(e) => setNameProduct(e.target.value)}
          type="text"
          placeholder="Nombre del producto"
        />
        <input
          value={brandProduct}
          onChange={(e) => setBrandProduct(e.target.value)}
          type="text"
          placeholder="Marca"
        />
        <input
          value={priceProduct}
          onChange={(e) => setPriceProduct(e.target.value)}
          type="number"
          placeholder="Precio"
        />
        <select
          value={unitProduct}
          onChange={(e) => setUnitProduct(e.target.value)}
        >
          <option value="">Seleccione unidad</option>
          <option value="lb">Libra</option>
          <option value="kg">Kilogramo</option>
          <option value="litros">Litros</option>
          <option value="unidades">Unidades</option>
        </select>
        <select
          value={storeProduct}
          onChange={(e) => setStoreProduct(e.target.value)}
        >
          <option value="">Seleccione tienda</option>
          <option value="Inter">Inter</option>
          <option value="exito">Éxito</option>
          <option value="Ara">Ara</option>
          <option value="D1">D1</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Seleccione categoría</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Higiene">Higiene</option>
          <option value="Lacteos">Lacteos</option>
        </select>
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
        <button type="submit">Agregar a la lista</button>
      </form>
    </div>
  );
};

