using AutoMapper;
using GastosResidenciaisAPI.Application.ViewModel;
using GastosResidenciaisAPI.Domain.DTOs;
using GastosResidenciaisAPI.Domain.Model.EmployeeAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.Controllers
{
    [ApiController]
    [Route("api/v1/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(IEmployeeRepository employeeRepository, ILogger<EmployeeController> logger)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add([FromForm]EmployeeViewModel employeeView)
        {
            var filePath = Path.Combine("Storage", employeeView.Photo.FileName);
           

            using Stream fileStream = new FileStream(filePath, FileMode.Create);
            employeeView.Photo.CopyTo(fileStream);

            var employee = new Employee(employeeView.Name, employeeView.Age, filePath);
            
            _employeeRepository.Add(employee);

            return Ok();
        }

        
        [HttpGet]
        public IActionResult Get(int pageNumber, int pageQuantity)
        {
            var employees = _employeeRepository.Get(pageNumber, pageQuantity);
            return Ok(employees);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var employees = _employeeRepository.Get(id);
            return Ok(employees);
        }



        [Authorize]
        [HttpPost]
        [Route ("{id}/download")]
        public IActionResult DownloadPhoto(int id)
        {
            var employee = _employeeRepository.Get(id);

            var dataBytes = System.IO.File.ReadAllBytes(employee.Photo);

            return File(dataBytes, "image/jpg");
        }
    }
}
