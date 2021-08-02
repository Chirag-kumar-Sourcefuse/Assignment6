
var addNum:number=5;
var old:any;
enum Role{SuperAdmin, Admin, Subscriber}

class Model<T,U>{
    id:T;
    firstName:T ;
    middleName:T ;
    lastName:T ;
    email:T ;
    phoneNo:U ;
    role:T;
    address:T | U;
}

interface Icrud<T>{
    Create<T>():void;
    Read<T>():void;
    Update<T>(i:any,td:any):void;
    Delete<T>(i:any):void;
}

//  :::: Decorator Factory ::::

function FormatDate(constructorFn:Function){
    const dtm=document.getElementById("datetime") as HTMLInputElement;
    setInterval(function() {
       dtm.innerHTML=new Date().toLocaleString();
   }, 1000);

}


@FormatDate
class Table extends Model<string,number> implements Icrud<void>{
     public row_added: number=0;
     set(num:number){
         this.row_added=num;
     }
     get(){
         return this.row_added;
     }
    Create<T>(){
        this.set(1);
        console.log("created",this.get());
        var addR:any=document.getElementById("my-table") as HTMLElement;
        console.log(addR);
         var newR=addR.insertRow();
        let i:number=addNum;
        let row=`<tr id="row_${i}">
        <td><input disabled type=text class="equal${i} id"></td>
        <td><input disabled type=text class="equal${i} firstname"></td>
        <td><input disabled type=text class="equal${i} middleName"></td>
        <td><input disabled type=text class="equal${i} lastName"></td>
        <td><input disabled type=text class="equal${i} email"></td>
        <td><input disabled type=text class="equal${i} phoneNo"></td>
        <td><input disabled type=text class="equal${i} role"></td>
        <td><input disabled type=text class="equal${i} address"></td>
        <td>
        <button type="button" onclick="new Table().Update(${i},this)"  value="Edit">Edit</button>
        <button type="button" onclick="new Table().Delete(this),${i}" value="Delete">Delete</button>
        </td>
        <td id="hidden" style="display:none"><button type="button" onclick="new Table().Save(this,${i})" value="Save">Save</button>
        <button type="button" onclick="new Table().Cancel(${i})" value="Cancel">Cancel</button>
        </td>
        </tr>`
        addNum=addNum+1;
        addR.innerHTML += row;

    }
    Read<T>(){
        console.log("read",this.get());
        fetch("/routes-users")
        .then((response)=>response.json())
        .then(json=>{
            
            const Users=json;
            // console.log("Userrr",Userrr.length,Userrr[0],Userrr[1].key);
            var col = [];
        for (var i = 0; i < Users.length; i++) {
            for (var key in Users[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        col.push("buttons");

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table") as HTMLTableElement;

        table.id="my-table";

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        console.log(Users[0].id)
        for(let i=0;i<Users.length;i++){
            let row=`<tr id="row_${i}">
                        <td>${Users[i].id}</td>
                        <td><input disabled type=text class="equal${i} firstname" value=${Users[i].firstName}></td>
                        <td><input disabled type=text class="equal${i} middleName" value=${Users[i].middleName}></td>
                        <td><input disabled type=text class="equal${i} lastName" value=${Users[i].lastName}></td>
                        <td><input disabled type=text class="equal${i} email" value=${Users[i].email}></td>
                        <td><input disabled type=text class="equal${i} phoneNo" value=${Users[i].phoneNo}></td>
                        <td><input disabled type=text class="equal${i} role" value=${Users[i].role}></td>
                        <td><input disabled type=text class="equal${i} address" value=${Users[i].address}></td>
                        <td>
                        <button type="button" onclick="new Table().Update(${i},this)"  value="Edit">Edit</button>
                        <button type="button" onclick="new Table().Delete(this),${i}" value="Delete">Delete</button>
                        
                        </td>
                        <td id="hidden" style="display:none"><button type="button" onclick="new Table().Save(this,${i})" value="Save">Save</button>
                        <button type="button" onclick="new Table().Cancel(${i})">Cancel</button>
                        </td>
            
            </tr>`
            table.innerHTML += row;
            var divContainer = document.getElementById("page") as HTMLElement;
            //console.log(divContainer);
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        }
        });
        
        let temp=document.getElementById("load") as HTMLElement;
        temp.innerText="Refresh data";
    }

    
    
    Update(i:any,td:any):void{
        
        console.log("updated",this.get());
        var row = document.querySelector(`#row_${i}`) as HTMLInputElement;
        //console.log(row)
        old=row.cloneNode(true);
        console.log("old",old);
        var i_s=document.querySelector(`#row_${i} #hidden`) as HTMLElement;
        i_s.style.display='inline';
        var ele = row.querySelectorAll('input')//.disabled;
        //console.log("ele",typeof ele);
        for(let i=0;i<ele.length;i++){
            ele[i].disabled=false;
        }
    }
    Delete<T>(td:any):void{
        if (confirm('Are you sure to delete this record ?')) {
            let row = td.parentElement.parentElement.rowIndex;
            var id=(td.parentElement.parentElement).children[0].innerHTML;
            console.log("id",id,typeof(id));
            console.log("row",row,typeof(row));
            let temp=document.getElementById("my-table") as HTMLTableElement
            fetch(`/routes-users/${id}`,{
                method:"DELETE",
                body:JSON.stringify({
                    UId:id
                }),

                headers:{
                    "content-type":"application/json; charset=UTF-8",
                },
            }).then((res)=>{
                res.json;
            })
            temp.deleteRow(row);
        }
    }
    Save<T>(td:any,sid:any):void{
        var row=td.parentElement.parentElement;
        var selectedRow=document.getElementById(`row_${sid}`) as HTMLElement;
        var button=selectedRow.querySelectorAll('input');
        var row_added=this.get();
        // var temp=document.querySelector(`#row_${sid}`) as HTMLInputElement
        // console.log("child",temp.children[0]);
        // console.log("row_added by get",this.get());
        // console.log("r0--->",row.children[0].firstElementChild.value);
        console.log("row_added",this.get());
        if(this.row_added==1){
            fetch("/routes-users",{
                method:"POST",
                body:JSON.stringify({
                    id: row.children[0].innerHTML,
                    firstName: row.children[1].firstElementChild.value,
                    middleName: row.children[2].firstElementChild.value,
                    lastName: row.children[3].firstElementChild.value,
                    email: row.children[4].firstElementChild.value,
                    phoneNo: row.children[5].firstElementChild.value,
                    role: row.children[6].firstElementChild.value,
                    address: row.children[7].firstElementChild.value,
                }),
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then((res)=>{
                if(res.status!=404){
                    res.json;
                    for(let i=0;i<button.length;i++){
                        button[i].disabled=true;
                    }
                    alert("Data saved successfully(post)");
                }
                else{
                    alert("Cannot update! USerId(id) already exists");
                }
            })
            document.querySelector<any>(`#row_${sid} #hidden`).style.display='none';
        }

        if(this.row_added==0){
            console.log("save-patch",row.children[1].innerHTML);
            fetch(`/routes-users/${row.children[0].innerHTML}`, {
                method: "PATCH",
                body: JSON.stringify({
                    id: row.children[0].innerHTML,
                    firstName: row.children[1].firstElementChild.value,
                    middleName: row.children[2].firstElementChild.value,
                    lastName: row.children[3].firstElementChild.value,
                    email: row.children[4].firstElementChild.value,
                    phoneNo: row.children[5].firstElementChild.value,
                    role: row.children[6].firstElementChild.value,
                    address: row.children[7].firstElementChild.value,
                }),
        
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((res) => {
                    console.log("button len",button.length);
                    for(let i=0;i<button.length;i++){
                        button[i].disabled=true;
                    }
                   alert("Data saved successfully!");
                  
                 
                })
            }
            document.querySelector<any>(`#row_${sid} #hidden`).style.display='none';
        }
    // var selectedRow=document.getElementById(`row_${sid}`) as HTMLElement;

    //console.log(selectedRow)
    //console.log("save",selectedRow.querySelectorAll("input")[0].value);
    // var button=selectedRow.querySelectorAll('input');
    //console.log(button);
    // for(let i=0;i<button.length;i++){
    //     button[i].disabled=true;
    // }
    // document.querySelector<any>(`#row_${sid} #hidden`).style.display='none';
    

    Cancel<T>(cid:any):void{
        var row_added=this.get();
        if(row_added==0){
            let row=document.querySelector(`#row_${cid}`) as HTMLElement;
            console.log(row);
            console.log("OldNode",old);
            row.replaceWith(old);
        }
                
            }
}

function main(){
    console.log("main")
    const obj=new Table();
    obj.Read();
    (document.getElementById("addData") as HTMLElement).style.display="Block";
}
