package com.detrango.sap.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.detrango.sap.modal.Item;
import com.detrango.sap.repository.ItemRepository;

@RestController
@RequestMapping("/itens")
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;
	
	@GetMapping("/")
	public List<Item> listarItens() {
		return itemRepository.findAll();
	}
	
	@PostMapping("/adicionar")
	@ResponseStatus()
	public Item adicionar(@RequestBody Item item) {
		return itemRepository.save(item);
	}
}
