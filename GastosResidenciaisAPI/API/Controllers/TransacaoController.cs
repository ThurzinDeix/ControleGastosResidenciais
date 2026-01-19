using GastosResidenciaisAPI.API.DTOs.TransacaoDTOs;
using GastosResidenciaisAPI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.API.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _transacaoService;

        public TransacaoController(ITransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        /// <summary>
        /// Cria uma nova transação
        /// </summary>
        [HttpPost]
        public IActionResult Create([FromBody] TransacaoCreateDto dto)
        {
            var id = _transacaoService.Criar(dto);
            return CreatedAtAction(nameof(GetAll), new { id }, null);
        }

        /// <summary>
        /// Lista todas as transações
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var transacoes = _transacaoService.Listar();
            return Ok(transacoes);
        }

        /// <summary>
        /// Totais por pessoa
        /// </summary>
        [HttpGet("totais/pessoa")]
        public IActionResult TotaisPorPessoas(int? mes, int? ano)
        {
            var result = _transacaoService.TotaisPorPessoa(mes, ano);
            return Ok(result);
        }

        /// <summary>
        /// Totais por categoria
        /// </summary>
        [HttpGet("totais/categoria")]
        public IActionResult TotaisPorCategoria(int? mes, int? ano)
        {
            var result = _transacaoService.TotaisPorCategoria(mes, ano);
            return Ok(result);
        }

        /// <summary>
        /// Totais gerais
        /// </summary>
        [HttpGet("totais/gerais")]
        public IActionResult TotaisGerais(int? mes, int? ano)
        {
            var result = _transacaoService.TotaisGerais(mes, ano);
            return Ok(result);
        }

        /// <summary>
        /// Deleta uma transação pelo ID
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _transacaoService.Delete(id);
            return NoContent();
        }
    }
}
