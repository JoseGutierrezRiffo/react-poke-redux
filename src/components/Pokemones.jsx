import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  anteriorPokeAction,
  infoPokemonAction,
  obtenerPokemonsAction,
  siguientePokeAction
} from "../redux/pokeDucks";
import PokeInfo from "./PokeInfo";

const Pokemones = () => {
  const dispatch = useDispatch();
  const pokemones = useSelector(store => store.pokemones.results);
  const next = useSelector(store => store.pokemones.next);
  const previous = useSelector(store => store.pokemones.previous);

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <h3>Lista de Pokemones</h3>
          <br />
          <div className={"d-flex justify-content-between"}>
            {pokemones.length === 0 && (
              <button
                className={"btn btn-dark"}
                onClick={() => dispatch(obtenerPokemonsAction())}
              >
                Consultar
              </button>
            )}
            {next && (
              <button
                className={"btn btn-dark"}
                onClick={() => dispatch(siguientePokeAction(20))}
              >
                Siguiente
              </button>
            )}
            {previous && (
              <button
                className={"btn btn-dark"}
                onClick={() => dispatch(anteriorPokeAction())}
              >
                Anterior
              </button>
            )}
          </div>
          <ul className={"list-group mt-3"}>
            {pokemones.map((item, index) => (
              <li className={"list-group-item text-uppercase"} key={index}>
                {item.name}
                <button
                  className="btn btn-dark btn-sm float-right"
                  onClick={() => dispatch(infoPokemonAction(item.url))}
                >
                  Info
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Detalle del Pokemon</h3>
          <PokeInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default Pokemones;
