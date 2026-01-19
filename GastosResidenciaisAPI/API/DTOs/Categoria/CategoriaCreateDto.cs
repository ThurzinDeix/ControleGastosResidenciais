using GastosResidenciaisAPI.Domain.Enums;

namespace GastosResidenciaisAPI.API.DTOs.CategoriaDTOs
{
    public class CategoriaCreateDto
    {
        public string Descricao { get; set; }
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
