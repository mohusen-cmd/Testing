import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ClaimsHelper } from 'src/app/login/claimshelper';
import { AttachmentDomainModel } from 'src/app/models/AttachmentViewModel';
import { ImportService } from 'src/app/services/Import.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-attachments-tab',
  templateUrl: './attachments-tab.component.html',
  styleUrls: ['./attachments-tab.component.scss']
})
export class AttachmentsTabComponent implements OnInit,AfterViewInit {
  @ViewChild('myuploadInput') myInputfileVariable: any;
  @Input() AttachmentsData;
  @Input() moduletype;
  @ViewChild('modalLarge', { static: true }) modal
  @Output() valueChange = new EventEmitter();
  dtOptions:any = {};
  showtable:boolean=false;
  deletedids: any=[];
  myFiles: string[] = [];
  companyid:any;
  attachmentDomainModel:AttachmentDomainModel[];
  userName:any;
  userId:any;
  viewName: any;
  tabName: any;
  constructor(private importservice:ImportService, private commonService:CommonService, private _Activatedroute: ActivatedRoute,private toastr: ToastrManager,private contactservice:ContactService,private claimsHelper : ClaimsHelper) { 
    this.userName = this.claimsHelper.GetUserNameAPIKeyFromClaims();
    this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
  }
  ngAfterViewInit(): void {
    $('#attachmentsTable').DataTable({
      paging: true,
      pageLength: 10,
      lengthChange: true,
      lengthMenu: [5, 10, 15, 20],
      searching: true
    });
  }
  ngOnInit() {
    
    this._Activatedroute.params.subscribe(routeParams => {
      
      
      this.viewName = routeParams.vname;
      this.tabName =  routeParams.tname;
      this.companyid = routeParams.Id;
  });
    this.attachmentDomainModel =this.AttachmentsData;
    this.showtable =true;
   
  }
  
  UploadAttachmentFile()
  {
    
    this.modal.show()
  }
  close(){
    this.myInputfileVariable.nativeElement.value = "";
    this.myFiles = [];
    this.modal.hide();
   
  }
  getFileDetails(e) {
    
    this.myFiles = [];
   for (var i = 0; i < this.myInputfileVariable.nativeElement.files.length; i++) {
  //  if(this.myInputfileVariable.nativeElement.files[i].name.split('.').pop().toLowerCase() == "csv")
  //   {
      this.myFiles.push(e.target.files[i]);
    // }
    // else
    // {
    //  this.myInputfileVariable.nativeElement.value = "";
    //  this.myFiles = [];
    // }
 } 
}

DeleteAttachments(data: any)
{
  
  Swal.fire({
    title: 'Are you sure you want to delete this record?',
    text: "You are about to delete permanently!",
    backdrop:false,
    imageUrl:'',
    reverseButtons:true,
    showCancelButton: true,
    cancelButtonColor: '#ef4d4d',
    confirmButtonColor: '#448aff',         
  }).then((result) => {
    
    if (result.value) {
      const deleteAttachmentID = (JSON.stringify(data.AttachmentID))
      this.commonService.DeleteAttachmentByAttachmentId(deleteAttachmentID).subscribe(res => {
        if(res)
        {
          Swal.fire({
            backdrop:false,
            title: 'Your Record has been deleted.',
            type: 'success',
            confirmButtonColor: '#448aff',
          }).then((result) => {
            if (result.value) {
              this.valueChange.emit({attContactId:this.companyid,Module:this.viewName,pageindex:0,pagesize:10,orderbyclause:"AttachmentID asc",totalpagecount:0});
            }
          })
        }
      })
    }
  })

}
SaveAttachmentFile()
{
  
  if(this.myFiles.length >0)
  {
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("files", this.myFiles[i]);
    }
    formData.append("uesrid", this.userId);
    formData.append("username",this.userName);
    formData.append("module",this.moduletype);
    formData.append("accountId", this.companyid);
    formData.append("filetype", "attachment");
    this.contactservice.PostAttachment(formData).subscribe(res => {
      
     if(res["AccountID"] != 0)
     {
      this.modal.hide();;
      this.valueChange.emit({attContactId:this.companyid,Module:this.moduletype,pageindex:0,pagesize:10,orderbyclause:"AttachmentID asc",totalpagecount:0});
     }
    })    
  }
  else
  {
    this.toastr.warningToastr('Please Select Attachment File', 'warning!');
  }


 

}

//DownloadAttachments(AttachmentID,FilePath,Module)
//{
  
  // this.commonService.downloadAttachmentFile(FilePath,Module,this.userName,this.userId).subscribe(
  //   (data:Blob) => {
      
  //     let blob = new Blob([data],{ type: 'application/vnd.ms-excel' });
  //     let url = window.URL.createObjectURL(blob);
  
  //     if(navigator.msSaveOrOpenBlob) {
  //         navigator.msSaveBlob(blob, FilePath);
  //     } else {
  //         let a = document.createElement('a');
  //         a.href = url;
  //         a.download = FilePath;
  //         document.body.appendChild(a);
  //         a.click();        
  //         document.body.removeChild(a);
  //     }
  //     window.URL.revokeObjectURL(url);
  //   },
  //     (err: any) => {
  //     console.log(`Unable to save file ${JSON.stringify(err)}`)}
  //     );
  //  }
  // deleteAttachment(data: any, index: number) {
  //   const deleteAttachmentID = (JSON.stringify(data.AttachmentID))
  //   var result = confirm(`You are about to delete Attachment.Are you sure you want to delete ?`);
  //   if (result) {
  //     this.commonService.DeleteAttachmentByAttachmentId(deleteAttachmentID).subscribe((response) => {
       
  //     })
  //   }
  // }
  
  DownloadAttachments(data: any) {
    let filename, module, username, uesrid
    filename = data.FilePath
    module = data.Module
    username = this.claimsHelper.GetUserNameAPIKeyFromClaims()
    uesrid = this.claimsHelper.GetUserIdAPIKeyFromClaims()
    this.commonService.downloadAttachmentFile(filename, module, username, uesrid).subscribe((data: Blob) => {
      if (data.size !== 0) {
        let blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    });
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [


];