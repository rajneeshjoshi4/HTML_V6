var fixHeaderDiv;
var searchResultsDiv;
var fixHeaderTable;
var fixHeaderTHead;
var tableHead;
var fixHeaderTHeadTr;
var headerThs;
var resultsTable;
var drawn = false;

function positionHeader() {
	if(document.getElementById("searchResultsId") != null) {
		if(findPos(document.getElementById("searchResultsId"))[1] + 2 < f_scrollTop()) {
			if(document.getElementById('fixedHeaderId') == null) {
				fixHeader();
			}
			if (typeof document.body.style.maxHeight != "undefined") {
			  // IE 7, mozilla, safari, opera 9
			  fixHeaderDiv.style.position="fixed";
			  fixHeaderDiv.style.top="-2px";
			  fixHeaderDiv.style.left=(findPos(searchResultsDiv)[0] - f_scrollLeft()) + "px";
			} else {
			  // IE6, older browsers
			  fixHeaderDiv.style.position="absolute";
			  fixHeaderDiv.style.top= f_scrollTop() - 2;
			}		
		} else {
			if(searchResultsDiv != null && drawn) {
				searchResultsDiv.removeChild(fixHeaderDiv);
				drawn = false;
			}
		}
	}
}

function resize() {
  if(fixHeaderTHeadTr != null && fixHeaderTHeadTr != "undefined") {
	  var fixedTHS = fixHeaderTHeadTr.getElementsByTagName("th");
	  if(headerThs[i] == null) {
	  	return;
	  }
	  for(i = 0; i < fixedTHS.length; i++) {
	  	if (typeof document.body.style.maxHeight != "undefined") {
			// IE 7, mozilla, safari, opera 9	
	  		fixedTHS[i].width=headerThs[i].offsetWidth-7;
	  		fixedTHS[i].height=headerThs[i].offsetHeight-7;  
		} else {
			// IE6, older browsers
			var inDiv = fixedTHS[i].getElementsByTagName("div");
			inDiv[0].style.width = headerThs[i].offsetWidth-7;
	  		inDiv[0].style.height = headerThs[i].offsetHeight-4;
		}
	  }
   }
}

function reloadHeader() {
	if(fixHeaderDiv != null && document.getElementById('fixedHeaderId') != null) {
		searchResultsDiv.removeChild(fixHeaderDiv);
		positionHeader();
	}
}

function fixHeader() {

	reloadHeader();
	searchResultsDiv = document.getElementById("searchResultsId");
	fixHeaderDiv = document.createElement("div");
	fixHeaderTable = document.createElement("table"); 
  	fixHeaderTable.cellSpacing = "0";
  	fixHeaderTable.cellPadding = "0";
  	fixHeaderTHead = document.createElement("thead");
  	fixHeaderTHeadTr = document.createElement("tr");
  	fixHeaderTHead.appendChild(fixHeaderTHeadTr);
  	fixHeaderTable.appendChild(fixHeaderTHead);
  	fixHeaderDiv.appendChild(fixHeaderTable);
  	
  	headerThs = searchResultsDiv.getElementsByTagName("th");
  	
  	tableHead = searchResultsDiv.getElementsByTagName("thead");
  	
  	var resultsTable = searchResultsDiv.getElementsByTagName("table");
  	  	
  	var tableBody = searchResultsDiv.getElementsByTagName("tbody");
  	var tableRows = tableBody[0].getElementsByTagName("tr");
  	var tableColumns = tableRows[0].getElementsByTagName("td");
  	for(i = 0; i < headerThs.length; i++) {
  		var newTH = document.createElement("th");
  		var hDiv = document.createElement("div");
  		newTH.appendChild(hDiv);
  		hDiv.innerHTML = headerThs[i].innerHTML;
  		if (typeof document.body.style.maxHeight != "undefined") {
			  // IE 7, mozilla, safari, opera 9
  			newTH.width = headerThs[i].offsetWidth-7;
  			newTH.height = headerThs[i].offsetHeight-6;
			  
		} else {
			  // IE6, older browsers
			hDiv.style.width = headerThs[i].offsetWidth-7;
  			hDiv.style.height = headerThs[i].offsetHeight-4;
		}

  		newTH.style.overflowX = headerThs[i].style.overflowX;
  		newTH.style.overflowY = headerThs[i].style.overflowY;
  		newTH.style.margin = "0px";
  		newTH.className = headerThs[i].className;
  		fixHeaderTHeadTr.appendChild(newTH);
  	}
  	
  	fixHeaderDiv.style.left=findPos(searchResultsDiv)[0] + "px";
  	fixHeaderDiv.style.top=findPos(searchResultsDiv)[1] + "px";
  	fixHeaderDiv.id="fixedHeaderId";
  	fixHeaderTable.className="iceDatTbl";

  	fixHeaderTable.width=resultsTable[0].offsetWidth;
  	
  	searchResultsDiv.appendChild(fixHeaderDiv);
  	
  	drawn = true;
}

function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_scrollLeft() {
	return f_filterResults (
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}


function moveToPosition(target, x, y) {
   //target.style.left = "" + x + "px";
   target.style.top = "" + y + "px";
}
  
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}