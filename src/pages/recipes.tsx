import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Headings/Header/header';
import NavBar from '../components/Headings/NavBar/navbar';
import RecipeList from '../components/RecipeList/recipeList';
import { rewrite_store } from '../state/actions';
import { fetchProfileData } from '../services/apiService';

interface recipe {
  id: string;
  name: string;
  keywords: string[];
  image: string;
  recipeYield: string;
  recipeIngredient: string[];
  recipeInstructions: string[];
  publisher: string;
  author: string;
  url: string;
  notes: recipeNote[];
  origin: string;
}

interface recipeNote {
  id: string;
  text: string;
}
interface RootState {
  username: string;
  isAuthenticated: boolean;
  recipeStore: recipe[];
}


const RecipePage: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
  const recipeStore = useSelector((state: RootState) => state.recipeStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchProfileData().then(res => res.json())
      dispatch(rewrite_store(userData.recipeStore));
    }

    if (isAuthenticated) {
      getUserData();
    }
  }, [isAuthenticated, dispatch])


  return ( <>
   {
     isAuthenticated && <>
        <Header/>
        <NavBar/>
        {recipeStore.length? <RecipeList recipeStore={recipeStore} viewAsSelf={true}/> : null}
      </>
   }
  </> );
}

export default RecipePage;