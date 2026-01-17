using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Domain.Model.CategoriaAggregate;
using GastosResidenciaisAPI.Domain.Model.PessoaAggregate;
using System.ComponentModel.DataAnnotations;

namespace GastosResidenciaisAPI.Domain.Model.TransacaoAggregate
{
    public class Transacao
    {
        [Key]

        public int id { get; set; }
        public decimal valor { get; set; }
        public DateTime data { get; set; }
        public TipoTransacao tipo { get; set; }
        public String descricao { get; set; }


        public int pessoaId { get; set; }
        public Pessoa Pessoa { get; set; }


        public int categoriaId { get; set; }
        public Categoria Categoria { get; set; }
    }
}
