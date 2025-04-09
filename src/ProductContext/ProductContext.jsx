import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [total, setTotal] = useState(0);

  // Función para cargar datos desde localStorage de forma segura
  const loadFromStorage = () => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const storedIdCounter = JSON.parse(localStorage.getItem("idCounter")) || 1;
      setProducts(storedProducts);
      setIdCounter(storedIdCounter);
      calculateTotal(storedProducts);
    } catch (error) {
      console.error("Error cargando desde localStorage:", error);
      setProducts([]);
      setIdCounter(1);
      setTotal(0);
    }
  };

  // Función para calcular el total de los productos
  const calculateTotal = (productsList) => {
    const newTotal = productsList.reduce((acc, product) => {
      const price = parseFloat(product.price) || 0;
      const quantity = parseFloat(product.quantity) || 1;
      return acc + price * quantity;
    }, 0);
    setTotal(newTotal);
  };

  // Cargar productos e ID al iniciar la app
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Guardar productos e ID cada vez que cambien, y recalcular el total
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("idCounter", JSON.stringify(idCounter));
    calculateTotal(products);
  }, [products, idCounter]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        idCounter,
        setIdCounter,
        total,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
