function toggleView(){
	if (document.getElementById("finished-view").className == "hidden"){

		document.getElementById("todo-view").className = "hidden";
		document.getElementById("finished-view").className = "";
	}
	else{

		document.getElementById("todo-view").className = "";
		document.getElementById("finished-view").className = "hidden";		
	}
}

function getAddBtnListner(listmodel){
	return function(){
		var content = document.getElementById('input-content').value;
		if (content.length == 0)
			alert('NOTHING TO ADD.');
		else{
			var item = new todoItem(content);
			listmodel.addTask(item);

			var domItem = todoDomItem(item);
			document.getElementById("list-content").appendChild(domItem);

			document.getElementById('input-content').value = "";
		}
	}
}

function getCheckboxListener(item){
	return function(){
		setTimeout(function(){
			item.finish();
			//remove from todo list in dom
			item.domNode.parentNode.removeChild(item.domNode);
			//add to finished list in dom
			var domItem = finishedDomItem(item);
			document.getElementById("finished-list-content").appendChild(domItem);
			
		}, 500);
	}
}

function getDeleteBtnListner(item){

	return function(){
			item.remove();
			//remove from finished list
			item.domNode.parentNode.removeChild(item.domNode);				
	}
}