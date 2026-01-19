using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using GastosResidenciaisAPI.API.DTOs.RelatorioDTOs;
using GastosResidenciaisAPI.API.DTOs.TransacaoDTOs;
using GastosResidenciaisAPI.Infraestrutura.Data;

namespace GastosResidenciaisAPI.Application.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ConnectionContext _context;

        public TransacaoService(ConnectionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma nova transação, validando idade da pessoa e finalidade da categoria
        /// </summary>
        public int Criar(TransacaoCreateDto dto)
        {
            var pessoa = _context.Pessoas.Find(dto.PessoaId);
            if (pessoa == null)
                throw new Exception("Pessoa não encontrada.");

            var categoria = _context.Categorias.Find(dto.CategoriaId);
            if (categoria == null)
                throw new Exception("Categoria não encontrada.");

            // Menores de 18 anos não podem registrar receitas
            if (pessoa.idade < 18 && dto.Tipo == TipoTransacao.Receita)
                throw new Exception("Pessoa menor de idade não pode registrar Receitas.");

            // Validação da finalidade da categoria
            if (categoria.finalidade != FinalidadeCategoria.Ambas)
            {
                if (dto.Tipo == TipoTransacao.Despesa && categoria.finalidade == FinalidadeCategoria.Receita)
                    throw new Exception("Categoria não permite despesas.");
                if (dto.Tipo == TipoTransacao.Receita && categoria.finalidade == FinalidadeCategoria.Despesa)
                    throw new Exception("Categoria não permite receitas.");
            }

            var transacao = new Transacao
            {
                valor = dto.Valor,
                data = dto.Data,
                tipo = dto.Tipo,
                descricao = dto.Descricao,
                pessoaId = dto.PessoaId,
                categoriaId = dto.CategoriaId
            };

            _context.Transacoes.Add(transacao);
            _context.SaveChanges();

            return transacao.id;
        }

        /// <summary>
        /// Lista todas as transações com nomes de pessoa e categoria
        /// </summary>
        public IEnumerable<TransacaoResponseDto> Listar()
        {
            return _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .Select(t => new TransacaoResponseDto
                {
                    Id = t.id,
                    Valor = t.valor,
                    Data = t.data,
                    Tipo = t.tipo,
                    Descricao = t.descricao,
                    PessoaNome = t.Pessoa.nome,
                    CategoriaDescricao = t.Categoria.descricao
                }).ToList();
        }

        /// <summary>
        /// Calcula totais de receita e despesa por pessoa, com filtro opcional por mês e ano
        /// </summary>
        public IEnumerable<TotaisPessoasDto> TotaisPorPessoa(int? mes = null, int? ano = null)
        {
            var query = _context.Transacoes.Include(t => t.Pessoa).AsQueryable();

            if (mes.HasValue && ano.HasValue)
            {
                var inicio = new DateTime(ano.Value, mes.Value, 1);
                var fim = inicio.AddMonths(1).AddTicks(-1);
                query = query.Where(t => t.data >= inicio && t.data <= fim);
            }

            var result = query
                .GroupBy(t => t.Pessoa ?? new Pessoa { id = 0, nome = "Desconhecida" })
                .Select(g => new TotaisPessoasDto
                {
                    PessoaId = g.Key.id,
                    Nome = g.Key.nome,
                    TotalReceita = g.Where(t => t.tipo == TipoTransacao.Receita).Sum(t => t.valor),
                    TotalDespesa = g.Where(t => t.tipo == TipoTransacao.Despesa).Sum(t => t.valor)
                }).ToList();

            return result;
        }

        /// <summary>
        /// Calcula totais de receita e despesa por categoria, com filtro opcional por mês e ano
        /// </summary>
        public IEnumerable<TotaisCategoriaDto> TotaisPorCategoria(int? mes = null, int? ano = null)
        {
            var query = _context.Transacoes.Include(t => t.Categoria).AsQueryable();

            if (mes.HasValue && ano.HasValue)
            {
                var inicio = new DateTime(ano.Value, mes.Value, 1);
                var fim = inicio.AddMonths(1).AddTicks(-1);
                query = query.Where(t => t.data >= inicio && t.data <= fim);
            }

            var result = query
                .GroupBy(t => t.Categoria ?? new Categoria { id = 0, descricao = "Desconhecida" })
                .Select(g => new TotaisCategoriaDto
                {
                    CategoriaId = g.Key.id,
                    Descricao = g.Key.descricao,
                    TotalReceita = g.Where(t => t.tipo == TipoTransacao.Receita).Sum(t => t.valor),
                    TotalDespesa = g.Where(t => t.tipo == TipoTransacao.Despesa).Sum(t => t.valor)
                }).ToList();

            return result;
        }

        /// <summary>
        /// Calcula totais gerais de receita e despesa, com filtro opcional por mês e ano
        /// </summary>
        public IEnumerable<TotaisGeraisDto> TotaisGerais(int? mes = null, int? ano = null)
        {
            var query = _context.Transacoes.AsQueryable();

            if (mes.HasValue && ano.HasValue)
            {
                var inicio = new DateTime(ano.Value, mes.Value, 1);
                var fim = inicio.AddMonths(1).AddTicks(-1);
                query = query.Where(t => t.data >= inicio && t.data <= fim);
            }

            var result = query
                .GroupBy(t => 1)
                .Select(g => new TotaisGeraisDto
                {
                    TotalReceita = g.Where(t => t.tipo == TipoTransacao.Receita).Sum(t => t.valor),
                    TotalDespesa = g.Where(t => t.tipo == TipoTransacao.Despesa).Sum(t => t.valor)
                }).ToList();

            return result;
        }

        /// <summary>
        /// Deleta uma transação pelo ID
        /// </summary>
        public void Delete(int id)
        {
            var transacao = _context.Transacoes.FirstOrDefault(p => p.id == id);

            if (transacao == null)
                throw new Exception("Transação não encontrada");

            _context.Transacoes.Remove(transacao);
            _context.SaveChanges();
        }
    }
}
