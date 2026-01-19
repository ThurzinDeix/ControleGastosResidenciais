using GastosResidenciaisAPI.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Transactions;

namespace GastosResidenciaisAPI.Domain.Entities
{
    public class Categoria
    {
        [Key]
        public int id { get; set; }
        public string descricao { get; set; }
        public FinalidadeCategoria finalidade { get; set; }
        public ICollection<Transacao> transacoes { get; set; }
        }
}
