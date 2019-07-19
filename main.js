

var B = [];
var N = 4;
const WINING_SCORE = 2048;
var win = false;
var RandomPos = {x: -1, y:-1};

for(var i = 0; i < N; i++){
	var A = []
	for(var j = 0; j < N; j++){
		A.push(0);
	}
	B.push(A);
}


function detectKey(event) {
	var stop = false;
	console.log(event.keyCode);
	switch (event.keyCode) {
	   case 106:
	   		moveLeft();
	      break;
	   case 105:
	   		moveUp();
	      break;
	   case 108:
	   		moveRight();
	      break;
	   case 107:
	   		moveDown();
	      	break;
	   case 'q': 
	   		stop = true;
	   		break;
	}

	if(winStatus() == true){
		alert("You, Win !!");
	}

	if(isLose() == true){
		alert("Try, again .");
	}

	//print Board
	printBoard();
}

// Start program
main();


function printBoard(){
	var rows = $(".grid-row");
	for(var i = 0; i < N; i++){
		var row = rows.eq(i);
		var cols = row.children();
		for(var j = 0; j < N; j++){
			if(B[i][j] == 0){
				cols.eq(j).text(" ");	// empty cell
			}
			else{
				cols.eq(j).text(B[i][j]);
			}
			
		}
	}	
}

function winStatus(){
	return win;
}

function isLose() {
	for(var i = 0; i < N; i++){
		for(var j = 0; j < N; j++){
			if(B[i][j] == 0){
				return false;
			}

			if(isAdjMergePossible(i, j)){
				return false;
			}
		}
	}
	return true;
}

function main(){
	var rp = getRandomEmptyCell();
	console.log(rp);
	B[rp.x][rp.y] = 2;

	//print Board
	printBoard();
	
}

function getRandomEmptyCell(){
	var ec = [];
	for(var i = 0; i < N; i++){
		for(var j = 0; j < N; j++){
			if(B[i][j] == 0){
				ec.push({x: i, y: j});
			}
		}
	}
	console.log(ec);
	var rn = parseInt(ec.length * Math.random());
	console.log(rn);
	//return a random cell
	if(ec.length == 0){
		return {x: -1, y: -1};
	}
	else{
		return ec[rn];	
	}
}

//Check if any merge possible when B is full
function isAdjMergePossible(i, j)
{
    if (i - 1 >= 0 && B[i - 1][j] == B[i][j])
    { // up
        return true;
    }
    if (i + 1 < N && B[i + 1][j] == B[i][j])
    { // down
        return true;
    }
    if (j - 1 >= 0 && B[i][j - 1] == B[i][j])
    { // left
        return true;
    }
    if (j + 1 < N && B[i][j + 1] == B[i][j])
    { // right
        return true;
    }
    return false;
}

function generateTwo()
{
    var p = getRandomEmptyCell();
    B[p.x][p.y] = 2;
}

 /* merge cells in a row towards left .
    */
function mergeCellLeft(i)
{
    var isAnyMerged = false;
    for (var j = 1; j < N; j++)
    {
        if (B[i][j] == 0)
            continue;
        if (B[i][j] == B[i][j - 1])
        {
            B[i][j - 1] += B[i][j];
            B[i][j] = 0;
            isAnyMerged = true;
            if (B[i][j - 1] == WINING_SCORE)
                win = true;
        }
    }
    return isAnyMerged;
}


function mergeCellRight(i)
{
    var isAnyMerged = false;
    for (j = N - 2; j >= 0; j--)
    {
        if (B[i][j] == 0)
            continue;
        if (B[i][j] == B[i][j + 1])
        {
            B[i][j + 1] += B[i][j];
            B[i][j] = 0;
            isAnyMerged = true;
            if (B[i][j + 1] == WINING_SCORE)
            {
                win = true;
            }
        }
    }
    return isAnyMerged;
}


