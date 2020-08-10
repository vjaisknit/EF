using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eFactory.Model
{
    public class ItemSeries
    {
        public int id { get; set; }

        [Required(ErrorMessage ="Item series is required")]
        public string Description { get; set; }
        [Required]
        public int status { get; set; }

        public int IsDelete { get; set; }
    }
}
