import axios from "axios";

// TODO constantes
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: []
};



// TODO types
const GET_POKE_SUCCESS = "GET_POKE_SUCCESS";
const GET_POKE_NEXT_SUCCESS = "GET_POKE_NEXT_SUCCESS";
const GET_POKE_INFO = "GET_POKE_INFO";



// TODO reducer
export default function pokesReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_POKE_SUCCESS:
      return { ...state, ...action.payload };

    case GET_POKE_NEXT_SUCCESS:
      return { ...state, ...action.payload };

    case GET_POKE_INFO:
      return { ...state, pokeInfo: action.payload };

    default:
      return state;
  }
}

// TODO actions



export const infoPokemonAction = (
  url = "https://pokeapi.co/api/v2/pokemon/1/"
) => async (dispatch, getState) => {

  if (localStorage.getItem(url)) {
    console.log("LocalStorage")
    dispatch({
      type: GET_POKE_INFO,
      payload: JSON.parse(localStorage.getItem(url))
    });
    return;
  }

  try {
    console.log("API")
    const res = await axios.get(url);

    dispatch({
      type: GET_POKE_INFO,
      payload: {
        nombre: res.data.name,
        alto: res.data.height,
        ancho: res.data.weight,
        imagen: res.data.sprites.front_default
      }
    });
    localStorage.setItem(
      url,
      JSON.stringify({
        nombre: res.data.name,
        alto: res.data.height,
        ancho: res.data.weight,
        imagen: res.data.sprites.front_default
      })
    );
  } catch (e) {
    console.log(e);
  }
};



export const obtenerPokemonsAction = () => async (dispatch, getState) => {
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: JSON.parse(localStorage.getItem("offset=0"))
    });
    return;
  }

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
    );

    dispatch({
      type: GET_POKE_SUCCESS,
      payload: res.data
    });
    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};



export const siguientePokeAction = () => async (dispatch, getState) => {
  const next = getState().pokemones.next;

  if (localStorage.getItem(next)) {
    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: JSON.parse(localStorage.getItem(next))
    });
    return;
  }



  try {
    const res = await axios.get(next);
    console.log(res.data);
    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: res.data
    });
    localStorage.setItem(next, JSON.stringify(res.data));
  } catch (e) {
    console.log(e);
  }
};



export const anteriorPokeAction = () => async (dispatch, getState) => {
  const previous = getState().pokemones.previous;

  if (localStorage.getItem(previous)) {
    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: JSON.parse(localStorage.getItem(previous))
    });
    return;
  }

  try {
    const res = await axios.get(previous);
    console.log(res.data);
    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: res.data
    });
    localStorage.setItem(previous, JSON.stringify(res.data));
  } catch (e) {
    console.log(e);
  }
};
