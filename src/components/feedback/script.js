function feedback1()
{
    var description=document.feedback.description.value;
    req=new XMLHttpRequest();
    let url="./api/user/feedback.php";
    req.open("POST",url);
    req.send(JSON.stringify({description:description}));
    req.onload = function()
    {
        if (req.status != 200) 
        { 
            alert(`Error ${req.status}: ${req.statusText} ${url}`);
        } 
        else 
        {
            alert("Feedback successfully recorded");
            Load('#postjob',1,'right');
            //stat='active';
        }
    };
    
}