function rate(i)
{
    
    req=new XMLHttpRequest();
    url11="./api/user/rateuser.php";
    req.open("POST",url11 );
    
    req.send(JSON.stringify({"id":t,"rate":i}));
    req.onload = function()
    {
        if (req.status != 200) 
        { 
            alert(`Error ${req.status}: ${req.statusText} ${url11}`);
        } 
        else 
        {
            alert(req.response)
            stat='complete';
            Load('#jobs',1,'right');
        }
    };
}