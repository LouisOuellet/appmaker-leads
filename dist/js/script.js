Engine.Plugins.leads = {
	element:{
		modal:{
			read:{},
		},
		table:{
			index:{},
		},
	},
	forms:{
		create:{
			0:"name",
			1:"assigned_to",
			company_information:{
				0:"address",
				1:"city",
				2:"zipcode",
				3:"state",
				4:"country",
				5:"phone",
				6:"toll_free",
				7:"fax",
				8:"email",
				9:"website",
			},
		},
		update:{
			0:"name",
			1:"business_num",
			company_information:{
				0:"address",
				1:"city",
				2:"zipcode",
				3:"state",
				4:"country",
				5:"phone",
				6:"toll_free",
				7:"fax",
				8:"email",
				9:"website",
			},
		},
	},
	init:function(){
		Engine.GUI.Sidebar.Nav.add('Leads', 'main_navigation');
	},
	load:{
		index:function(){
			Engine.Builder.card($('#pagecontent'),{ title: 'Leads', icon: 'leads'}, function(card){
				Engine.request('leads','read',{data:{}},function(result) {
					var dataset = JSON.parse(result);
					if(dataset.success != undefined){
						for(const [key, value] of Object.entries(dataset.output.dom)){ Engine.Helper.set(Engine.Contents,['data','dom','leads',value.name],value); }
						for(const [key, value] of Object.entries(dataset.output.raw)){ Engine.Helper.set(Engine.Contents,['data','raw','leads',value.name],value); }
						Engine.Builder.table(card.children('.card-body'), dataset.output.dom, {
							headers:dataset.output.headers,
							id:'LeadsIndex',
							modal:true,
							key:'name',
							plugin:"organizations",
							import:{ key:'name', },
							clickable:{ enable:true, plugin:'organizations', view:'details'},
							set:{status:1,isActive:"true",isLead:"true"},
							controls:{
								toolbar:true,
								disable:['create'],
								add:[
									{
										menu:'file',
										text:'<i class="icon icon-create mr-1"></i>'+Engine.Contents.Language['Create'],
										name:'create',
										action:function(){
											Engine.CRUD.create.show({plugin:'leads',table:Engine.Plugins.leads.element.table.index},function(status,row){});
										},
									},
								],
							}
						},function(response){
							Engine.Plugins.leads.element.table.index = response.table;
						});
					}
				});
			});
		},
	},
	extend:{},
}

Engine.Plugins.leads.init();
