fetch("/api/person")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
    })