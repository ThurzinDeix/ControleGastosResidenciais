namespace GastosResidenciaisAPI.API.DTOs.RelatorioDTOs
{
    public class RelatorioFinanceiroDTO
    {
        public IEnumerable<ReceitaDespesaPorPessoaDTO> ReceitaDespesaPorPessoa { get; set; }
        public IEnumerable<SaldoPorPessoaDTO> SaldoPorPessoa { get; set; }
        public IEnumerable<TotalPorCategoriaDTO> TotalPorCategoria { get; set; }
        public IEnumerable<SaldoGeralLinhaDTO> SaldoGeral { get; set; }
        public IEnumerable<ResumoPessoaDTO> ResumoPorPessoa { get; set; }
        public IEnumerable<ResumoCategoriaDTO> ResumoPorCategoria { get; set; }
    }
}
