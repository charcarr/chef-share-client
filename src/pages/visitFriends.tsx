import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Header from '../components/Headings/Header/header';
import NavBar from '../components/Headings/NavBar/navbar';
import RecipeList from '../components/RecipeList/recipeList';
import apiService from '../services/apiService';


const VisitFriendsPage = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const [friendStore, setFriendStore] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getUserList = async() => {
      const response = await apiService.getFriends().then(res => res.json());
      const userList = response.map(username => ({value: username, label: username}));
      setOptions(userList);
    }
    if (isAuthenticated) {
      try {
        getUserList();
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  const handleSelect = async(selected) => {
    try {
      const store = await apiService.getFriendStore(selected.value).then(res => res.json());
      setFriendStore(store);
    } catch(e) {

    }
  }

  return ( <>
    {
      isAuthenticated  &&  <>
        <Header/>
        <NavBar/>
        <div style={{width: '80%', marginLeft: '10%', marginRight:'10%', marginTop: '20px'}}>
          <Select options={options} onChange={handleSelect}/>
        </div>
        {
          friendStore.length ? <RecipeList recipeStore={friendStore} viewAsSelf={false}/> : null
        }
      </>

    }
    </>
  );
}

export default VisitFriendsPage;