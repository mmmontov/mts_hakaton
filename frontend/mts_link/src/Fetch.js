async function fetchData(url) {
    try {
      const response = await fetch(url); // Получаем ответ
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Проверяем статус ответа
      }
      const data = await response.json(); // Дожидаемся преобразования в JSON
      console.log(data); // Логируем результат
      return data; // Возвращаем результат
    } catch (error) {
      console.error("Fetch error:", error); // Обрабатываем любые ошибки
      return null; // Возвращаем null в случае ошибки
    }
  }

export default fetchData;