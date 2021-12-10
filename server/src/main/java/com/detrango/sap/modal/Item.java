package com.detrango.sap.modal;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity(name = "SAP_TIPO_ITEM")
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_TIPO_ITEM")
	private Long id;
	
	@Column(name = "TIPO_ITEM", nullable = false)
	@Enumerated(EnumType.STRING)
	private ItemEnum tipo;
	
	@Column(name = "DESC_TIPO_ITEM", nullable = false)
	private String descricao;

	
}
