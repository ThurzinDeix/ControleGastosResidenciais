using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GastosResidenciaisAPI.Domain.Entities
{
    [Table("Pessoa")]
    public class Pessoa
    {
        [Key]

        public int id { get; set; }
        public string nome { get; set; }
        public int idade { get; set; }
        public ICollection<Transacao> transacoes { get; set; }
    }
}
