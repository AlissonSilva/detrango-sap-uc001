package com.detrango.sap.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ItemException extends RuntimeException {

	public ItemException(long id) {
		super("Erro "+id);
	}

}
