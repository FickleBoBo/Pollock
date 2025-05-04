package com.pollock.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ErrorResponseDTO> handleServiceException(ServiceException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(new ErrorResponseDTO(e.getErrorCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleException(Exception e) {
        return ResponseEntity.status(ErrorCode.InternalServerErrorException.getHttpStatus()).body(new ErrorResponseDTO(ErrorCode.InternalServerErrorException));
    }
}
