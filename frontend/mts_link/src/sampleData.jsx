const sampleData = [
    {
      id: 1,
      name: "Главный департамент",
      subDepartments: [
        {
          id: 2,
          name: "Отдел A",
          subDepartments: [],
          workers: [
            { id: 1, name: "Иван", surname: "Иванов", flag: "На больничном", position: "Менеджер" },
            { id: 2, name: "Мария", surname: "Смирнова", flag: "Работает", position: "Разработчик" },
          ],
        },
        {
          id: 3,
          name: "Отдел B",
          subDepartments: [
            {
              id: 4,
              name: "Подотдел B1",
              subDepartments: [],
              workers: [
                { id: 3, name: "Петр", surname: "Петров", flag: "Отпуск", position: "Аналитик" },
              ],
            },
          ],
          workers: [],
        },
      ],
      workers: [
        { id: 4, name: "Светлана", surname: "Кузнецова", flag: "Работает", position: "HR" },
      ],
    },
  ];
  
  export default sampleData;
  