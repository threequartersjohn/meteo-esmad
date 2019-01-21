const axios = require("axios")


function getAllUsers() {
    var nAdmin = 0;
    return axios.get("http://eb2-threequartersjohn.c9users.io/users")
        .then((response) => {

            console.log(response.data);
            for (let user in response.data) {

                if (response.data[user].admin == true) {
                    nAdmin++;
                }
            }
            console.log(nAdmin);
            return nAdmin;
        })  

}

test('Admin to be 1', async () => {

    expect.assertions(1);
    let test = await getAllUsers();
    expect(test).toBe(1);

})
