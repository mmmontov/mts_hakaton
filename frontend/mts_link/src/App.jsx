import './App.css';
import { useState, useEffect } from 'react';
import DepartmentTree from './Card.jsx';
import fetchData from './Fetch.js';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Строка поиска
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true);
      try {
        const result = await fetchData('http://127.0.0.1:8000/search/');
        if (result) {
          setData(result);
          setFilteredData(result); // Изначально фильтрованные данные совпадают с оригинальными
        } else {
          throw new Error("Получены некорректные данные.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []);

  // Фильтрация данных по поисковому запросу
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data); // Если запрос пуст, показываем исходные данные
    } else if (data) {
      const filtered = filterByPosition(data, searchQuery);
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  // Обработчик изменения строки поиска
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Департаменты</h1>
      <input
        type="text"
        placeholder="Введите должность..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ margin: "10px 0", padding: "5px", width: "300px" }}
      />
      {filteredData ? (
        <DepartmentTree data={filteredData} />
      ) : (
        <div>Нет данных для отображения</div>
      )}
    </div>
  );
}

// Функция фильтрации с учетом открытия департаментов
const filterByPosition = (data, query) => {
  const lowerCaseQuery = query.toLowerCase();

  const filterDepartment = (department) => {
    const filteredWorkers = department.workers?.filter((worker) =>
      worker.position.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredSubDepartments = Object.entries(department.subDepartments || {})
      .map(([key, subDept]) => [key, filterDepartment(subDept)])
      .filter(([, subDept]) => subDept);

    // Если есть подходящие сотрудники или поддепартаменты, департамент должен быть открыт
    if (filteredWorkers.length > 0 || filteredSubDepartments.length > 0) {
      return {
        ...department,
        isOpen: true, // Добавляем флаг для открытия
        workers: filteredWorkers,
        subDepartments: Object.fromEntries(filteredSubDepartments),
      };
    }

    return null;
  };

  const filteredSubDepartments = Object.entries(data.subDepartments || {})
    .map(([key, dept]) => [key, filterDepartment(dept)])
    .filter(([, dept]) => dept);

  return {
    ...data,
    subDepartments: Object.fromEntries(filteredSubDepartments),
  };
};

export default App;
