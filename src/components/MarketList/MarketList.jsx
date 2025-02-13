import { useState } from "react";

export const MarketList = () => {
	const [nameProduct, setNameProduct] = useState("");
	const [priceProduct, setPriceProduct] = useState(0);
	const [dateProduct, setDateProduct] = useState("");
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	const handleProduct = (e) => {
		e.preventDefault();

		const newProduct = {
			name: nameProduct,
			price: priceProduct,
			date: dateProduct,
		};

		setProducts([...products, newProduct]);

		// Calcular el total
		setTotal(products.reduce((acc, product) => acc + product.price, 0) + priceProduct);
	};

	return (
		<div className="productos-container">
			{/* Contenedor para agregar productos */}
			<div className="form-container">
				<form action="" onSubmit={handleProduct}>
					<h2>Agregar Producto</h2>

					<div className="input-container">
						<input
							type="text"
							placeholder="Producto"
							onChange={(event) => setNameProduct(event.target.value)}
						/>
					</div>

					<div className="input-container">
						<input
							type="number"
							placeholder="Precio"
							onChange={(event) => setPriceProduct(Number(event.target.value))}
						/>
					</div>

					<div className="input-container">
						<input
							type="date"
							onChange={(event) => setDateProduct(event.target.value)}
						/>
					</div>

					<button type="submit">Agregar a la lista</button>
				</form>
			</div>

			{/* Contenedor para la lista de productos */}
			<div className="lista-container">
				<section className="lista-productos">
					<h2>Lista de Productos</h2>
					<ul>
						{products.map((product, index) => (
							<li key={product.name + index}>
								<p>{product.name}</p>
								<p>${product.price}</p>
								<p>{product.date}</p>
							</li>
						))}
					</ul>

					<h3>Total: ${total}</h3>
				</section>
			</div>
		</div>
	);
};


