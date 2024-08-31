import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { EditlistTabComponent } from '../list-tabs/editlist-tab/editlist-tab.component';
import { EditcontactListComponent } from '../list-tabs/editcontact-list/editcontact-list.component';
import { EditopperlistComponent } from '../list-tabs/editopperlist/editopperlist.component';

@Component({
  selector: 'app-editnew-lists',
  templateUrl: './editnew-lists.component.html',
  styleUrls: ['./editnew-lists.component.scss']
})
export class EditnewListsComponent implements OnInit{
  Id: any
  @ViewChild('tabContainer', { read: ViewContainerRef }) tabContainer: ViewContainerRef;
  tabs = []
  moduleName: string;
  constructor(private activeRoute: ActivatedRoute, public emailservice: EmailService, private componentFactoryResolver: ComponentFactoryResolver) { }
  
  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      this.Id = params.get("ListID");
    })
    if (this.Id != undefined) {
      this.emailservice.GetLeadsListByID(this.Id).subscribe(res => {
        this.moduleName = res["ModuleName"];
        if (this.moduleName == "Leads") {
          this.tabs.push({ id: 1, title: 'Lead Detail', component: 'app-editlist-tab' })
          this.loadTabContent(0)
        }
        else if (this.moduleName == "Contacts") {
          this.tabs.push({ id: 2, title: 'Contacts', component: 'app-editcontact-list' },)
          this.loadTabContent(0)
        }
        else if (this.moduleName == "Opportunities") {
          this.tabs.push({ id: 3, title: 'Opportunities', component: 'app-editopperlist' },)
          this.loadTabContent(0)
        }
        
      });
    }

  }
  
  
  loadTabContent(index: number) {
    const tab = this.tabs[index];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.getComponentType(tab.component)
    );

    if (this.tabContainer) { // Check if tabContainer is defined
      this.tabContainer.clear();
      const componentRef = componentFactory.create(this.tabContainer.injector);
      componentRef.instance.Id = this.Id; // Pass any necessary data to the component
      this.tabContainer.insert(componentRef.hostView);
    } else {
      console.error('tabContainer is undefined');
    }
  }

  public getComponentType(componentName: string): Type<EditlistTabComponent | EditcontactListComponent | EditopperlistComponent> {
    switch (componentName) {
      case 'app-editlist-tab':
        return EditlistTabComponent;
      case 'app-editcontact-list':
        return EditcontactListComponent;
      case 'app-editopperlist':
        return EditopperlistComponent;
      default:
        throw new Error(`Unsupported component: ${componentName}`);
    }
  }
}
