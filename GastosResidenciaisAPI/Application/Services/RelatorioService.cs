using GastosResidenciaisAPI.API.DTOs.RelatorioDTOs;
using GastosResidenciaisAPI.Application.Interfaces;
using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Infraestrutura.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace GastosResidenciaisAPI.Application.Services
{
    public class RelatorioService : IRelatorioService
    {
        private readonly ConnectionContext _context;

        public RelatorioService(ConnectionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gera o relatório financeiro conforme o período informado
        /// </summary>
        public async Task<RelatorioFinanceiroDTO> GerarRelatorioAsync(PeriodoRelatorio periodo)
        {
            var dataInicial = ObterDataInicial(periodo);

            // Filtra transações pelo período ou pega todas se for "Total"
            var transacoes = _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .Where(t => periodo == PeriodoRelatorio.Total || t.data >= dataInicial);

            // Totais de receita e despesa por pessoa
            var receitaDespesaPorPessoa = await transacoes
                .GroupBy(t => t.Pessoa)
                .Select(g => new ReceitaDespesaPorPessoaDTO
                {
                    PessoaId = g.Key.id,
                    Pessoa = g.Key.nome,
                    TotalReceita = g.Where(x => x.tipo == TipoTransacao.Receita).Sum(x => x.valor),
                    TotalDespesa = g.Where(x => x.tipo == TipoTransacao.Despesa).Sum(x => x.valor)
                }).ToListAsync();

            // Calcula saldo por pessoa
            var saldoPorPessoa = receitaDespesaPorPessoa
                .Select(x => new SaldoPorPessoaDTO
                {
                    PessoaId = x.PessoaId,
                    Pessoa = x.Pessoa,
                    Saldo = x.TotalReceita - x.TotalDespesa
                }).ToList();

            // Totais por categoria
            var totalPorCategoria = await transacoes
                .GroupBy(t => t.Categoria)
                .Select(g => new TotalPorCategoriaDTO
                {
                    CategoriaId = g.Key.id,
                    Categoria = g.Key.descricao,
                    TotalReceita = g.Where(x => x.tipo == TipoTransacao.Receita).Sum(x => x.valor),
                    TotalDespesa = g.Where(x => x.tipo == TipoTransacao.Despesa).Sum(x => x.valor)
                }).ToListAsync();

            // Saldo geral diário
            var saldoGeral = await transacoes
                .GroupBy(t => t.data.Date.ToUniversalTime())
                .Select(g => new SaldoGeralLinhaDTO
                {
                    Data = g.Key,
                    Saldo = g.Sum(x => x.tipo == TipoTransacao.Receita ? x.valor : -x.valor)
                })
                .OrderBy(x => x.Data)
                .ToListAsync();

            // Resumo simplificado por pessoa e categoria
            var resumoPessoa = receitaDespesaPorPessoa
                .Select(x => new ResumoPessoaDTO
                {
                    Pessoa = x.Pessoa,
                    TotalReceita = x.TotalReceita,
                    TotalDespesa = x.TotalDespesa
                }).ToList();

            var resumoCategoria = totalPorCategoria
                .Select(x => new ResumoCategoriaDTO
                {
                    Categoria = x.Categoria,
                    TotalReceita = x.TotalReceita,
                    TotalDespesa = x.TotalDespesa
                }).ToList();

            return new RelatorioFinanceiroDTO
            {
                ReceitaDespesaPorPessoa = receitaDespesaPorPessoa,
                SaldoPorPessoa = saldoPorPessoa,
                TotalPorCategoria = totalPorCategoria,
                SaldoGeral = saldoGeral,
                ResumoPorPessoa = resumoPessoa,
                ResumoPorCategoria = resumoCategoria
            };
        }

        /// <summary>
        /// Retorna a data inicial do período solicitado
        /// </summary>
        private DateTime ObterDataInicial(PeriodoRelatorio periodo)
        {
            return periodo switch
            {
                PeriodoRelatorio.UltimoMes => DateTime.UtcNow.AddMonths(-1),
                PeriodoRelatorio.Ultimos3Meses => DateTime.UtcNow.AddMonths(-3),
                _ => DateTime.MinValue
            };
        }
    }
}
