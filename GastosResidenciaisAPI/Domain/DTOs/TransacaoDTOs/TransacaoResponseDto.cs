using GastosResidenciaisAPI.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Domain.DTOs.TransacaoDTOs
{
    public class TransacaoResponseDto
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public string Descricao { get; set; }
        public TipoTransacao Tipo { get; set; }
        public string PessoaNome { get; set; }
        public string CategoriaDescricao { get; set; }
    }
}
