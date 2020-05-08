
    function login1()
    {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";

    }
    function close1()
    {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
    function login2()
    {
      let email=document.getElementById("usrname").value;
      let password=document.getElementById("pass").value;
      req=new XMLHttpRequest();
      let url="./api/user/login.php";
      req.open("POST",url);
      req.send(JSON.stringify({email:email,password:password}));
      req.onload = function()
      {
          if (req.status != 200&&req.status != 0) 
          { 
              alert(`Error ${req.status}: ${req.statusText} ${url}`);
          } 
          else 
          {
              result=JSON.parse(req.response);
              //result["name"].trim();
              close1();
              document.getElementById('link').style.display="none";
              document.getElementById('link1').style.display="none";
              document.getElementById('uname').innerHTML=`${result["name"]}`;
              document.getElementById('dropdown').style.display="block";
              //alert(req.response);
              loggedin=true;
              //console.log(result)
              if(result['type']==1)
                location.hash="/client";
              if(result['type']==2)
                location.hash="/freelancer"
              if(result['type']==3)
                location.hash="/admin"
              //console.log(result)
              
          }
      };
      
    }
    function logout()
    {
      req=new XMLHttpRequest();
      let url="./api/user/logout.php";
      req.open("GET",url);
      req.send();
      req.onload = function()
      {
          if (req.status == 200) 
          { 
            document.getElementById('link').style.display="";
            document.getElementById('link1').style.display="";
            document.getElementById('dropdown').style.display="none";
            loggedin=false;
            result="";
            location.hash="/intro";
            clean();
          }
        };
    }
    function keepstate()
    {
    if(loggedin)
    {
              document.getElementById('link').style.display="none";
              document.getElementById('link1').style.display="none";
              document.getElementById('uname').innerHTML=`${result["name"]}`;
              document.getElementById('dropdown').style.display="block";
    }
  }
  keepstate();