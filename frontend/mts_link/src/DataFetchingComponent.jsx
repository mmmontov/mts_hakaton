import { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null); // Состояние для данных
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибок

  useEffect(() => {
    // Функция для получения данных
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080'); // Замените URL на ваш бэкенд
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Сохранение данных в состояние
      } catch (err) {
        setError(err.message); // Сохранение ошибки в состояние
      } finally {
        setLoading(false); // Окончание загрузки
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>Данные с бэкенда:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetchingComponent;
