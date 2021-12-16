package com.detrango.sap.controller;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.PageImpl;


import com.detrango.sap.modal.Item;
import com.detrango.sap.modal.ItemEnum;
import com.detrango.sap.repository.ItemRepository;

import static java.util.stream.Collectors.toList;


@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
@RestController
@RequestMapping("/itens")
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;
	
	@GetMapping()
	public List<Item> listarItens() {
		return itemRepository.findAll();
	}
	
	@GetMapping("/pesquisar")
	public List<Item> searchItens(@RequestParam(name = "tipo_pesquisa") String tipo, @RequestParam(name="descricao_pesquisa") String descricao){
		System.out.println(tipo);
		System.out.println(descricao);
		return itemRepository.searchItens(tipo, descricao);
	}
	
	@GetMapping("/filterpage")
	public Page<ItemResponse> list(
			  @RequestParam(name = "page", defaultValue = "0") int page,
			  @RequestParam(name = "size", defaultValue = "3") int size) {
		
	    PageRequest pageRequest = PageRequest.of(page, size);
	    Page<Item> pageResult = itemRepository.findAll(pageRequest);
	    List<ItemResponse> todos = pageResult.stream().map(ItemResponse::new).collect(toList());
	 
	    return new PageImpl<ItemResponse>(todos, pageRequest, pageResult.getTotalElements());
	 
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
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
