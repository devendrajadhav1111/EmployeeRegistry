using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeRegistry.Models
{
    public class District
    {
        public int DistId { get; set; }
        public string DistrictName { get; set; }
        public bool IsActive { get; set; }
    }
}