using GastosResidenciaisAPI.Domain.DTOs;
namespace GastosResidenciaisAPI.Domain.Model.EmployeeAggregate
{
    public interface IEmployeeRepository
    {
        void Add(Employee employee);
        List<EmployeeDTO> Get(int pageNumber, int pageQuantity);
        EmployeeDTO Get(int id);
    }
}
