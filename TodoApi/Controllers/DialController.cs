using Microsoft.AspNetCore.Mvc;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/dial")]
    public class DialController : ControllerBase
    {
        private readonly IDialCalculator _calc;
        public DialController(IDialCalculator calc) => _calc = calc;

        [HttpGet]
        public async Task<IActionResult> GetCurrent() =>
            Ok(await _calc.GetCurrentScoreAsync());
    }
}
