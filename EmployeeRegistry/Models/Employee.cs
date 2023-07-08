using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeRegistry.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public int EmployeeAge { get; set; }
        public string EmployeeAddress { get; set; }

        public string State { get; set; }

        public string District { get; set; }
        public int StateId { get; set; }
        public int DistId { get; set; }
        public bool IsActive { get; set; }
    }
}