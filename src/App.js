
import React, { useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useState } from 'react';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  // создает стейт в котором будут храниться пользователи
  const [users, setUsers] = useState([]);
  // создаем стейт для скелетонов
  const [isLoading, setLoading] = useState(true);
  // создаем стейт для живого поиска
  const [searchValue, setSearchValue] = useState('');
  // создаем юзэфект для получения пользователей с апи
  useEffect(()=>{
    // делаем фетч запрос для получения пользователей
    fetch(' https://reqres.in/api/users').then(res => res.json()).then((json) => {
      setUsers(json.data)
    }).catch(err => {
      console.warn(err);
      alert('ошибка при получении');
      // finaly в данном случае после получения ответа от фетча меняет дщфдинг с тру на фолс чтобы скелетоны пропали
    }).finally(() => setLoading(false));
  },[]);
  // создаем функцию для замены значений
  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);

    // console.log(searchValue);
  }
  return (
    <div className="App">
      <Users 
      searchValue={searchValue} 
     onChangeSearchValue={onChangeSearchValue} 
     items={users}
      isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;
