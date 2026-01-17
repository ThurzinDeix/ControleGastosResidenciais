namespace GastosResidenciaisAPI.Domain.DTOs.RelatorioDTOs
{
    public class TotaisPessoasDto
    {
        public int PessoaId { get; set; }
        public string Nome { get; set; }
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal Saldo => TotalReceita - TotalDespesa;
    }
}
