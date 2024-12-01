import { useState } from "react";
import styles from "./Card.module.scss";

// Компонент для отображения сотрудников
const EmployeeCard = ({ employee }) => (
  <div className={styles.employeeCard}>
    <img src="../public/Person.svg" alt="Аватарка" className={styles.peson} />
<div className={styles.text}> 
<p style={{ backgroundColor: employee.flag === "Свободен" ? "#A2F64F" : "#FF0032" }} className={styles.status}>
      {employee.flag}
    </p>
     <p className={styles.name}>
      {employee.name} {employee.surname}
    </p>
    <p className={styles.position}>{employee.position}</p>
</div>
  </div>
);

// Компонент для отображения департамента
const DepartmentCard = ({ department, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(department.isOpen || false);

  const handleClick = () => setIsOpen(!isOpen);

  const backgroundColor = `hsl(0, 0%, ${100 - depth * 2}%)`;

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
