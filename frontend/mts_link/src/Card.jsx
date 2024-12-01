import { useState } from "react";
import styles from "./Card.module.scss";

// Стили для флага сотрудника
const openStyle = {
  backgroundColor: "#008000",
  color: "#90ee90",
};

const closeStyle = {
  backgroundColor: "#d40000",
  color: "#ff9e9e",
};




// Компонент для отображения сотрудников
const EmployeeCard = ({ employee }) => (
  <div className={styles.employeeCard}>
    <p>
      {employee.name} {employee.surname}
    </p>
    <p>{employee.position}</p>
    <p style={employee.flag === "Свободен" ? openStyle : closeStyle}>
      {employee.flag}
    </p>
  </div>
);

// Компонент для отображения департамента
const DepartmentCard = ({ department, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => setIsOpen(!isOpen);

  // Генерация цвета фона для департамента
  const backgroundColor = `hsl(0, 0%, ${100 - depth * 5}%)`;

  return (
    <div
      className={styles.departmentCard}
      style={{
        backgroundColor,
      }}
    >
      {/* Название департамента */}
      <h3 onClick={handleClick}>{department.name || "Без названия"}</h3>

      {/* Контент с анимацией */}
      <div
        className={`${styles.details} ${isOpen ? styles.open : styles.closed}`}
      >
        {/* Сотрудники */}
        {department.workers && department.workers.length > 0 && (
          <div className="workers">
            {department.workers.map((worker) => (
              <EmployeeCard key={worker.id} employee={worker} />
            ))}
          </div>
        )}

        {/* Поддепартаменты */}
        {department.subDepartments &&
          Object.keys(department.subDepartments).length > 0 && (
            <div className="sub-departments">
              {Object.entries(department.subDepartments).map(([key, subDept]) => (
                <DepartmentCard
                  key={key}
                  department={subDept}
                  depth={depth + 1} // Передаем уровень вложенности
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

// Главный компонент
const DepartmentTree = ({ data }) => {
  if (!data || !data.subDepartments) {
    return <div>Нет данных для отображения.</div>;
  }

  return (
    <div className={styles.departmentTree}>
      {Object.entries(data.subDepartments).map(([key, rootDept]) => (
        <DepartmentCard key={key} department={rootDept} depth={0} />
      ))}
    </div>
  );
};

export default DepartmentTree;
