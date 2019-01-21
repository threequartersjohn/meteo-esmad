const axios = require("axios")


function getAllUsers() {
    let empty = false;

    return axios.get("http://eb2-threequartersjohn.c9users.io/users")
        .then((response)=>{
            
            console.log(response.data)
            for (let user in response.data){
                if (response.data[user].password == "") empty = true;
                else console.log(response.data[user].password);
            }
            return empty;
        })

};

test("No Empty Passwords", async () => {
    expect.assertions(1);
    let test = await getAllUsers();
    expect(test).toBe(false); //MUDAR---------------
});
