using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eFactory.Errors
{
    public class ApiValidationErrorResponse : APIResponse
    {
        public ApiValidationErrorResponse() : base(400)
        {
        }

        public IEnumerable<string> Errors { get; set; }
    }
}
