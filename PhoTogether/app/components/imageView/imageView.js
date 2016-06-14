function onNavigatingTo(args){
	var page = args.object;
	page.bindingContext = page.navigationContext;
	console.log(page.navigationContext);
}

exports.onNavigatingTo = onNavigatingTo;