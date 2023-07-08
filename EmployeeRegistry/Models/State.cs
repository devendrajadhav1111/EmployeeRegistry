using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeRegistry.Models
{
    public class State
    {
        public int StateId { get; set; }
        public string StateName { get; set; }
        public bool IsActive { get; set; }
    }
}