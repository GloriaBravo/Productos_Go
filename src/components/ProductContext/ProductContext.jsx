import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [idCounter, setIdCounter] = useState(1);
    const [total, setTotal] = useState(0);

    // Cargar productos desde localStorage al iniciar la aplicación
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);

        // Cargar el contador de ID
        const storedIdCounter = JSON.parse(localStorage.getItem("idCounter")) || 1;
        setIdCounter(storedIdCounter);

        // Calcular el total de los productos
        calculateTotal(storedProducts);
    }, []);

    // Recalcular el total cada vez que se agreguen o eliminen productos
    useEffect(() => {
        calculateTotal(products);
    }, [products]);

    // Función para calcular el total
    const calculateTotal = (productsList) => {
        const newTotal = productsList.reduce((acc, product) => acc + product.price, 0);
        setTotal(newTotal);
    };

    // Guardar los productos y el idCounter en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("idCounter", JSON.stringify(idCounter));
    }, [products, idCounter]);

    return (
        <ProductContext.Provider value={{ products, setProducts, idCounter, setIdCounter, total, setTotal }}>
            {children}
        </ProductContext.Provider>
    );
};


