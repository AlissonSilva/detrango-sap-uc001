package com.detrango.sap.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.detrango.sap.modal.Item;
import com.detrango.sap.modal.ItemEnum;

@Repository
public interface ItemRepository  extends JpaRepository<Item, Long>{
	
	@Query(value = "select id_tipo_item, desc_tipo_item, tipo_item  from sap_tipo_item s where s.tipo_item = ?1 and s.desc_tipo_item like %?2%", nativeQuery = true)
	List<Item> searchItens(@RequestParam(name = "tipo") String tipo, @RequestParam(name="descricao") String descricao);
	
}
