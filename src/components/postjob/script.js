function postj()
{
    var name=document.postjob.name.value;
    var budget=document.postjob.budget.value;
    var description=document.postjob.description.value;
    var category=document.postjob.category.value;
    if(chk('jname','^[A-Za-z0-9\ \(\)]+$')&&chk('jbudget','^[0-9]+$')&&chk('jdescription','^[A-Za-z0-9\ \;\(\)]+$')&&chk('jcategory','^[A-Za-z\ ]+$'))
    {
        req=new XMLHttpRequest();
          let url="./api/client/postjob.php";
          req.open("POST",url);
          req.send(JSON.stringify({name:name,budget:budget,description:description,category:category}));
          req.onload = function()
          {
              if (req.status != 200) 
              { 
                  alert(`Error ${req.status}: ${req.statusText} ${url}`);
              } 
              else 
              {
                //JSON.parse(req.response);
                //console.log(result)
                alert("Job posted successfully");
                Load('#jobs',1,'right');
                stat='active';
              }
          };
    }
}