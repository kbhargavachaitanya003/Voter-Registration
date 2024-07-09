package backend.backend.controllers;

import backend.backend.services.ReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestController
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping(value = "/generateReport", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generateReport(@RequestParam long referenceNumber) throws JRException {
        byte[] pdfBytes = reportService.generatePdfReport(referenceNumber);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=confirmation_report.pdf")
                .body(pdfBytes);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String error = "Parameter '" + ex.getName() + "' must be a valid long integer.";
        return ResponseEntity.badRequest().body(error);
    }
}
