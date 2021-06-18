import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Header from '../components/Headings/Header/header';
import NavBar from '../components/Headings/NavBar/navbar';
import RecipeList from '../components/RecipeList/recipeList';
import { getFriends, getFriendStore } from '../services/apiService';

interface RootState {
  username: string;
  isAuthenticated: boolean;
  // recipeStore: recipe[];
}

interface Selected {
  value: string;
}



const VisitFriendsPage: React.FC<HTMLSelectElement> = () => {
  const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
  const [friendStore, setFriendStore] = useState<[]>([]);
  const [options, setOptions] = useState<[]>([]);

  useEffect(() => {
    const getUserList = async() => {
      const response = await getFriends().then(res => res.json());
      const userList = response.map((username: RootState) => ({value: username, label: username}));
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

  const handleSelect = async(selected: Selected) => {
    try {
      const store = await getFriendStore(selected.value).then(res => res.json());
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
          <Select options={options} onChange={(handleSelect:  }/>
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