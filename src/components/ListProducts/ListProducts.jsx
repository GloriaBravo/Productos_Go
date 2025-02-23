// 1. Creo la funcion que es nuestro caso sera funciones de flecha, incluyendo el export (Rafc)
// 2. Antes de la funcion verifico si debo importar algo
// 3. Dentro del retorno de la funcion  ira mi codigo HTML
// 4. La logica de programacion estara dentro de la funcion antes del return
// 5. Algunas veces haremos logica del render dentro del return

import { useContext } from "react";
import { AddProducts } from "../AddProducts/AddProducts";

export const ListProducts = () => {




	return (
		<div className="lista-container">
			<section className="lista-productos">
				<h2>Lista de Productos</h2>
				<ul>
					<li>
                        arroz: 2000 
                    </li>
				</ul>

				<h3>Total: $</h3>
			</section>
		</div>
	);
};
