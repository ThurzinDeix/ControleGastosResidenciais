using GastosResidenciaisAPI.Domain.DTOs;
using GastosResidenciaisAPI.Domain.Model.EmployeeAggregate;

namespace GastosResidenciaisAPI.Infraestrutura.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();
        public void Add(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
        }

        public List<EmployeeDTO> Get(int pageNumber, int pageQuantity)
        {
            return _context.Employees.Skip(pageNumber * pageQuantity)
                .Take(pageQuantity)
                .Select(b => 
                new EmployeeDTO()
                {
                    Id = b.id,
                    NomeEmp = b.nome,
                    Photo = b.photo
                }).ToList();
        }

        public Employee? Get(int id)
        {
            return _context.Employees.Find(id);
        }

        EmployeeDTO IEmployeeRepository.Get(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null) return null;
            return new EmployeeDTO
            {
                Id = employee.id,
                NomeEmp = employee.nome,
                Photo = employee.photo
            };
        }
    }
}
