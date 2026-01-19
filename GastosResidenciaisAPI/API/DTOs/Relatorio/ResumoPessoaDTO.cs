namespace GastosResidenciaisAPI.API.DTOs.RelatorioDTOs
{
    public class ResumoPessoaDTO
    {
        public string Pessoa { get; set; } = string.Empty;
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal Saldo => TotalReceita - TotalDespesa;
    }
}
