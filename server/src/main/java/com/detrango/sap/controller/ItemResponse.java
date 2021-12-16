package com.detrango.sap.controller;

import com.detrango.sap.modal.Item;
import com.detrango.sap.modal.ItemEnum;

public class ItemResponse {

	private Long id;
	private ItemEnum tipo;
	private String descricao;
	
	public ItemResponse(Item item) {
		this.id = item.getId();
		this.tipo = item.getTipo();
		this.descricao = item.getDescricao();
	}

	public Long getId() {
		return id;
	}

	public ItemEnum getTipo() {
		return tipo;
	}


	public String getDescricao() {
		return descricao;
	}

	
	//https://github.com/shekhargulati/boot-angular-pagination-example-app/blob/master/backend/src/main/java/com/shekhargulati/app/api/TodoResponse.java
	//https://shekhargulati.com/2020/04/29/spring-boot-angular-7-8-9-server-side-pagination-tutorial/

}
