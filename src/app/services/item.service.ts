import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
@Injectable({
    providedIn: 'root'
})
export class ItemService extends DataService {
    constructor(httpclient: HttpClient) {
        super(httpclient);
    }
    InventorymenuQuickBooksList(modal) {
        return this.postAsync(this.ItemAPI.InventorymenuQuickBooksList, modal)
    }
    InsertQuickBookItems(modal) {
        return this.postAsync(this.ItemAPI.InsertQuickBookItems, modal)
    }
    GetItemsInventory(SearchColumn, AlphanumericSort, Itemkeyword, mode, startIndex, pageSize, orderByClause, totalCount) {
        let URL = `${this.ItemAPI.GetItemsInventory}/${SearchColumn}/${AlphanumericSort}/${Itemkeyword}/${mode}/${startIndex}/${pageSize}/${orderByClause}/${totalCount}`
        return this.getAsync(URL)
    }
    DeleteItem(ItemID) {
        return this.postAsync(`${this.ItemAPI.DeleteItemID}/${ItemID}`, {})
    }
    GetItemsByID(id) {
        let URL = `${this.ItemAPI.GetItemsInventory}/${id}`
        return this.getAsync(URL)
    }
    InsertItems(modal) {
        return this.postAsync(this.ItemAPI.GetItemsInventory, modal)
    }
    InsertUpdateItems(modal) {
        return this.postAsync(this.ItemAPI.InsertUpdateItems, modal)
    }
    
    ItemAPI = {
        DeleteItemID: `/api/1/inventoryapi/delete`,
        GetItemsInventory: `/api/1/inventoryapi`,
        InventorymenuQuickBooksList: `/api/1/inventoryapi/inventoryQuickBooksList`,
        InsertQuickBookItems: `/api/1/inventoryapi/QuickBookitems`,
        InsertUpdateItems: `/api/1/inventoryapi/update`
    }
}
