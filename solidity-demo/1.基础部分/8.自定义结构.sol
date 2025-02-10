// SPDX-License-Identifier: GPL-3.0

pragma solidity version ^0.8.0;

struct User {
    string name;
    uint8 age;
    string sex;
}

contract struct_demo {
    User user;
    User[] users;

    function setUser(
        string memory _name,
        uint8 _age,
        string memory _sex
    ) public {
        // user.name = _name;
        // user.age = _age;
        // user.sex = _sex;
        user = User(_name, _age, _sex);
        users.push(user);
    }

    function getUser() public view returns (User memory) {
        return user;
    }

    function findPerson(uint256 _index) public view returns (User memory) {
        return users[_index];
    }
}
