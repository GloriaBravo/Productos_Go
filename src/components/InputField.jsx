import React from "react";

export const InputField = ({ label, value, onChange, type, options, placeholder }) => {
    return (
        <div className="inputContainer">
            <label>{label}</label>
            {type === "select" ? (
                <select value={value} onChange={onChange} className="formInput">
                    <option value="">Seleccione una opción</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    value={value}
                    onChange={onChange}
                    className="formInput"
                    type={type}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};
