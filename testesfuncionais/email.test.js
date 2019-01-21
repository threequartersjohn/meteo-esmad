const axios = require("axios")

let email1,email2;

function getAllUsers() {
    let repeated = false;
    return axios.get("http://eb2-threequartersjohn.c9users.io/users")
        .then((response) => {

            console.log(response.data);
            for (let user in response.data){

                email1 = response.data[user].email;
                
                for (let user2 in response.data){

                    if (user != user2) {
                        email2 = response.data[user2].email;
                        if (email1 == email2) repeated = true;
                        console.log(email1, email2);
                    }
                }

            }

            return repeated;

        })

}

test('Email not repeated', async () => {

    expect.assertions(1);
    let test = await getAllUsers();
    expect(test).toBe(false);

})