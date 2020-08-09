using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eFactory.Extension
{
    public static class ClaimPrincipalExtension
    {
        public static string retriveEmailFromPrincipal(this ClaimsPrincipal user)
        {
            return user?.Claims?.FirstOrDefault(a => a.Type == ClaimTypes.Email)?.Value;
        }
        public static string retriveNameFromPrincipal(this ClaimsPrincipal user)
        {
            return user?.Claims?.FirstOrDefault(a => a.Type == ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
