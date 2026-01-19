using GastosResidenciaisAPI.Domain.Enums;

namespace GastosResidenciaisAPI.API.DTOs.CategoriaDTOs
{
    public class CategoriaResponseDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
