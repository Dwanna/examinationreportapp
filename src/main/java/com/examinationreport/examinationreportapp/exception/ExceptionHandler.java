package com.examinationreport.examinationreportapp.exception;

public class ExceptionHandler extends RuntimeException {

    private final String message;


    public ExceptionHandler(String message) {

        this.message = message;
    }


    public String getMessage() {
        return message;
    }


}
