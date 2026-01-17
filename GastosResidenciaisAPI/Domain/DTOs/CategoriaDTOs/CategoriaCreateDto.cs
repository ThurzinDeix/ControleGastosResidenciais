using GastosResidenciaisAPI.Domain.Enums;

namespace GastosResidenciaisAPI.Domain.DTOs.CategoriaDTOs
{
    public class CategoriaCreateDto
    {
        public string Descricao { get; set; }
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
