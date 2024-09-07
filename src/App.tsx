import React, { useEffect, useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import "@egjs/react-flicking/dist/flicking.css";
import './App.scss';
import { useDispatch } from 'react-redux';
import { setAuthSuccess, setProfile } from './store/auth/authActions';

const App: React.FC = () => {

  const [isloaded,setIsLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{
  const user = localStorage.getItem("user")
  if(user) {
    dispatch(setAuthSuccess(JSON.parse(user)));
    dispatch(setProfile(JSON.parse(user)));
  }
  setIsLoaded(true)
  },[])

  return (
    <>
    {
      isloaded && 
      <div className="mainDivColor">{<MainLayout />}</div>
    }
    </>
  );
};

export default App;
