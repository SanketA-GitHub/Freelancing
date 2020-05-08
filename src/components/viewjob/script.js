req=new XMLHttpRequest();
url11="./api/user/getjob.php";
req.open("POST",url11);
req.send(JSON.stringify({"jid":jid}));
req.onload = function()
{
    if (req.status != 200) 
    { 
        alert(`Error ${req.status}: ${req.statusText} ${url11}`);
    } 
    else 
    {
    //console.log(JSON.parse(req.response))
    //resp=JSON.parse(req.response);
    //    alert(JSON.stringify(req.response))
    res=JSON.parse(req.response);
    //console.log(res);
    document.getElementById('chat2').style.display="none";
    document.getElementById('comp').style.display="none";
    document.getElementById('del').style.display="none";
    document.getElementById('issue').style.display="none";
    document.getElementById('title').innerHTML=res['result'][0]['title'];
    document.getElementById('category').innerHTML="<b>Category : </b>"+res['result'][0]['category'];
    document.getElementById('description').innerHTML="<b>Description : </b><br><br>"+res['result'][0]['description'];
    document.getElementById('budget').innerHTML="<b>Budget : </b>"+res['result'][0]['budget'];
    document.getElementById('date').innerHTML="<b>Date & time : </b>"+res['result'][0]['datetime'];
    document.getElementById('status').innerHTML="<b>Status : </b>"+res['result'][0]['status'];
    if(result['type']==1)
    {
        if(res['result'][0]['fid']==null)
        {
            document.getElementById('del').style.display="block";
            req=new XMLHttpRequest();
            url11="./api/client/getbid.php";
            req.open("POST",url11);
            req.send(JSON.stringify({"jid":jid}));
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
                for(i=0;i<resp['result'].length;i++)
                {
                    inn=document.getElementById("bid");
                    scriptNode = document.createElement('div');
                    scriptNode.setAttribute('class',"list");
                    //scriptNode.setAttribute('onclick',"view("+JSON.stringify(resp['result'][i]['jid']).replace('\"','').replace('\"','')+")");
                    tab=document.createElement('table');
                    tab.setAttribute('cellpadding',"5");
                    trr=document.createElement('tr');
                    var star="";
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
                    //alert(star)
                    trr.innerHTML="<td><b>Name : </b>"+JSON.stringify(resp['result'][i]['uname']).replace('\"','').replace('\"','')+"</td><td><b>Rating : </b>"+star+"</td>";
                    tab.appendChild(trr)
                    trr1=document.createElement('tr');
                    trr1.innerHTML="<td><b>Bid Amount : </b>"+JSON.stringify(resp['result'][i]['amount']).replace('\"','').replace('\"','')+"</td>"+"<td><button class='btn btn-outline-primary' onclick='accept("+JSON.stringify(resp[`result`][i][`uid`])+","+JSON.stringify(resp[`result`][i][`jid`])+")'> Accept </button></td>";
                    tab.appendChild(trr1)
                    scriptNode.appendChild(tab);
                    inn.appendChild(scriptNode);
                }
                }
            };

        }
        else
        {
            if(res['result'][0]['status']!='complete')
            {
                document.getElementById('chat2').style.display="block";
                document.getElementById('comp').style.display="block";
                document.getElementById('issue').style.display="block";
                req=new XMLHttpRequest();
                url11="./api/user/getchat.php";
                req.open("POST",url11);
                req.send(JSON.stringify({"jid":jid,"t":res['result'][0]['fid']}));
                req.onload = function()
                {
                    if (req.status != 200) 
                    { 
                        alert(`Error ${req.status}: ${req.statusText} ${url11}`);
                    } 
                    else 
                    {
                        r=JSON.parse(req.response);
                        for(i=0;i<r['result'].length;i++)
                        
                        {
                            inn=document.getElementById("chat1");
                            scriptNode = document.createElement('div');
                            scriptNode.setAttribute('class',"msg");
                            scriptNode.innerHTML=r['result'][i]['message'];
                            if(r['result'][i]['id1']==result['uid'])
                                scriptNode.style.textAlign="right"
                            inn.appendChild(scriptNode);
                        }
                    }
                };
            }
        }
    }
    if(result['type']==2)
    {
        if(res['result'][0]['fid']==null)
        {
            document.getElementById('bid').innerHTML="Bid amount : &nbsp;<input id='bidamt'><button class='btn btn-outline-primary' onclick='bid(res[`result`][0][`jid`])'>Bid</button>";
            req=new XMLHttpRequest();
            url11="./api/freelancer/checkbid.php";
            req.open("POST",url11);
            req.send(JSON.stringify({"jid":jid}));
            req.onload = function()
            {
                if (req.status == 200) 
                {
                    //alert("hi") 
                    r=JSON.parse(req.response);
                    document.getElementById('bid').innerHTML="Bid of amount Rs "+r['result']['amount']+" placed";       
                } 
                
            };
            }
        else
        {
            document.getElementById('issue').style.display="block";
            document.getElementById('chat2').style.display="block";
            req=new XMLHttpRequest();
            url11="./api/user/getchat.php";
            req.open("POST",url11);
            req.send(JSON.stringify({"jid":jid,"t":res['result'][0]['cid']}));
            req.onload = function()
            {
                if (req.status != 200) 
                { 
                    alert(`Error ${req.status}: ${req.statusText} ${url11}`);
                } 
                else 
                {
                    r=JSON.parse(req.response);
                    for(i=0;i<r['result'].length;i++)
                    
                    {
                        inn=document.getElementById("chat1");
                        scriptNode = document.createElement('div');
                        scriptNode.setAttribute('class',"msg");
                        scriptNode.innerHTML=r['result'][i]['message'];
                        if(r['result'][i]['id1']==result['uid'])
                            scriptNode.style.textAlign="right"
                        inn.appendChild(scriptNode);
                    }
                }
            };
        }    
    }
    }
    
};

