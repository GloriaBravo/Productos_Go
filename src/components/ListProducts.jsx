import { useContext } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import { FaTrashAlt } from "react-icons/fa";
import "../styles/ListProducts.module.css"; // Asegúrate de importar los estilos

export const ListProducts = () => {
  const { products, setProducts, total } = useContext(ProductContext);

  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      const filteredProducts = products.filter((product) => product.id !== id);
      setProducts(filteredProducts);
      localStorage.setItem("products", JSON.stringify(filteredProducts));
    }
  };

  // Función auxiliar para determinar la extensión de imagen
  const getImagePath = (storeName) => {
    const lower = storeName.toLowerCase();
    const jpgStores = ["exito", "inter"]; // Las que tienen .jpg
    const extension = jpgStores.includes(lower) ? "jpg" : "png";
    return `/assets/img/${storeName}.${extension}`;
  };

  return (
    <div className="lista-container">
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-details">
                <div><strong>Nombre:</strong> {product.name}</div>
                <div><strong>Marca:</strong> {product.brand}</div>
                <div><strong>Precio:</strong> ${product.price}</div>
                <div><strong>Cantidad:</strong> {product.quantity}</div>
                <div><strong>Unidad:</strong> {product.unit}</div>
                <div>
                  <strong>Tienda:</strong> {product.store}
                  <img
                    src={getImagePath(product.store)}
                    alt={`Logo de ${product.store}`}
                    className="store-logo"
                  />
                </div>
                <div><strong>Categoría:</strong> {product.category}</div>
                <div><strong>Fecha:</strong> {product.date}</div>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="delete-button"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos en la lista</p>
      )}
      <div className="total-container">
        <h3>Total: ${Number(total || 0).toFixed(2)}</h3>
      </div>
    </div>
  );
};
