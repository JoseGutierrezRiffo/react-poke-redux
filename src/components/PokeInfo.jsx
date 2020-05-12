import React, { Fragment, useEffect } from "react";
import { infoPokemonAction } from "../redux/pokeDucks";
import { useDispatch, useSelector } from "react-redux";

const PokeInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(infoPokemonAction());
    };
    fetchData();
  }, [dispatch]);

  const pokemon = useSelector(store => store.pokemones.pokeInfo);


  return pokemon ? (
    <Fragment>
      <div className="card mt-4 text-center">
        <div className="card-body">
          <img src={pokemon.imagen} className={"img-fluid"} alt="" />
          <div className="card-title text-uppercase">{pokemon.nombre}</div>
          <p className="card-text">
            Alto: {pokemon.alto} | Ancho: {pokemon.ancho}
          </p>
        </div>
      </div>
    </Fragment>
  ) : null;
};

export default PokeInfo;