function sendmsg()
{
    req=new XMLHttpRequest();
    url11="./api/user/putchat.php";
    req.open("POST",url11);
    //console.log(res)
    if(result['type']==2)
        req.send(JSON.stringify({"jid":jid,"t":res['result'][0]['cid'],"msg":document.getElementById('chatmsg').value}));
    else    
    req.send(JSON.stringify({"jid":jid,"t":res['result'][0]['fid'],"msg":document.getElementById('chatmsg').value}));
    req.onload = function()
    {
        if (req.status != 200) 
        { 
            alert(`Error ${req.status}: ${req.statusText} ${url11}`);
        } 
        else 
        {
            req=new XMLHttpRequest();
            url11="./api/user/getchat.php";
            req.open("POST",url11);
            //console.log(res)
            if(result['type']==1)
                req.send(JSON.stringify({"jid":jid,"t":res['result'][0]['fid']}));
            else
                req.send(JSON.stringify({"jid":jid,"t":res['result'][0]['cid']}));
            req.onload = function()
            {
                if (req.status != 200) 
                { 
                    alert(`Error ${req.status}: ${req.statusText} ${url11}`);
                } 
                else 
                {
                    document.getElementById("chat1").innerHTML="";
                    r=JSON.parse(req.response);
                    for(i=0;i<r['result'].length;i++)
                    
                    {
                        inn=document.getElementById("chat1");
                        scriptNode = document.createElement('div');
                        scriptNode.setAttribute('class',"msg");
                        scriptNode.innerHTML=r['result'][i]['message'];
                        if(r['result'][i]['id1']==result['uid'])
                            scriptNode.style.textAlign="right"
                        inn.appendChild(scriptNode);
                    }
                }
            };
        }
    };
}
function accept(uid,jid)
{
    req=new XMLHttpRequest();
    url11="./api/client/accept.php";
    req.open("POST",url11);
    req.send(JSON.stringify({"jid":jid,"uid":uid}));
    req.onload = function()
    {
        if (req.status != 200) 
        { 
            alert(`Error ${req.status}: ${req.statusText} ${url11}`);
        } 
        else 
        {
            alert("Bid successfully accepted")
            stat='active';
            Load('#jobs',1,'right');
        }
    };
}
function complete()
{
    t=res['result'][0]['fid'];
    Load('#payment',1,'right');
}
function bid(jid)
{
    amt=document.getElementById('bidamt').value;
    //alert(amt)
    req=new XMLHttpRequest();
    url11="./api/freelancer/bid.php";
    req.open("POST",url11);
    req.send(JSON.stringify({"jid":jid,"amt":amt}));
    req.onload = function()
    {
        if (req.status != 200) 
        { 
            alert(`Error ${req.status}: ${req.statusText} ${url11}`);
        } 
        else 
        {
            alert("Bid successfully placed")
        }
    };
}
function del()
{
    req=new XMLHttpRequest();
    url11="./api/client/del.php";
    req.open("POST",url11);
    req.send(JSON.stringify({"jid":jid}));
    req.onload = function()
    {
        if (req.status != 200) 
        { 
            alert(`Error ${req.status}: ${req.statusText} ${url11}`);
        } 
        else 
        {
            alert("Job successfully deleted")
            stat='active';
            Load('#jobs',1,'right');
        }
    };
}