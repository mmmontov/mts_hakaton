import { useState } from "react";
import styles from "./Card.module.scss";

// Компонент для отображения сотрудников
const EmployeeCard = ({ employee }) => (
  <div className={styles.employeeCard}>
    <p>
      {employee.name} {employee.surname}
    </p>
    <p>{employee.position}</p>
    <p style={{ color: employee.flag === "Свободен" ? "green" : "red" }}>
      {employee.flag}
    </p>
  </div>
);

// Компонент для отображения департамента
const DepartmentCard = ({ department, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(department.isOpen || false);

  const handleClick = () => setIsOpen(!isOpen);

  const backgroundColor = `hsl(0, 0%, ${100 - depth * 5}%)`;

  return (
    <div
      className={styles.departmentCard}
      style={{ backgroundColor }}
    >
      <h3 onClick={handleClick}>{department.name || "Без названия"}</h3>

      {isOpen && (
        <div className="details">
          {department.workers && department.workers.length > 0 && (
            <div className="workers">
              {department.workers.map((worker) => (
                <EmployeeCard key={worker.id} employee={worker} />
              ))}
            </div>
          )}

          {department.subDepartments &&
            Object.entries(department.subDepartments).length > 0 && (
              <div className="sub-departments">
                {Object.entries(department.subDepartments).map(([key, subDept]) => (
                  <DepartmentCard
                    key={key}
                    department={subDept}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

// Главный компонент для отображения дерева департаментов
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
