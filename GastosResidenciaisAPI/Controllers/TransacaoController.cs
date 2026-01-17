using GastosResidenciaisAPI.Domain.DTOs.TransacaoDTOs;
using GastosResidenciaisAPI.Domain.Model.TransacaoAggregate;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase
    {
        public ITransacaoService _transacaoService;
        public TransacaoController(ITransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] TransacaoCreateDto dto)
        {
            var id = _transacaoService.Criar(dto);
            return CreatedAtAction(nameof(GetAll), new { id = id }, null);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var transacoes = _transacaoService.Listar();
            return Ok(transacoes);
        }

        [HttpGet("totais/pessoa")]
        public IActionResult TotaisPorPessoas(int? mes, int? ano)
        {
            var result = _transacaoService.TotaisPorPessoa(mes, ano);
            return Ok(result);
        }

        [HttpGet("totais/categoria")]
        public IActionResult TotaisPorCategoria(int? mes, int? ano)
        {
            var result = _transacaoService.TotaisPorCategoria(mes, ano);
            return Ok(result);
        }

        [HttpGet("totais/gerais")]
        public IActionResult TotaisGerais(int? mes, int? ano)
        {
            var result = _transacaoService.TotaisGerais(mes, ano);
            return Ok(result);
        }
    }
}
