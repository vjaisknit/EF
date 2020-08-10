using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eFactory.Model
{
    public class Contractor
    {
        public int id { get; set; }

        [Required(ErrorMessage = "Contractor Name is required")]
        public string ContractorName { get; set; }

        [Required(ErrorMessage = "Mobile Number is required")]
        public long MobileNumber { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        public int status { get; set; }
        public int IsDelete { get; set; }
    }
}
