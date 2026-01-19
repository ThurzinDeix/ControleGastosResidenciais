using GastosResidenciaisAPI.API.DTOs.RelatorioDTOs;
using GastosResidenciaisAPI.Domain.Enums;

namespace GastosResidenciaisAPI.Application.Interfaces
{
    public interface IRelatorioService
    {
        Task<RelatorioFinanceiroDTO> GerarRelatorioAsync(PeriodoRelatorio periodo);
    }
}
