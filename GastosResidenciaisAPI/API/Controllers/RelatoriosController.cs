using GastosResidenciaisAPI.API.DTOs.RelatorioDTOs;
using GastosResidenciaisAPI.Application.Interfaces;
using GastosResidenciaisAPI.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/relatorios")]
public class RelatoriosController : ControllerBase
{
    private readonly IRelatorioService _service;

    public RelatoriosController(IRelatorioService service)
    {
        _service = service;
    }

    /// <summary>
    /// Obtém o relatório financeiro para o período informado
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<RelatorioFinanceiroDTO>> ObterRelatorio(
        [FromQuery] PeriodoRelatorio periodo)
    {
        var relatorio = await _service.GerarRelatorioAsync(periodo);
        return Ok(relatorio);
    }
}
