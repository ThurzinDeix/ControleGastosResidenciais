namespace GastosResidenciaisAPI.API.DTOs.RelatorioDTOs
{
    public class ReceitaDespesaPorPessoaDTO
    {
        public int PessoaId { get; set; }
        public string Pessoa { get; set; } = string.Empty;
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
    }
}
