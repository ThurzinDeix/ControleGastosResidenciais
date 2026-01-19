namespace GastosResidenciaisAPI.API.DTOs.RelatorioDTOs
{
    public class SaldoPorPessoaDTO
    {
        public int PessoaId { get; set; }
        public string Pessoa { get; set; } = string.Empty;
        public decimal Saldo { get; set; }
    }
}
