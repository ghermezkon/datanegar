import { Component, Input } from '@angular/core';

@Component({
	selector: 'my-panel',
	styleUrls : ['./my-panel.component.scss'],
	template: `
		<div class="col-md-12">
			<div class="my-panel my-panel-nav-tabs ">
				<div class="my-panel-header" [attr.data-background-color]="templateColor">
					<div class="nav-tabs-navigation nav-tabs-position">
						<div class="nav-tabs-wrapper">
							<div class="nav-tabs-title">
								<div class="col-md-12">
									<h4 class="title">{{title}}</h4>
									<p class="category">{{category}}</p>
								</div>
							</div>
							<ng-content select="[tabs]"></ng-content>
						</div>
					</div>
				</div>
				<div class="my-panel-content">
					<ng-content select="[content]"></ng-content>
				</div>
				<div>
					<ng-content class="my-panel-footer" select="[footer]"></ng-content>
				</div>
			</div>
		</div>	
	`
})
export class MyPanelComponent {
	@Input() templateColor : any;
	@Input() title : string;
	@Input() category : string;
	
	constructor() {}
}
