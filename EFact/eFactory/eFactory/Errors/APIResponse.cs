using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eFactory.Errors
{
    public class APIResponse
    {
        public APIResponse(int statusCode, string massage = null)
        {
            StatusCode = statusCode;
            Massage = massage ?? GetDefaultMassageForStatusCode(statusCode);
        }

        private string GetDefaultMassageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A Bad Request, you have Made",
                401 => "You are not Authorozed",
                404 => "Resource not Found",
                5000 => "Internal Server Error",
                _ => null
            };
        }

        public int StatusCode { get; set; }
        public string Massage { get; set; }
    }
}
