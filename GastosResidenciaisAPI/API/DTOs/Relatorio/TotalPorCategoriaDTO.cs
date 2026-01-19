namespace GastosResidenciaisAPI.API.DTOs.RelatorioDTOs
{
    public class TotalPorCategoriaDTO
    {
        public int CategoriaId { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
    }
}
