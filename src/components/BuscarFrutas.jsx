import { useState } from "react";

export const Frutas = () => {
	//Solamente voy a necesitar el arreglo, ya que sera estatico.
	const fruits = ["pera", "manzana", "mango", "uva"];
	// Inicia vacio por que al comenzar el input esta vacio.
	const [word, setWord] = useState("");
	const [response, setResponse] = useState("Aqui va tu respuesta");

	// Esta funcion va a guardar en un estado el valor del input, entonces para
	// esto necesito otro estado.
	// Recordemos que el parametro event, esta capturando el evento que ocurrio,
	// de esa misma manera, .target nos muestra a quien le ocurre el evento y .value
	// nos muestra el valor del input.
	// En esa medida enviamos a la variable word su nuevo estado que se capturo
	// con el onChange.
	const handleSearch = event => setWord(event.target.value);

	// Esta funcion debera recorrer el arreglo y buscar la fruta
	const handleFindFruit = () => {
		// Primero voy a verificar si la palabra que ingreso el usuario esta en el arreglo.
		// Mejor se usa el find que me devuelve un solo elemento que al final es lo que necesito.
		// Recordemos que .trim() es un metodo con cadenas  de texto que elimina los espacios al
		// principio y al final de la cadena.
		// Recordemos que toLowerCase() lo que hace es convertir la cadena en minuscula, de este
		// modo garantizamos que van a ingresar de la misma manera las palabras.

		let fruit = fruits.find(
			fr => word.trim().toLowerCase() === fr.trim().toLowerCase()
		);
		// En este momento  fruit tiene guardada la fruta que se encuentra en el arreglo.
		console.log(fruit);

		if (fruit) {
			setResponse(fruit);
		} else {
			setResponse("No se encontro la fruta");
		}
	};

	return (
		<>
			<input
				onChange={handleSearch}
				type="text"
				placeholder="Que fruta buscas?"
			/>
			<hr />
			<button onClick={handleFindFruit}>buscar</button>
			<p>{response}</p>
		</>
	);
};
