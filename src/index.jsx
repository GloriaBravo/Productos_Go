import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Importamos el componente principal
import "./index.css"; // Importamos el archivo de estilos globales

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
