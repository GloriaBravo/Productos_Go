import { useState, useEffect } from "react";

export const MarketList = () => {
	const [nameProduct, setNameProduct] = useState("");
	const [priceProduct, setPriceProduct] = useState(0);
	const [dateProduct, setDateProduct] = useState("");
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	const handleProduct = e => {
		e.preventDefault();

		const newProduct = {
			name: nameProduct,
			price: priceProduct,
			date: dateProduct,
		};

		// spread operator
		setProducts([...products, newProduct]);
	};

	return (
		<div  className="Productos">
			<form action="" onSubmit={handleProduct}>
				<h2> Agregar Producto</h2>

				<input
					type="text"
					placeholder="Producto"
					onChange={event => setNameProduct(event.target.value)}
				/>
				<input
					type="number"
					placeholder="Precio"
					onChange={event =>
						setPriceProduct(Number(event.target.value))
					}
				/>

				<input
					type="date"
					name=""
					id=""
					onChange={event => setDateProduct(event.target.value)}
				/>

				<button>Agregar a la lista</button>
			</form>
			<section>
				<h2>Lista de Productos</h2>
				<ul>
					{products.map((product, index) => (
						<li key={product + index}>
							<p>{product.name}</p>
							<p>{product.price}</p>
							<p>{product.date}</p>
						</li>
					))}
				</ul>

				<h3>{total}</h3>
			</section>
		</div>
	);
};
