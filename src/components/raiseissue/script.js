function raise()
{
    var description=document.raiseissue.description.value;
    req=new XMLHttpRequest();
    let url="./api/user/raiseissue.php";
    req.open("POST",url);
    req.send(JSON.stringify({description:description,jid:jid}));
    req.onload = function()
    {
        if (req.status != 200) 
        { 
            alert(`Error ${req.status}: ${req.statusText} ${url}`);
        } 
        else 
        {
            alert("Issue successfully raised");
            Load('#jobs',1,'right');
            stat='active';
        }
    };
    
}