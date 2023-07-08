using EmployeeRegistry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeRegistry.Controllers
{
    public class EmployeeController : Controller
    {
        EmployeeRegistry.DBContext.EmployeeRegistryEntities _dbContext = new EmployeeRegistry.DBContext.EmployeeRegistryEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create(int empid = 0)
        {
            ViewBag.EmpId = empid;
            return View();
        }

        [HttpPost]
        public ActionResult AddOrEditEmployee(EmployeeRegistry.DBContext.Employee emp)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var successMsg = string.Empty;
                    if (emp.ID > 0)
                    {
                        //Update employee
                        var employee = _dbContext.Employees.Where(x => x.ID == emp.ID).FirstOrDefault();

                        if (employee != null)
                        {
                            employee.EmployeeName = emp.EmployeeName;
                            employee.EmployeeAge = emp.EmployeeAge;
                            employee.EmployeeAddress = emp.EmployeeAddress;
                            employee.StateId = emp.StateId;
                            employee.DistId = emp.DistId;

                            _dbContext.SaveChanges();
                            successMsg = "Employee Updated Successfully.";
                        }
                    }
                    else
                    {
                        //Add employee
                        _dbContext.Employees.Add(emp);
                        var result = _dbContext.SaveChanges();
                        if (result > 0)
                        {
                            ModelState.Clear();
                            successMsg = "Employee Inserted Successfully.";
                        }
                        else
                        {
                            successMsg = "Something went wrong.";
                        }

                    }

                    return Json(new { success = true, message = successMsg }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return RedirectToAction("Index", "Employee");
                }
            }
            catch (Exception ex)
            {
                //Insert Application Error Log code
                ////InsertErrorLog(errorDetails)

                return Json(new { success = false, message = ex.Message });
            }
        }

        public ActionResult GetEmployeeToEdit(int empId)
        {
            var emp = this._dbContext.Employees.FirstOrDefault(x => x.ID == empId);

            return Json(new { success = true, message = string.Empty, data = new Employee() { Id = emp.ID, EmployeeName = emp.EmployeeName, EmployeeAge = emp.EmployeeAge, EmployeeAddress = emp.EmployeeAddress, StateId = emp.StateId, DistId = emp.DistId } }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetStates()
        {
            var states = new List<State>();
            try
            {
                foreach (var st in _dbContext.States)
                {
                    states.Add(new State() { StateId = st.StateId, StateName = st.StateName.ToUpper() }); 
                }

                //// Return the states as JSON
                return Json(new { success = true, message = string.Empty, data = states }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //Insert Application Error Log code
                ////InsertErrorLog(errorDetails)

                //return failed message & false flag in json
                return Json(new { success = false, message = ex.Message });
            }
        }

        public ActionResult GetDistricts(int stateId)
        {
            var districts = new List<District>();
            if (stateId > 0)
            {
                var distIds = _dbContext.StateDistMappings.Where(x => x.StateId == stateId).Select(y => y.DistId).ToList();

                districts = _dbContext.Districts.Where(x => distIds.Contains(x.DistId)).Select(cs => new District
                {
                    DistId = cs.DistId,
                    DistrictName = cs.DistrictName.ToUpper()
                }).ToList();

            }

            return Json(new { success = true, message = string.Empty, data = districts }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetEmployees()
        {
            var emps = new List<Employee>();
            try
            {
                foreach (var emp in _dbContext.Employees)
                {
                    emps.Add(new Employee() { Id = emp.ID, EmployeeName = emp.EmployeeName, EmployeeAge = emp.EmployeeAge, EmployeeAddress = emp.EmployeeAddress, State = emp.State.StateName, District = emp.District.DistrictName  });
                }

                //// Return the states as JSON
                return Json(new { success = true, message = string.Empty, data = emps }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //Insert Application Error Log code
                ////InsertErrorLog(errorDetails)

                //return failed message & false flag in json
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult DeleteEmployee(int empId)
        {
            var emp = this._dbContext.Employees.FirstOrDefault(x => x.ID == empId);

            if(emp != null)
            {
                this._dbContext.Employees.Remove(emp);
                this._dbContext.SaveChanges();
            }

            return Json(new { success = true, message = "Employee Deleted Successfully" }, JsonRequestBehavior.AllowGet);
        }

    }
}