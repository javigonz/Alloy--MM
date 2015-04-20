var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){

	//Add the actual view container
	Alloy.Globals.ActualContainer = $.viewPress;
	Alloy.Globals.ActualSection = "press";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_6');

	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadNews', loadNews);
	managment_Data.LoadWebService_News();

}


function loadNews()
{
	Ti.App.removeEventListener('loadNews', loadNews);
		
	if (Alloy.Collections.model__Press.code == 'ok')
	{
		var rows = [];
		
		//Estilos
		var rowList = $.createStyle({classes: ['rowList']});
		var imagePress = $.createStyle({classes: ['imagePress']});
		var viewDescription = $.createStyle({classes: ['viewDescription']});
		var textTitle = $.createStyle({classes: ['textTitle']});
		var textDescription = $.createStyle({classes: ['textDescription']});
		

		Alloy.Collections.model__Press.result.forEach(function (element, index, array) {
			
			var containerTableRow = Ti.UI.createTableViewRow({
				scope: element.id 
			});
			containerTableRow.addEventListener('click', clickHandler);
			containerTableRow.applyProperties(rowList);
			
			var containerImage = Titanium.UI.createImageView({
								scope: element.id,
								defaultImage: '/images/download.png' 
			});
				
			containerImage.applyProperties(imagePress);
			managment_Data.LoadImage_AsynCache((element.imagen1).split(' ').join('%20'), containerImage);
			
			var containerViewDescription = Ti.UI.createView({
				scope: element.id
			});
			containerViewDescription.applyProperties(viewDescription);
			
			var containerLabelTitle = Ti.UI.createLabel({
				scope: element.id,
				text: element.nombre
			});
			containerLabelTitle.applyProperties(textTitle);
			
			var containerLabelDate = Ti.UI.createLabel({
				scope: element.id,
				text: element.fecha_noticia.split('-').reverse().join('-')
			});
			containerLabelDate.applyProperties(textDescription);
			
			
			containerTableRow.add(containerImage);
			containerViewDescription.add(containerLabelTitle);
			containerViewDescription.add(containerLabelDate);
			containerTableRow.add(containerViewDescription);
			
			rows.push(containerTableRow);
			
		});
		
		$.tableList.setData(rows);
		
		
	}
	else
	{
		//Error
		managment_View.OpenInfoWindow( L('text_27'));
	}		
	
	Ti.App.fireEvent('closeLoading');	
	
}


/* ***********************************************************
 * Handler functions
 * ***********************************************************/

function clickHandler(scope)
{
	Ti.API.info('CLICK id: ' + scope.source.scope );
	managment_View.OpenSectionParam('pressDetail',[scope.source.scope],'', Alloy.Globals.ActualContainer);
}