using GastosResidenciaisAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Infraestrutura.Data
{
    public class ConnectionContext : DbContext
    {
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
