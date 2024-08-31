import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AccessMenuModel, RoleMenuModel } from 'src/app/models/IRoleMenuModel';
import { AuthenticationService } from 'src/app/services/authentication.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-accessmenussetup',
  templateUrl: './accessmenussetup.component.html',
  styleUrls: ['./accessmenussetup.component.scss']
})
export class AccessmenussetupComponent implements OnInit {
  totalmenurecords: RoleMenuModel[];
  accessdata: AccessMenuModel[];
  files: TreeNode[];
  selectedFiles: TreeNode[] = [];
  dataArray: string[] = [];
  selecteddata: TreeNode;
  roledetails: any = {};


  selectedvalue: Number;

  constructor(private accessmenuservice: AuthenticationService, private activeRoute: ActivatedRoute,
  ) {
    this.roledetails.lstRoles = [];

  }

  ngOnInit() {
    this.roledetails.RoleId = -1;
    this.GetAllRoles();
    this.GetallMenus();
    this.selectedFiles = null;
  }
  GetAllRoles() {
    this.accessmenuservice.GetAllRoles().subscribe(
      (result: any) => {

        this.roledetails = result
        this.roledetails.RoleId = -1;
      },

    )
  }
  GetallMenus() {
    var AllMenusArray = []; this.selectedFiles = []; this.totalmenurecords = [];
    this.accessmenuservice.GetAllMenus().subscribe((result: RoleMenuModel[]) => {
      this.totalmenurecords = result;
      AllMenusArray = this.Preparemenus(result);
      this.files = AllMenusArray;

      this.getmenuesbyddlchange(this.roledetails.RoleId);

    });

  }
  private Preparemenus(result: RoleMenuModel[]) {
    var AllMenusArray = [];
    result.forEach(allmenus => {
      var childmenus: TreeNode = {};
      if (allmenus.ParentMenuId == 0) {
        childmenus.label = allmenus.MenuDescription;
        childmenus.data = allmenus.MenuDescription;
        childmenus.expandedIcon = 'pi pi-folder-open';
        childmenus.collapsedIcon = "pi pi-folder";
        childmenus.children = this.getChildMenus(allmenus.MenuId, result);
        AllMenusArray.push(childmenus);
      }
    });
    return AllMenusArray;
  }
  getChildMenus(parentMenuId, allmenu: RoleMenuModel[]) {
    var childmenuarry = [];

    allmenu.forEach(childmenu => {
      var childmenus: TreeNode = {};
      if (parentMenuId == childmenu.ParentMenuId) {
        childmenus.label = childmenu.MenuDescription;
        childmenus.data = childmenu.MenuDescription;
        childmenus.expandedIcon = 'fa fa-folder-open';
        childmenus.collapsedIcon = "fa fa-folder";

        childmenus.children = this.getChildMenus(childmenu.MenuId, allmenu);

        childmenuarry.push(childmenus);
      }
    });

    return childmenuarry;
  }
  onddlChange(selectedvalue) {
    this.roledetails.RoleId = selectedvalue;
    this.files = [];
    this.GetallMenus();

  }


  getmenuesbyddlchange(selected) {

    var AllddlmenuArray: string; this.dataArray = [];
    this.accessmenuservice.GetAllmenuesbyroleid(selected).subscribe((res: RoleMenuModel[]) => {
      res.forEach(allmenus => {

        var dataval: TreeNode = {};
        // if (allmenus.IsChecked) {
        var label = allmenus.MenuDescription;
        this.dataArray.push(label);
        if (allmenus.ParentMenuId == 0) {
          dataval.children = this.getChildMenus(allmenus.MenuId, res);
          for (let j = 0; j < dataval.children.length; j++) {
            if (!this.dataArray.includes(dataval.children[j].label)) {
              this.dataArray.push(dataval.children[j].label);

            }
          }
        }
        //}
      });
      if (this.dataArray.length != 0) {
        this.checkNode(this.files, this.dataArray);
      }


    });

  }
  checkNode(nodes: TreeNode[], str: string[]) {
    for (let i = 0; i < nodes.length; i++) {
      if (str.includes(nodes[i].label)) {
        
        if (!this.selectedFiles.includes(nodes[i])) {
          this.selectedFiles.push(nodes[i]);
        }
      }
      for (let j = 0; j < nodes[i].children.length; j++) {
        if (str.includes(nodes[i].children[j].label)) {
          if (!this.selectedFiles.includes(nodes[i].children[j])) {
            this.selectedFiles.push(nodes[i].children[j]);
          }
        }
      }
      this.checkNode(nodes[i].children, str);
      let count = nodes[i].children.length;
      let c = 0;
      for (let j = 0; j < nodes[i].children.length; j++) {
        if (this.selectedFiles.includes(nodes[i].children[j])) {
          c++;
        }
        if (nodes[i].children[j].partialSelected) nodes[i].partialSelected = true;
      }
      if (c == 0) { }
      else if (c == count) {
        nodes[i].partialSelected = false;
        if (!this.selectedFiles.includes(nodes[i])) {
          this.selectedFiles.push(nodes[i]);
        }
      }
      else {
        nodes[i].partialSelected = true;
      }
    }
  }
  nodeSelect(event) {

    this.addNode(event.node);
    this.selectedFiles = [];
    this.checkNode(this.files, this.dataArray);
  }

  nodeUnselect(event) {
    this.removeNode(event.node);
    this.selectedFiles = [];
    this.checkNode(this.files, this.dataArray);
  }
  addNode(node: TreeNode) {

    if (!this.dataArray.includes(node.label)) {
      this.dataArray.push(node.label);
    }


    for (let i = 0; i < node.children.length; i++) {
      this.addNode(node.children[i]);
    }
    return;
  }
  removeNode(node: TreeNode) {

    this.dataArray.splice(this.dataArray.indexOf(node.label), 1);
    for (let i = 0; i < node.children.length; i++) {
      this.removeNode(node.children[i]);
    }
    return;
  }
  Savemenuvalues() {
    this.selectedFiles;
    var rolemenuselected = [];
    this.totalmenurecords.forEach(allmenus => {


      this.selectedFiles.forEach(allselectedmenus => {
        if (allmenus.MenuDescription == allselectedmenus.data) {

          var obj = { RoleMenuId: 0, RoleId: 0, MenuId: 0, IsChecked: false };
          obj.RoleMenuId = allmenus.RoleMenuId;
          obj.RoleId = this.roledetails.RoleId;
          obj.MenuId = allmenus.MenuId
          obj.IsChecked = true

          rolemenuselected.push(obj);
        }
      });
    });


    this.accessmenuservice.savenupdateaccessdetails(rolemenuselected).subscribe((result: any) => {
      if (result == true) {
        Swal.fire({
          icon: 'success',
          title: "Success",
          text: "Menu Changes Saved Successufully!",
          timer: 700
        });
        this.ngOnInit();
      }
    },

    );
  }
  // Cancelmenuvalues() {
  //   this.selectedFiles = null;
  // }
}
