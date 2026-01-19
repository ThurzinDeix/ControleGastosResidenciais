using GastosResidenciaisAPI.Domain.Enums;

namespace GastosResidenciaisAPI.API.DTOs.TransacaoDTOs
{
    public class TransacaoCreateDto
    {
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public TipoTransacao Tipo { get; set; }
        public string Descricao { get; set; }
        public int CategoriaId { get; set; }
        public int PessoaId { get; set; }
    }
}
