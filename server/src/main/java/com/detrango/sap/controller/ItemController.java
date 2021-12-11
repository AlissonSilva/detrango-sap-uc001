package com.detrango.sap.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.detrango.sap.modal.Item;
import com.detrango.sap.repository.ItemRepository;

@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
@RestController
@RequestMapping("/itens")
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;
	
	@GetMapping()
//	/@ResponseStatus(HttpStatus.OK)
	public List<Item> listarItens() {
		return itemRepository.findAll();
	}
	
	
	@PostMapping
	@ResponseStatus()
	public Item adicionar(@RequestBody Item item) {
		return itemRepository.save(item);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Item> getItemId(@PathVariable(value = "id") Long id) {
		Item item = itemRepository.findById(id).orElseThrow();
		return ResponseEntity.ok().body(item);
	}
	
	
	@PutMapping("/{id}/editar")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Item> editarItem(@PathVariable(value = "id") Long id, @Validated @RequestBody Item itemForm){
		Item item = itemRepository.findById(id).orElseThrow();
		item.setDescricao(itemForm.getDescricao());
		item.setTipo(itemForm.getTipo());
		final Item update = itemRepository.save(item);
		return ResponseEntity.ok(update);
	}
	
	@PutMapping("/{id}/deletar")
	public Map<String, Boolean> deletarItem(@PathVariable(value = "id") Long id){
		Item item = itemRepository.findById(id).orElseThrow();
		itemRepository.delete(item);
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
		
	}
}
