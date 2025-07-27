import { createContext, use, useState, useEffect } from 'react'
import axios from 'axios';

export const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const url = "https://qmtz1z8m-4000.asse.devtunnels.ms"

  const [users, setUsers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [token, setToken] = useState("");
  const [isLoggedin, setisLoggedin] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/users/list`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${url}/api/topics/list`);
      setTopics(response.data.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  }

  useEffect(() => {
    fetchUsers(); 
    fetchTopics();
    setisLoggedin(!!localStorage.getItem('token'));
  }, []);

  const value = {
    url,
    users,
    fetchUsers,
    token,
    setToken,
    isLoggedin,
    setisLoggedin,
    topics,
    setTopics,
    fetchTopics
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}