package com.detrango.sap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.detrango.sap.modal.Item;

public interface ItemRepository  extends JpaRepository<Item, Long>{

}
