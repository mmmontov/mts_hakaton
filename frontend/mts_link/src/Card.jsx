// import { useState } from "react";
// import styles from './Card.module.scss';


// function Card({name}) {
//     const [show, setShow] = useState('Департамент');
// return(
//     <>
//     <div className={styles.card}>
//         <h1>{show}</h1>
//     </div>

//     <button onClick={()=> setShow('Хуй')}>show</button>
//     </>
//     )
// }

// export default Card;

import { useState } from 'react';

// Компонент для отображения сотрудника
const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <p>{employee.name} {employee.surname}</p>
      <p>{employee.flag}</p>
      <p>{employee.position}</p>
    </div>
  );
};

// Компонент для отображения департамента
const DepartmentCard = ({ department }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="department-card">
      <h3 onClick={handleClick}>{department.name}</h3>
      {isOpen && (
        <div className="sub-departments">
          {department.subDepartments.length > 0 ? (
            department.subDepartments.map((subDept) => (
              <DepartmentCard key={subDept.id} department={subDept} />
            ))
          ) : (
            <div className="employees">
              {department.workers.map((worker) => (
                <EmployeeCard key={worker.id} employee={worker} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Родительский компонент для отображения всех департаментов
const DepartmentTree = ({ departments }) => {
    // Проверяем, что departments это массив
    if (!Array.isArray(departments)) {
      return <div>Ошибка: Данные о департаментах не загружены.</div>;
    }
  
    return (
      <div className="department-tree">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    );
  };
  

export default DepartmentTree;
