using Microsoft.AspNetCore.Mvc;
using CrashCompassBack.Services;

namespace CrashCompassBack.Controllers
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
