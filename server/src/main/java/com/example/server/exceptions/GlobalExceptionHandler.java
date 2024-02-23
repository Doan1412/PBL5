//package com.example.server.exceptions;
//
//import com.example.server.utils.Respond;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ProblemDetail;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.context.request.WebRequest;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//import org.springframework.context.support.DefaultMessageSourceResolvable;
//
//import java.net.URI;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@ControllerAdvice
//public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ProblemDetail> handleAllExceptions(
//            Exception ex, WebRequest request) {
//        ProblemDetail problemDetail =
//                ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
//        problemDetail.setType(URI.create("https://foobar.com/problem-definitions/blah"));
//        problemDetail.setInstance(URI.create("https://instance"));
//        return ResponseEntity.of(Optional.of(problemDetail));
//    }
//
//}
