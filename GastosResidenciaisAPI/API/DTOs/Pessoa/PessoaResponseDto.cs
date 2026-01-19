namespace GastosResidenciaisAPI.API.DTOs.PessoaDTOs
{
    public class PessoaResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public string Status => Idade >= 18 ? "Maior de idade" : "Menor de idade";

    }
}
