//context creation 
//provider
//consumer  replace by useContext hook

import { useEffect, createContext, useContext, useReducer } from "react";
import reducer from './reducer'
const AppContext = createContext();

let API = "https://hn.algolia.com/api/v1/search?"

const initialState = {
    isLoading:true,
    query:"",
    nbPages:0,
    page:0,
    hits:[]
}
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const fetchApiData = async (url) => {
        dispatch({type:"SET_LOADING"})
        try {
            const res = await fetch(url);
            const data = await res.json()
            // console.log(data);
            dispatch({
                type:"GET_STORIES",
                payload:{
                    hits:data.hits,
                    nbPages:data.nbPages
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    //to remove the post
    const removePost = (post_ID)=>{
        dispatch({type:"REMOVE_POST", payload: post_ID})
    }

    //to search post
    const searchPost = (searchQuery) =>{
        dispatch({type:"SEARCH_POST",payload:searchQuery})
    }


    //Pagination
    const getPrevPage = () =>{
        dispatch({type:"PREV_PAGE"})
    }

    const getNextPage = () =>{
        dispatch({type:"NEXT_PAGE"})
    }

    //Call the API function
    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`)

    }, [state.query, state.page])
    return (
        <AppContext.Provider value={{...state, removePost, searchPost, getPrevPage, getNextPage}} >
            {children}
        </AppContext.Provider>
    );
}

//custom hook creation

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext }