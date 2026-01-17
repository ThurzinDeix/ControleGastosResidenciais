using System.ComponentModel.DataAnnotations.Schema;

namespace GastosResidenciaisAPI.Domain.Model.EmployeeAggregate
{
    [Table ("employee")]
    public class Employee
    {
        
        public int id { get; private set; }
        public string nome { get; private set; }
        public int age { get; private set; }
        public string? photo { get; private set; }

        public Employee( string nome, int age, string photo)
        {
            this.nome = nome ?? throw new ArgumentNullException(nameof(nome));
            this.age = age;
            this.photo = photo;
        }

        public Employee()
        {
        }
    }
}
