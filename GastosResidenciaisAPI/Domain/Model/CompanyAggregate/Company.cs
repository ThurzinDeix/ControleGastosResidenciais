using System.ComponentModel.DataAnnotations.Schema;

namespace GastosResidenciaisAPI.Domain.Model.CompanyAggregate
{
    [Table("company")]
    public class Company
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}
