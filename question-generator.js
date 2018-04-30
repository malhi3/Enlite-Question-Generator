var storageRef = firebase.storage().ref();

function randomiseQuestion(){
	var table = document.getElementById("table");
	
	while (table.hasChildNodes()) {   
    	table.removeChild(table.firstChild);
	}
	
	var subjectList = document.getElementById("selectSubject");
	var subject = subjectList.options[subjectList.selectedIndex].text;
	
	var numberField = document.getElementById("selectNumber");
	var number = numberField.value;
	
	var arr = [];
	while(arr.length < number){
    	var randomNumber = Math.floor((Math.random()*30) + 1);
    	if(arr.indexOf(randomNumber) > -1) {continue;}
    	arr[arr.length] = randomNumber;
	}
	//window.alert(arr);
	
	for(var i=0; i<arr.length; i++){
	 	var randomisedNumber = arr[i];
		var parentTD = "q"+i;
		var incrementTD = "i"+i;
		var parentTR = "tr"+i;
		//window.alert("loop");
	 	addQuestion(i+1, randomisedNumber, parentTD, parentTR, incrementTD, subject);
	}
}

function addQuestion(increment, questionNo, parentTdId, parentTrId, incrementTdId, subject){
	//Creating table and child tr
		var table = document.getElementById("table");
		var tr = document.createElement("tr");
		tr.setAttribute("id", parentTrId);
		table.appendChild(tr);
		
		//Creating child td and incrememnt td
		var td = document.createElement("td");
		td.setAttribute("id", parentTdId);
		var itd = document.createElement("td");
		itd.setAttribute("id", incrementTdId);
		itd.setAttribute("valign", "top");
		tr.appendChild(itd);
		tr.appendChild(td);
		
		//Creating question images
		var question = document.createElement("img");
		question.setAttribute("id", "Bio"+increment);
	
		var h3 = document.createElement("h3");
		h3.style.margin = "2px 2px";
		h3.style.textAlign = "right";
		h3.innerHTML = increment+".";
	
	storageRef.child('Paper2/'+subject+'/'+subject.slice(0, 4)+questionNo+'.png').getDownloadURL().then(function(url){
		//window.alert("function");
		//window.alert(questionNo);
		question.setAttribute("src", url);
	});
	
	td.appendChild(question);
		itd.appendChild(h3);
}