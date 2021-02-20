using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Movex.Services;

namespace Movex.Controllers
{
    public class BaseController : Controller
    {
        
        protected readonly IMovexServiceClient _movex;
        protected readonly ITransmissionServiceClient _transmission;
        protected readonly IHttpContextAccessor _httpContextAccessor;
        protected ISession _session => _httpContextAccessor.HttpContext.Session;

        public BaseController(
            IMovexServiceClient movex,
            ITransmissionServiceClient transmission,
            IHttpContextAccessor httpContextAccessor)
        {
            
            _movex = movex;
            _transmission = transmission;
            _httpContextAccessor = httpContextAccessor;
        }

    }
}
