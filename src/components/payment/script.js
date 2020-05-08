function pay()
{
    
    req=new XMLHttpRequest();
    url11="./api/client/complete.php";
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
            alert("Job successfully completed")
            stat='complete';
            Load('#rating',1,'right');
        }
    };

}