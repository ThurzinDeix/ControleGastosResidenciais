using GastosResidenciaisAPI.Domain.Model.CategoriaAggregate;
using GastosResidenciaisAPI.Domain.Model.CompanyAggregate;
using GastosResidenciaisAPI.Domain.Model.EmployeeAggregate;
using GastosResidenciaisAPI.Domain.Model.PessoaAggregate;
using GastosResidenciaisAPI.Domain.Model.TransacaoAggregate;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Infraestrutura
{
    public class ConnectionContext : DbContext
    {
        public DbSet <Employee> Employees { get; set; }
        public DbSet <Company> Companys { get; set; }
        public DbSet <Categoria> Categorias { get; set; }
        public DbSet <Pessoa> Pessoas { get; set; }
        public DbSet <Transacao> Transacoes { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(
                "Server=localhost;" +
                "Port=5432;Database=Studie;" +
                "User id=postgres;" +
                "Password=Ruhtra-2509"
            );
        }
    }
}
