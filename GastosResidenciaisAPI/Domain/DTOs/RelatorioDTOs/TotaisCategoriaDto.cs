namespace GastosResidenciaisAPI.Domain.DTOs.RelatorioDTOs
{
    public class TotaisCategoriaDto
    {
        public int CategoriaId { get; set; }
        public string Descricao { get; set; }
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal Saldo => TotalReceita - TotalDespesa;
    }
}
