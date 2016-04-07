
var randomarray = [];
var openImage = 0;
var openimageArray = [];
var lastopenImage = 0;
var waiting = false;
var score = 0;

window.onload = function()
{
    console.log("hi");
    initialize();
}

function initialize()
{
    for(var i = 0 ; i < 16 ; i++)
    {
        randomarray[i] = -1;
        openimageArray[i] = 0;
    }
    generateRandom();
}

function generateRandom(){
    var max = 16;
    
    for(var i = 1 ; i<= 8 ; i++)
    {
        var firstIndexFound = false;
        var secondIndexFound = false;
        while(!firstIndexFound)
        {
            var temp = Math.floor(Math.random()*max);
            if(randomarray[temp] == -1)
            {
                randomarray[temp] = i;
                firstIndexFound = true;
            }
        }
        while(!secondIndexFound){
            var temp2 = Math.floor(Math.random()*max);
                if(randomarray[temp2] == -1)
                {
                    randomarray[temp2] = i;
                    secondIndexFound =true;
                }
        }
    }
    console.log(randomarray)
}

function clickimage(boxindex)
{
    if(openimageArray[boxindex] != 1 && (!waiting))
        {
            score++;
            openimageArray[boxindex] = 1;
            openImage++;
            if(openImage > 1)
                {
                    if(randomarray[boxindex] == randomarray[lastopenImage])
                        {
                            isWin();
                        }
                    else
                        {
                            waiting = true;
                            setTimeout(function()
                                {
                                     openimageArray[boxindex] = 0;
                                     openimageArray[lastopenImage] = 0;
                                     DisplayImage();
                                     waiting = false;
                                },2000);
                        }
                    
                    openImage = 0;
                }
            else
                {
                    lastopenImage = boxindex;
                }
            DisplayImage();
        }
}


function DisplayImage()
{
    for (var i = 0; i < randomarray.length ; i++)
        {
            if(openimageArray[i] == 0)
                {
                    document.getElementById("image" + i).src = "Images/initial1.jpg";
                }
            else
                {
                    var imagepath = 'Images/' + randomarray[i] + '.jpg' ;
                    document.getElementById("image"+ i).src = imagepath;
                }
            
        }
}

function isWin()
{
    for(var i = 0; i < randomarray.length ; i++)
        {
            if(openimageArray[i] == 0)
                {
                    return;
                }
            
        }
    DisplayImage();
    alert("You Win the Game and Your Score is " +score);
    initialize();
    DisplayImage();
}



