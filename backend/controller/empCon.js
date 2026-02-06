import { deleteEmployeeDb, getEmployeesDb, insertEmployeeDb, updateEmployeeDb } from "../models/empDb.js";

const getEmployeesCon = async (req, res) => {
    res.json({employees: await getEmployeesDb()});
}
const insertEmployeesCon = async (req, res) => {
    let {Employee_id, Name} = req.body
    await insertEmployeeDb(Employee_id, Name)
    res.json({employees: await getEmployeesDb()});
}

const updateEmployeeCon = async (req, res) =>{
    let {Employee_id} = req.params
    let {Name }= req.body
    await updateEmployeeDb(Name, Employee_id)
        res.json({employees: await getEmployeesDb()});
}

const deleteEmployeeCon = async (req, res) =>{
    let {Employee_id} = req.params
    await deleteEmployeeDb(Employee_id)
    res.json({employees: await getEmployeesDb()});
}
export { getEmployeesCon, insertEmployeesCon, updateEmployeeCon, deleteEmployeeCon };