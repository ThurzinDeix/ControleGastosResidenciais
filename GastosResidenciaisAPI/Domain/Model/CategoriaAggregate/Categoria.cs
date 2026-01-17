using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Domain.Model.TransacaoAggregate;
using System.ComponentModel.DataAnnotations;
using System.Transactions;

namespace GastosResidenciaisAPI.Domain.Model.CategoriaAggregate
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
