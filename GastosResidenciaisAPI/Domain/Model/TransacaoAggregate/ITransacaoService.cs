using GastosResidenciaisAPI.Domain.DTOs.RelatorioDTOs;
using GastosResidenciaisAPI.Domain.DTOs.TransacaoDTOs;

namespace GastosResidenciaisAPI.Domain.Model.TransacaoAggregate
{
    public interface ITransacaoService
    {
        int Criar(TransacaoCreateDto dto);
        IEnumerable<TransacaoResponseDto> Listar();

        IEnumerable<TotaisPessoasDto> TotaisPorPessoa(int? mes, int? ano);
        IEnumerable<TotaisCategoriaDto> TotaisPorCategoria(int? mes, int? ano);
        IEnumerable<TotaisGeraisDto> TotaisGerais(int? mes, int? ano);
    }
}
