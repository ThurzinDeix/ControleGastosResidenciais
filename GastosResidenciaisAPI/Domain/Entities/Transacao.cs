using GastosResidenciaisAPI.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace GastosResidenciaisAPI.Domain.Entities
{
    public class Transacao
    {
        [Key]

        public int id { get; set; }
        public decimal valor { get; set; }
        public DateTime data { get; set; }
        public TipoTransacao tipo { get; set; }
        public string descricao { get; set; }


        public int pessoaId { get; set; }
        public Pessoa Pessoa { get; set; }


        public int categoriaId { get; set; }
        public Categoria Categoria { get; set; }
    }
}
