import { createContext, useState } from "react";

export const context = createContext();

export const Provider = ({ children }) => {
	// Estados que deseo globalizar
	const [products, setProducts] = useState([]);
	const [idProducts, setIdProducts] = useState([]);
	const [nameProduct, setNameProduct] = useState("");
	const [priceProduct, setPriceProduct] = useState(0);
	const [dateProduct, setDateProduct] = useState("");
	const [total, setTotal] = useState(0);

	// En el value van las variables que se van a proveer desde cualquier parte de la aplicación
	return (
		<context.Provider
			value={{
				products,
				setProducts,
				idProducts,
				setIdProducts,
				nameProduct,
				setNameProduct,
				priceProduct,
				setPriceProduct,
				dateProduct,
				setDateProduct,
				total,
				setTotal,
			}}
		>
			{children}
		</context.Provider>
	);
};
