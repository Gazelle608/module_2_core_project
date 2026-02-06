// Function to calculate payroll for an employee
export const calculatePayroll = (employeeId, hoursWorked, hourlyRate) => {
  // Validate employee ID
  if (!employeeId || isNaN(employeeId)) throw new Error("Invalid employee ID");

  // Validate hours worked
  if (!hoursWorked || isNaN(hoursWorked) || hoursWorked < 0)
    throw new Error("Invalid hours worked");

  // Validate hourly rate
  if (!hourlyRate || isNaN(hourlyRate) || hourlyRate < 0)
    throw new Error("Invalid hourly rate");

  // Calculate gross pay
  const grossPay = hoursWorked * hourlyRate;

  // Calculate tax (assume 15%)
  const tax = grossPay * 0.15;

  // Calculate net pay after tax
  const netPay = grossPay - tax;

  // Return structured payroll data
  return { employeeId, hoursWorked, hourlyRate, grossPay, tax, netPay };
};
