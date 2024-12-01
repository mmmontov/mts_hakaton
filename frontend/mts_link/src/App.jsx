import './App.css';
import { useState, useEffect } from 'react';
import DepartmentTree from './Card.jsx';
import fetchData from './Fetch.js';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true); // Устанавливаем состояние загрузки
      try {
        const result = await fetchData('http://127.0.0.1:8000/search/');
        if (result) {
          setData(result); // Устанавливаем данные
        } else {
          throw new Error("Получены некорректные данные.");
        }
      } catch (err) {
        setError(err.message); // Обрабатываем ошибку
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    fetchDataFromAPI();
  }, []); // Выполняется один раз при монтировании компонента

  // Состояние загрузки
  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  // Состояние ошибки
  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // Рендеринг компонента с данными
  return (
    <div className="App">
      <h1>Департаменты</h1>
      {data ? <DepartmentTree data={data} /> : <div>Нет данных для отображения</div>}
    </div>
  );
}

export default App;
