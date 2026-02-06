import { pool } from "../config/db.js";

const getEmployeesDb = async () => {
    let [data] = await pool.query("SELECT * FROM employees;");
    return data;
}

const insertEmployeeDb = async (Employee_id, Name) =>{
    let [data] = await pool.query('INSERT INTO `employees` `Name` VALUES (?);', [Employee_id, Name])
    return data;
}

const updateEmployeeDb = async (Name, Employee_id) => {
    let [data] = await pool.query('UPDATE `employees` SET `Name` = ? WHERE (`Employee_id` = ?);', [Name, Employee_id])
    return data
}

const deleteEmployeeDb = async (Employee_id) => {
    let [data] = await pool.query('DELETE FROM `employees` WHERE (`Employee_id` = ?);', [Employee_id])
    return data
}
export { getEmployeesDb, insertEmployeeDb, updateEmployeeDb, deleteEmployeeDb };