var grid = document.getElementById("grid");

document.addEventListener("DOMContentLoaded", function() {

    for(var i = 0; i <10; ++i) {
        row = grid.insertRow(i);
        for(var j = 0; j < 10; ++j) {
            cell = row.insertCell(j);
            cell.onclick = function() {
                clickCell(this)
            }
            cell.oncontextmenu = function() {
                rightclick(this);
            }
            var mine = document.createAttribute("data-mine");       
            mine.value = "false";    
            cell.setAttributeNode(mine); 
          
      
        }
    }   
    addMines();
});

function addMines(){
    for(var i = 0; i < 5; ++i){
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("data-mine", "true");
    }
}

function showMines() {
    for(var i = 0; i < 10; ++i){
        for(var j = 0; j < 10; ++j){
           var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("data-mine")=="true") {
                cell.className="mine";
            }
        }
    }
}

function checkGameCompletion(){
    var won = true;
    for (var i=0; i<10; i++) {
        for(var j=0; j<10; j++) {
            if (cellEmpty(i,j)){
                won  = false;
            }
        }
    }
    if (won) {
        alert("You Win!");
        showMines();
  }
}

function cellEmpty(i,j){
    if((grid.rows[i].cells[j].getAttribute("data-mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")){
        return true
    }
}

function rightclick(cell) {
    cell.className = "lar la-flag";
    return false
}

function clickCell(cell){
    if(cell.getAttribute("data-mine") == "true"){
        alert("Game Over");
        showMines();
    } else {
        cell.className = "clicked"
    var countMines = 0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
            if(grid.rows[i].cells[j].getAttribute("data-mine") == "true"){
                ++countMines
            } 
        }
    }
    cell.innerHTML = countMines;
    if(countMines == 0){
        for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
            for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) { 
                if (grid.rows[i].cells[j].innerHTML=="") {
                    clickCell(grid.rows[i].cells[j]);
                }
            }
        }
    }
    checkGameCompletion()
    }
}
