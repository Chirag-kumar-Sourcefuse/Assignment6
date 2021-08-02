"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var addNum = 5;
var old;
var Role;
(function (Role) {
    Role[Role["SuperAdmin"] = 0] = "SuperAdmin";
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["Subscriber"] = 2] = "Subscriber";
})(Role || (Role = {}));
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
//  :::: Decorator Factory ::::
function FormatDate(constructorFn) {
    var dtm = document.getElementById("datetime");
    setInterval(function () {
        dtm.innerHTML = new Date().toLocaleString();
    }, 1000);
}
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.row_added = 0;
        return _this;
    }
    Table.prototype.set = function (num) {
        this.row_added = num;
    };
    Table.prototype.get = function () {
        return this.row_added;
    };
    Table.prototype.Create = function () {
        this.set(1);
        console.log("created", this.get());
        var addR = document.getElementById("my-table");
        console.log(addR);
        var newR = addR.insertRow();
        var i = addNum;
        var row = "<tr id=\"row_" + i + "\">\n        <td><input disabled type=text class=\"equal" + i + " id\"></td>\n        <td><input disabled type=text class=\"equal" + i + " firstname\"></td>\n        <td><input disabled type=text class=\"equal" + i + " middleName\"></td>\n        <td><input disabled type=text class=\"equal" + i + " lastName\"></td>\n        <td><input disabled type=text class=\"equal" + i + " email\"></td>\n        <td><input disabled type=text class=\"equal" + i + " phoneNo\"></td>\n        <td><input disabled type=text class=\"equal" + i + " role\"></td>\n        <td><input disabled type=text class=\"equal" + i + " address\"></td>\n        <td>\n        <button type=\"button\" onclick=\"new Table().Update(" + i + ",this)\"  value=\"Edit\">Edit</button>\n        <button type=\"button\" onclick=\"new Table().Delete(this)," + i + "\" value=\"Delete\">Delete</button>\n        </td>\n        <td id=\"hidden\" style=\"display:none\"><button type=\"button\" onclick=\"new Table().Save(this," + i + ")\" value=\"Save\">Save</button>\n        <button type=\"button\" onclick=\"new Table().Cancel(" + i + ")\" value=\"Cancel\">Cancel</button>\n        </td>\n        </tr>";
        addNum = addNum + 1;
        addR.innerHTML += row;
    };
    Table.prototype.Read = function () {
        console.log("read", this.get());
        fetch("/routes-users")
            .then(function (response) { return response.json(); })
            .then(function (json) {
            var Users = json;
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
            var table = document.createElement("table");
            table.id = "my-table";
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
            var tr = table.insertRow(-1); // TABLE ROW.
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th"); // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
            console.log(Users[0].id);
            for (var i_1 = 0; i_1 < Users.length; i_1++) {
                var row = "<tr id=\"row_" + i_1 + "\">\n                        <td>" + Users[i_1].id + "</td>\n                        <td><input disabled type=text class=\"equal" + i_1 + " firstname\" value=" + Users[i_1].firstName + "></td>\n                        <td><input disabled type=text class=\"equal" + i_1 + " middleName\" value=" + Users[i_1].middleName + "></td>\n                        <td><input disabled type=text class=\"equal" + i_1 + " lastName\" value=" + Users[i_1].lastName + "></td>\n                        <td><input disabled type=text class=\"equal" + i_1 + " email\" value=" + Users[i_1].email + "></td>\n                        <td><input disabled type=text class=\"equal" + i_1 + " phoneNo\" value=" + Users[i_1].phoneNo + "></td>\n                        <td><input disabled type=text class=\"equal" + i_1 + " role\" value=" + Users[i_1].role + "></td>\n                        <td><input disabled type=text class=\"equal" + i_1 + " address\" value=" + Users[i_1].address + "></td>\n                        <td>\n                        <button type=\"button\" onclick=\"new Table().Update(" + i_1 + ",this)\"  value=\"Edit\">Edit</button>\n                        <button type=\"button\" onclick=\"new Table().Delete(this)," + i_1 + "\" value=\"Delete\">Delete</button>\n                        \n                        </td>\n                        <td id=\"hidden\" style=\"display:none\"><button type=\"button\" onclick=\"new Table().Save(this," + i_1 + ")\" value=\"Save\">Save</button>\n                        <button type=\"button\" onclick=\"new Table().Cancel(" + i_1 + ")\">Cancel</button>\n                        </td>\n            \n            </tr>";
                table.innerHTML += row;
                var divContainer = document.getElementById("page");
                //console.log(divContainer);
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
            }
        });
        var temp = document.getElementById("load");
        temp.innerText = "Refresh data";
    };
    Table.prototype.Update = function (i, td) {
        console.log("updated", this.get());
        var row = document.querySelector("#row_" + i);
        //console.log(row)
        old = row.cloneNode(true);
        console.log("old", old);
        var i_s = document.querySelector("#row_" + i + " #hidden");
        i_s.style.display = 'inline';
        var ele = row.querySelectorAll('input'); //.disabled;
        //console.log("ele",typeof ele);
        for (var i_2 = 0; i_2 < ele.length; i_2++) {
            ele[i_2].disabled = false;
        }
    };
    Table.prototype.Delete = function (td) {
        if (confirm('Are you sure to delete this record ?')) {
            var row = td.parentElement.parentElement.rowIndex;
            var id = (td.parentElement.parentElement).children[0].innerHTML;
            console.log("id", id, typeof (id));
            console.log("row", row, typeof (row));
            var temp = document.getElementById("my-table");
            fetch("/routes-users/" + id, {
                method: "DELETE",
                body: JSON.stringify({
                    UId: id
                }),
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
            }).then(function (res) {
                res.json;
            });
            temp.deleteRow(row);
        }
    };
    Table.prototype.Save = function (td, sid) {
        var row = td.parentElement.parentElement;
        var selectedRow = document.getElementById("row_" + sid);
        var button = selectedRow.querySelectorAll('input');
        var row_added = this.get();
        // var temp=document.querySelector(`#row_${sid}`) as HTMLInputElement
        // console.log("child",temp.children[0]);
        // console.log("row_added by get",this.get());
        // console.log("r0--->",row.children[0].firstElementChild.value);
        console.log("row_added", this.get());
        if (this.row_added == 1) {
            fetch("/routes-users", {
                method: "POST",
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
                .then(function (res) {
                if (res.status != 404) {
                    res.json;
                    for (var i = 0; i < button.length; i++) {
                        button[i].disabled = true;
                    }
                    alert("Data saved successfully(post)");
                }
                else {
                    alert("Cannot update! USerId(id) already exists");
                }
            });
            document.querySelector("#row_" + sid + " #hidden").style.display = 'none';
        }
        if (this.row_added == 0) {
            console.log("save-patch", row.children[1].innerHTML);
            fetch("/routes-users/" + row.children[0].innerHTML, {
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
                .then(function (res) {
                console.log("button len", button.length);
                for (var i = 0; i < button.length; i++) {
                    button[i].disabled = true;
                }
                alert("Data saved successfully!");
            });
        }
        document.querySelector("#row_" + sid + " #hidden").style.display = 'none';
    };
    // var selectedRow=document.getElementById(`row_${sid}`) as HTMLElement;
    //console.log(selectedRow)
    //console.log("save",selectedRow.querySelectorAll("input")[0].value);
    // var button=selectedRow.querySelectorAll('input');
    //console.log(button);
    // for(let i=0;i<button.length;i++){
    //     button[i].disabled=true;
    // }
    // document.querySelector<any>(`#row_${sid} #hidden`).style.display='none';
    Table.prototype.Cancel = function (cid) {
        var row_added = this.get();
        if (row_added == 0) {
            var row = document.querySelector("#row_" + cid);
            console.log(row);
            console.log("OldNode", old);
            row.replaceWith(old);
        }
    };
    Table = __decorate([
        FormatDate
    ], Table);
    return Table;
}(Model));
function main() {
    console.log("main");
    var obj = new Table();
    obj.Read();
    document.getElementById("addData").style.display = "Block";
}
