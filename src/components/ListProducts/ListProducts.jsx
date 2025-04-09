// 1. Creo la funcion que es nuestro caso sera funciones de flecha, incluyendo el export (Rafc)
// 2. Antes de la funcion verifico si debo importar algo
// 3. Dentro del retorno de la funcion  ira mi codigo HTML
// 4. La logica de programacion estara dentro de la funcion antes del return
// 5. Algunas veces haremos logica del render dentro del return
// 6. Ordenar alfabéticamente los productos: Utiliza sort() en la lista de productos antes de mapearlos.
// 7. Mostrar el ID del producto: Añade el ID en el mapeo de los productos.
// 8. Ordenar productos: He agregado un useEffect que ordena los productos alfabéticamente cada vez que cambian.
// 9. Mostrar ID: He incluido el id en el mapeo de los productos en el método map().
import { useContext } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import { FaTrashAlt } from "react-icons/fa"; // Icono de eliminar

export const ListProducts = () => {
	const { products, setProducts, total } = useContext(ProductContext);

	const handleDeleteProduct = (id) => {
		// Modal de confirmación de eliminación
		if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
			const filteredProducts = products.filter(
				(product) => product.id !== id
			);
			setProducts(filteredProducts);
			localStorage.setItem("products", JSON.stringify(filteredProducts));
		}
	};

	return (
		<div className="lista-container">
			<section className="lista-productos">
				<h2>Lista de Productos</h2>
				{products.length > 0 ? (
					<ul className="product-list">
						{products.map((product) => (
							<li key={product.id} className="product-item">
								<div className="product-details">
									<div>
										<strong>Nombre:</strong> {product.name}
									</div>
									<div>
										<strong>Marca:</strong> {product.brand}
									</div>
									<div>
										<strong>Precio:</strong> $
										{product.price.toFixed(2)}
									</div>
									<div>
										<strong>Unidad:</strong> {product.unit}
									</div>
									<div>
										<strong>Tienda:</strong> {product.store}
									</div>
									<div>
										<strong>Fecha:</strong> {product.date}
									</div>
								</div>

								{/* Botón de eliminar */}
								<button
									onClick={() => handleDeleteProduct(product.id)}
									className="delete-button"
									aria-label={`Eliminar ${product.name}`}
								>
									<FaTrashAlt />
								</button>
							</li>
						))}
					</ul>
				) : (
					<p>No hay productos en la lista</p>
				)}
				<h3>Total: ${total.toFixed(2)}</h3>
			</section>
		</div>
	);
};
