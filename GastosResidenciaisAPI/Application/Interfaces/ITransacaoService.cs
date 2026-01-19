using GastosResidenciaisAPI.API.DTOs.RelatorioDTOs;
using GastosResidenciaisAPI.API.DTOs.TransacaoDTOs;

namespace GastosResidenciaisAPI.Application.Interfaces
{
    public interface ITransacaoService
    {
        int Criar(TransacaoCreateDto dto);
        IEnumerable<TransacaoResponseDto> Listar();

        IEnumerable<TotaisPessoasDto> TotaisPorPessoa(int? mes, int? ano);
        IEnumerable<TotaisCategoriaDto> TotaisPorCategoria(int? mes, int? ano);
        IEnumerable<TotaisGeraisDto> TotaisGerais(int? mes, int? ano);
        void Delete(int id);
    }
}
