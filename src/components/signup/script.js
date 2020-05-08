function signup1()
{
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let location=document.getElementById("location").value;
    let password=document.getElementById("password").value;
    let cpassword=document.getElementById("cpassword").value;
    let type=document.getElementById("type").value;
    document.getElementById("type").style.border="";
    document.getElementById("name").style.border="";
    document.getElementById("email").style.border="";
    document.getElementById("location").style.border="";
    document.getElementById("password").style.border="";
    document.getElementById("cpassword").style.border="";
    let flag=0;
    if(!name.match("^[A-Za-z]+$"))
    {
        flag=1;
        document.getElementById("name").style.border="1px solid red";
    }
    if(!email.match("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"))
    {
        flag=1;
        document.getElementById("email").style.border="1px solid red";
    }
    if(!location.match("^[A-Za-z]+$"))
    {
        flag=1;
        document.getElementById("location").style.border="1px solid red";
    }
    if(!password.match("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$"))
    {
        
        flag=1;
        document.getElementById("password").style.border="1px solid red";
    }
    if(!cpassword.match(password))
    {
        flag=1;
        document.getElementById("cpassword").style.border="1px solid red";
    }
    if(flag==0)
    {
        req=new XMLHttpRequest();
        let url="./api/user/register.php";
        req.open("POST",url);
        req.send(JSON.stringify({name:name,email:email,password:password,location:location,type:type}));
        req.onload = function()
        {
            if (req.status != 200) 
            { 
                alert(`Error ${req.status}: ${req.statusText} ${url}`);
            } 
            else 
            {
                alert(req.response);
            }
        };    
    }
    
}