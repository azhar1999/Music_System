var songlist = JSON.parse(localStorage.getItem('songlist'));
if (songlist == null) songlist=[];

let reader = new FileReader();
let url = "";



function addSongs(e) {
    e.preventDefault();

    var songnameInput = document.getElementById('songnameInput').value;
    var songartistInput = document.getElementById('songartistInput').value;
    var yearReleasedInput = document.getElementById('yearreleasedInput').value;


    // var fileInput=document.getElementById('albumcoverInput');
    // var albumcoverInput=(fileInput.files[0]);

    songlist.push({
        songName : songnameInput,
        songArtist : songartistInput,
        songyearRelease : yearReleasedInput,
        imageURL :url
    });

    localStorage.setItem('songlist',JSON.stringify(songlist));

    var songget= JSON.parse(localStorage.getItem('songlist'));


    createTable(songget);
    


    }


function createTable(songlist){

    var table = document.querySelector('.table');

    table.style.display = "block";
    table.innerHTML=`<tr><th>Song no</th><th>album cover</th><th>song name</th><th>song artist</th><th> year released</th></tr>`;

    for (var i=0;i<songlist.length;i++){


        // var image = document.createElement('image');
        // image.src = URL.createObjectURL(songslist[i].songalbumCover);
        table.innerHTML += `<tr><td>${i+1}</td>
                  <td><img width = "100%" height ="100%" src = "${songlist[i].imageURL}"></td>
                  <td>${songlist[i].songName}</td>
                  <td>${songlist[i].songArtist}</td>
                  <td>${songlist[i].songyearRelease}</td></tr>`;
    }

    document.querySelector('.container').reset();


}



function sort(){
    var songget= JSON.parse(localStorage.getItem('songlist'));
    var songid = document.getElementById('sort').value;

    switch(songid){
        case 'sname':
            songget.sort(sortbyname);
            createTable(songget);
            break;
        
        case 'sartist':
            songget.sort(sortbyartist);
            createTable(songget);
            break;
        case 'year':
            songget.sort(sortbyyear);
            createTable(songget);
            break;
        
        default:
            console.log("break");
    }
}


function sortbyname(a,b){
    const songa = a.songName.toUpperCase();
    const songb = b.songName.toUpperCase();

    let comparison = 0;
    if (songa > songb) {
        comparison = 1;
    } else if (songa < songb) {
        comparison = -1;
    }
    return comparison;

}

function sortbyartist(a,b){
    const songa = a.songArtist.toUpperCase();
    const songb = b.songArtist.toUpperCase();

    let comparison = 0;
    if (songa > songb) {
        comparison = 1;
    } else if (songa < songb) {
        comparison = -1;
    }
    return comparison;

}

function sortbyyear(a,b){
    
    var songa = a.songyearRelease;
    var songb = b.songyearRelease;



    let comparison = 0;
    if (songa > songb) {
        comparison = 1;
    } else if (songa < songb) {
        comparison = -1;
    }
    return comparison;

}

function search()
{
    var songget= JSON.parse(localStorage.getItem('songlist'));
    
    var searchname=document.getElementById("searchInput").value;

    if(searchname===""||searchname===null)
    {
        createTable(songget);
        return;
    }
    else
    {
    searchBy(searchname,songget);
    }
}



function searchBy(searchname, songget){
    var searching = new RegExp(`${searchname}`,"gi")
    var result =[];
    var resultsongname = songget.filter(function(el){
        return searching.test(el.songName);

    });

    var resultsongartist = songget.filter(function(el){
        return searching.test(el.songArtist);});


    result.push(...resultsongname);
    result.push(...resultsongartist);


    createTable(result);


 }




document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('submit').addEventListener('click', addSongs)
    createTable(songlist);
});

function uploadImage(){
    var file = document.getElementById('albumcoverInput').files[0];
    reader.readAsDataURL(file);

}

reader.onloadend =() =>{
    url = reader.result;

}





