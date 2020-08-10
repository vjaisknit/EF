using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eFactory.Model
{
    public class Party
    {
        public int id { get; set; }
        [Required(ErrorMessage = "Party Name is required")]
        public string PartyName { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        [Required(ErrorMessage = "Mobile No is required")]
        public long MobileNo { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        
        public int PartyTypeId { get; set; }
        public int Statusid { get; set; }
        public int IsDelete { get; set; }
    }
}
