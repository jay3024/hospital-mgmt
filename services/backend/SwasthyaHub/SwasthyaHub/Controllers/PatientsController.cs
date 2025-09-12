using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IPatientService _service;

 

    public PatientsController(IPatientService service)
    {
        _service = service;
    }

    [HttpGet("GetAllPatient")]
    public async Task<IActionResult> GetAll()
    {
        var patients = await _service.GetAllPatientsAsync();
        return Ok(patients);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var patient = await _service.GetPatientByIdAsync(id);
        if (patient == null) return NotFound();
        return Ok(patient);
    }

  

    [HttpPut("UpdatePatient/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] PatientUpdateDto dto)
    {
        var updated = await _service.UpdatePatientAsync(id, dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("DeletePatient/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeletePatientAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }


    [HttpPost("GetPatients")]
    public async Task<IActionResult> GetPatients([FromBody] PatientFilterDto filter)
    {
        var patients = await _service.GetPatientsAsync(filter);
        return Ok(patients);
    }
}
