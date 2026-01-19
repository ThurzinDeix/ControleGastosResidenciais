namespace GastosResidenciaisAPI.API.DTOs.RelatorioDTOs
{
    public class TotaisGeraisDto
    {
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal Saldo => TotalReceita - TotalDespesa;
    }
}