function mergeCellUp(c)
{
    var isAnyMerged = false;
    for (var r = 1; r < N; r++)
    {
        if (B[r][c] == 0)
            continue;
        if (B[r][c] == B[r - 1][c])
        {
            B[r - 1][c] += B[r][c];
            B[r][c] = 0;
            isAnyMerged = true;
            if (B[r - 1][c] == WINING_SCORE)
            {
                win = true;
            }
        }
    }
    return isAnyMerged;
}


function mergeCellDown(c)
{
    var isAnyMerged = false;
    for (r = N - 2; r >= 0; r--)
    {
        if (B[r][c] == 0)
            continue;
        if (B[r][c] == B[r + 1][c])
        {
            B[r + 1][c] += B[r][c];
            B[r][c] = 0;
            isAnyMerged = true;
            if (B[r + 1][c] == WINING_SCORE)
            {
                win = true;
            }
        }
    }
    return isAnyMerged;
}


// move left all cell
function shiftLeft(i)
{
    var isShf = false; // return true any cell is shifted
    var nextVacant = 0; // next vacant cell
    for (var j = 0; j < N; j++)
    {
        if (B[i][j] != 0)
        {
            //swap(B[i][j], B[i][nextVacant]);
            x = B[i][j];
            B[i][j] = B[i][nextVacant];
            B[i][nextVacant] = x;

            if (j != nextVacant)
                isShf = true;
            nextVacant += 1;
        }
    }
    return isShf;
}


// move right
function shiftRight(i)
{
    var isShf = false;
    var nextVacant = N - 1;
    for (j = N - 1; j >= 0; j--)
    {
        if (B[i][j] != 0)
        {
            //swap(B[i][j], B[i][nextVacant]);
            x = B[i][j];
            B[i][j] = B[i][nextVacant];
            B[i][nextVacant] = x;
            if (j != nextVacant)
                isShf = true;
            nextVacant -= 1;
        }
    }
    return isShf;
}

// shift UP
function shiftUp(c)
{
    var isShf = false;
    var nextVacant = 0;
    for (i = 0; i < N; i++)
    {
        if (B[i][c] != 0)
        {
            //swap(B[i][c], B[nextVacant][c]);
            //swap
            x = B[i][c];
            B[i][c] = B[nextVacant][c];
            B[nextVacant][c] = x;
            if (i != nextVacant)
                isShf = true;
            nextVacant += 1;
        }
    }
    return isShf;
}

// shift down
function shiftDown(c)
{
    var isShf = false;
    var nextVacant = N - 1;
    for (i = N - 1; i >= 0; i--)
    {
        if (B[i][c] != 0)
        {
            //swap
            x = B[i][c];
            B[i][c] = B[nextVacant][c];
            B[nextVacant][c] = x;

            if (i != nextVacant)
                isShf = true;
            nextVacant -= 1;
        }
    }
    return isShf;
}


function moveUp()
{
    var s1 = 0, mg = 0, s2 = 0;
    for (var j = 0; j < N; j++)
    {
        s1 = shiftUp(j) || s1;
        mg = mergeCellUp(j) || mg;
        s2 = shiftUp(j) || s2;
    }

    if (s1 || mg || s2)
        generateTwo();
}





function moveDown()
{
    var s1 = 0, mg = 0, s2 = 0;
    for (var j = 0; j < N; j++)
    {
        s1 = shiftDown(j) || s1;
        mg = mergeCellDown(j) || mg;
        s2 = shiftDown(j) || s2;
    }

    if (s1 || mg || s2)
        generateTwo();
}


function moveRight()
{
    var s1 = 0, mg = 0, s2 = 0;
    for (var i = 0; i < N; i++)
    {
        s1 = shiftRight(i) || s1;
        mg = mergeCellRight(i) || mg;
        s2 = shiftRight(i) || s2;
    }
    if (s1 || mg || s2)
        generateTwo();
}


function moveLeft()
{
    var s1 = 0, mg = 0, s2 = 0;
    for (var i = 0; i < N; i++)
    {
        s1 = shiftLeft(i) || s1;
        mg = mergeCellLeft(i) || mg;
        s2 = shiftLeft(i) || s2;
    }

    if (s1 || mg || s2){
        generateTwo();
    }
}