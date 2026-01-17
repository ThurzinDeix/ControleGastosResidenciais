using GastosResidenciaisAPI.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {
        [HttpPost]
        public IActionResult Auth(string username, string password)
        {
            if (username == "Arthur" && password == "1234")
            {
                var token = TokenService.GenerateToken(new Domain.Model.EmployeeAggregate.Employee()); 
                return Ok(token);
            }
            else
            {
                return Unauthorized("Usuário ou senha inválidos.");
            }
        }
    }
}
