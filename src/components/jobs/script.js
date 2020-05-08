
req=new XMLHttpRequest();
if(result['type']==1)
{
    if(stat=='active')
    {
        document.getElementById('sel1').style.display="block";
        url11="./api/client/getactivejobs.php";
    }
    if(stat=='complete')
    url11="./api/client/getcompletejobs.php";
    
}
if(result['type']==2)
{
    if(stat=='all')
    url11="./api/freelancer/getalljobs.php";
    if(stat=='active')
    url11="./api/freelancer/getactivejobs.php";
    if(stat=='complete')
    url11="./api/freelancer/getcompletejobs.php";
}
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
    //console.log(resp['result'].length);
    list();
    }
};
function list()
{
    document.getElementById("activejobs").innerHTML="";
    var filter=document.getElementById('sel').value;
    var filter1=document.getElementById('search').value;
    for(i=0;i<resp['result'].length;i++)
    {
        if(filter=="all"||filter==JSON.stringify(resp['result'][i]['status']).replace('\"','').replace('\"',''))
        {
            if(filter1==JSON.stringify(resp['result'][i]['title']).replace('\"','').replace('\"','')||filter1=="")
            {
                inn=document.getElementById("activejobs");
                scriptNode = document.createElement('div');
                scriptNode.setAttribute('class',"list");
                scriptNode.setAttribute('onclick',"view("+JSON.stringify(resp['result'][i]['jid']).replace('\"','').replace('\"','')+")");
                tab=document.createElement('table');
                tab.setAttribute('cellpadding',"5");
                trr=document.createElement('tr');
                trr.innerHTML="<td><b>"+JSON.stringify(resp['result'][i]['title']).replace('\"','').replace('\"','')+"</b></td><td>Status : "+JSON.stringify(resp['result'][i]['status']).replace('\"','').replace('\"','')+"</td>";
                tab.appendChild(trr)
                trr1=document.createElement('tr');
                trr1.innerHTML="<td>"+JSON.stringify(resp['result'][i]['description']).replace('\"','').replace('\"','')+"</td>";
                tab.appendChild(trr1)
                scriptNode.appendChild(tab);
                inn.appendChild(scriptNode);
            }
        }
    }
}
function search()
{
    document.getElementById("activejobs").innerHTML="";
    var filter=document.getElementById('search').value;
    var filter1=document.getElementById('sel').value;
    //alert(filter+"hi")
    for(i=0;i<resp['result'].length;i++)
    {
        //alert(filter+filter1)
        //alert(filter+JSON.stringify(resp['result'][i]['title']).replace('\"','').replace('\"',''))
        if((filter==JSON.stringify(resp['result'][i]['title']).replace('\"','').replace('\"','')&&(filter1=="all"||filter1==JSON.stringify(resp['result'][i]['status']).replace('\"','').replace('\"','')))||((filter==""&&(filter1=="all"||filter1==JSON.stringify(resp['result'][i]['status']).replace('\"','').replace('\"','')))))
        {
            inn=document.getElementById("activejobs");
            scriptNode = document.createElement('div');
            scriptNode.setAttribute('class',"list");
            scriptNode.setAttribute('onclick',"view("+JSON.stringify(resp['result'][i]['jid']).replace('\"','').replace('\"','')+")");
            tab=document.createElement('table');
            tab.setAttribute('cellpadding',"5");
            trr=document.createElement('tr');
            trr.innerHTML="<td><b>"+JSON.stringify(resp['result'][i]['title']).replace('\"','').replace('\"','')+"</b></td><td>Status : "+JSON.stringify(resp['result'][i]['status']).replace('\"','').replace('\"','')+"</td>";
            tab.appendChild(trr)
            //alert(filter+JSON.stringify(resp['result'][i]['title']).replace('\"','').replace('\"',''))
            trr1=document.createElement('tr');
            trr1.innerHTML="<td>"+JSON.stringify(resp['result'][i]['description']).replace('\"','').replace('\"','')+"</td>";
            tab.appendChild(trr1)
            scriptNode.appendChild(tab);
            inn.appendChild(scriptNode);
        }
    }
}
function view(i)
{
    jid=i;
    Load('#viewjob',1,'right');
}