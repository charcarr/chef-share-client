import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileData } from '../services/apiService';
import { set_username } from '../state/actions';

import Header from '../components/Headings/Header/header';
import RecipeAdder from '../components/RecipeAdder/recipeAdder';
import NavBar from '../components/Headings/NavBar/navbar';

interface RootState {
  username: string;
  isAuthenticated: boolean;
  //recipeStore: recipe[];
}

const ProfilePage: React.FC<HTMLElement> = () => {

  const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect( () => {

    const getUserData = async () => {
      const userData = await (await fetchProfileData()).json();
      dispatch(set_username(userData.username));
    }

    if (isAuthenticated) {
      getUserData();
    }

  }, [isAuthenticated, dispatch])


  return (
  <>
    {
      isAuthenticated && <>
          <Header/>
          <NavBar/>
          <RecipeAdder/>
        </>
    }
    {
      !isAuthenticated && <div>you need to login first!!!</div>
    }

  </> );
}

export default ProfilePage;