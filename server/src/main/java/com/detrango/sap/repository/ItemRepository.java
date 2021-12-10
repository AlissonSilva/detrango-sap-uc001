package com.detrango.sap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.detrango.sap.modal.Item;

@Repository
public interface ItemRepository  extends JpaRepository<Item, Long>{

}
