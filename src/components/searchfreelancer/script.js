
req=new XMLHttpRequest();
url11="./api/client/getfreelancer.php";
req.open("GET",url11);
req.send();
resp="";
req.onload = function()
{
    if (req.status != 200) 
    { 
        alert(`Error ${req.status}: ${req.statusText} ${url11}`);
    } 
    else 
    {
    //console.log(JSON.parse(req.response))
    resp=JSON.parse(req.response);
    //console.log(resp);
    list();
    }
};
function list()
{
    document.getElementById("searchfreelancer").innerHTML="";
    var filter1=document.getElementById('search').value;
    for(i=0;i<resp['result'].length;i++)
    {
            if(filter1==JSON.stringify(resp['result'][i]['uname']).replace('\"','').replace('\"','').trim()||filter1=="")
            {
                inn=document.getElementById("searchfreelancer");
                scriptNode = document.createElement('div');
                scriptNode.setAttribute('class',"list");
                //scriptNode.setAttribute('onclick',"view("+JSON.stringify(resp['result'][i]['uid']).replace('\"','').replace('\"','')+")");
                tab=document.createElement('table');
                tab.setAttribute('cellpadding',"5");
                trr=document.createElement('tr');
                star="";
                if(JSON.stringify(resp['result'][i]['rating']).replace('\"','').replace('\"','')==0)
                {
                    star="Not Rated Yet"
                }
                else
                {
                    rating=(JSON.stringify(resp['result'][i]['rating']).replace('\"','').replace('\"',''))/(JSON.stringify(resp['result'][i]['cnt']).replace('\"','').replace('\"',''))
                        for(j=0;j<rating;j++)
                        star+='<span class="fa fa-star checked"></span>'
                    for(k=j;k<5;k++)
                        star+='<span class="fa fa-star"></span>'
                }
                trr.innerHTML="<td><b>"+JSON.stringify(resp['result'][i]['uname']).replace('\"','').replace('\"','')+"</b></td><td>Rating : "+star+"</td>";
                tab.appendChild(trr)
                trr1=document.createElement('tr');
                trr1.innerHTML="<td>Loacation : "+JSON.stringify(resp['result'][i]['location']).replace('\"','').replace('\"','')+"</td>";
                tab.appendChild(trr1)
                scriptNode.appendChild(tab);
                inn.appendChild(scriptNode);
            }
    }
}/*
function view(i)
{
    jid=i;
    Load('#viewfreelancer',1,'right');
}*/