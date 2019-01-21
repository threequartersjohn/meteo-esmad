const axios = require("axios")

let user1, user2;

function getAllUsers() {
    let repeated = false;

    return axios.get("http://eb2-threequartersjohn.c9users.io/warnings")
        .then((response) => {

            console.log(response.data)
            for (let warning in response.data) {
                user1 = response.data[warning].user_id;

                for (let warning2 in response.data) {

                    if (warning != warning2) {
                        user2 = response.data[warning2].user_id;
                        if (user1 == user2) repeated = true;
                    }
                }

            }
            return repeated;
        })

};

test("No repeated warnings", async () => {
    expect.assertions(1);
    let test = await getAllUsers();
    expect(test).toBe(false);
});