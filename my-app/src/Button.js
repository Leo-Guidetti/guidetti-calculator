import React from "react";
import "./Button.css";

const NaoNumero = val => {
    return !isNaN (val) || val === "." || val === "AC";
};

const Button = props => (
    <div
        className={`button-wrapper ${
            NaoNumero(props.children) ? null : "operator"
            }`}
        onClick={() => props.aoClicar(props.children)}
    >
        {props.children}
    </div>
);

export default Button;
