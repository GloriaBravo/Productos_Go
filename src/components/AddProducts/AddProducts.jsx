import { useContext, useState } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import styles from './AddProducts.module.css'; // Importación correcta de los estilos CSS Modules

export const AddProducts = () => {
    const {
        nameProduct, setNameProduct,
        brandProduct, setBrandProduct,
        unitProduct, setUnitProduct,
        priceProduct, setPriceProduct,
        storeProduct, setStoreProduct,
        products, setProducts,
        idCounter, setIdCounter,
    } = useContext(ProductContext);

    const [message, setMessage] = useState(""); // Estado para mensajes de éxito
    const [error, setError] = useState(""); // Estado para mensajes de error

    const handleAddProduct = (e) => {
        e.preventDefault();

        // Validación de los campos
        if (!nameProduct.trim() || !brandProduct.trim() || isNaN(priceProduct) || priceProduct <= 0 || !unitProduct.trim() || !storeProduct.trim()) {
            setError("Todos los campos son obligatorios y el precio debe ser un número válido mayor que 0");
            return;
        }

        const newProduct = {
            id: idCounter,
            name: nameProduct,
            brand: brandProduct,
            price: Number(priceProduct),
            unit: unitProduct,
            store: storeProduct,
            date: new Date().toLocaleDateString(),
        };

        setProducts([...products, newProduct]);
        setIdCounter(idCounter + 1);
        localStorage.setItem("idCounter", JSON.stringify(idCounter + 1));

        // Limpiar los inputs
        setNameProduct("");
        setBrandProduct("");
        setPriceProduct("");
        setUnitProduct("");
        setStoreProduct("");

        setMessage("Producto agregado correctamente");
        setError(""); // Limpiar mensaje de error
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <form onSubmit={handleAddProduct} className={styles.formContainer}>
            <h1 className={styles.formTitle}>Agregar Producto</h1>
            {message && <p className={styles.successMessage}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.inputContainer}>
                <label>Nombre del producto</label>
                <input 
                    value={nameProduct} 
                    onChange={(e) => setNameProduct(e.target.value)} 
                    className={styles.formInput} 
                    type="text" 
                    placeholder="Nombre" 
                    aria-label="Nombre del producto"
                />
            </div>

            <div className={styles.inputContainer}>
                <label>Marca</label>
                <input 
                    value={brandProduct} 
                    onChange={(e) => setBrandProduct(e.target.value)} 
                    className={styles.formInput} 
                    type="text" 
                    placeholder="Marca" 
                    aria-label="Marca del producto"
                />
            </div>

            <div className={styles.inputContainer}>
                <label>Precio</label>
                <input 
                    value={priceProduct} 
                    onChange={(e) => setPriceProduct(Number(e.target.value))} 
                    className={styles.formInput} 
                    type="number" 
                    placeholder="Precio" 
                    aria-label="Precio del producto"
                />
            </div>

            <div className={styles.inputContainer}>
                <label>Unidad de medida</label>
                <input 
                    value={unitProduct} 
                    onChange={(e) => setUnitProduct(e.target.value)} 
                    className={styles.formInput} 
                    type="text" 
                    placeholder="Ej: kg, litros, unidades" 
                    aria-label="Unidad de medida del producto"
                />
            </div>

            <div className={styles.inputContainer}>
                <label>Tienda</label>
                <input 
                    value={storeProduct} 
                    onChange={(e) => setStoreProduct(e.target.value)} 
                    className={styles.formInput} 
                    type="text" 
                    placeholder="Tienda donde se compró" 
                    aria-label="Nombre de la tienda"
                />
            </div>

            <button className={styles.formButton}>Agregar a la lista</button>
        </form>
    );
};
