// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * 1.对于临时变量，编译器会自动选择memory(按值传递)或storage (引用 址)。 变长数据类型二选一
 * 2.如果返回数据类型是变长的 需要memory修饰一下 string bytes 数组 自定义结构的
 * 3.storage (引用 址) C++指针
 * 4.memory修饰的临时变量相当于右值的一个拷贝，对其进行的修改不会影响到本尊。
 */

struct User {
    string name;
    uint8 age;
    string sex;
}

contract storage_demo {
    User adminuser;

    function setUser(
        string memory _name,
        uint8 _age,
        string memory _sex
    ) public {
        adminuser.name = _name;
        adminuser.age = _age;
        adminuser.sex = _sex;
    }

    function getUser() public view returns (User memory) {
        return adminuser;
    }

    function setAge1(uint8 _age) public view {
        //按值引用 按址（传递）引用
        User memory user = adminuser; //这里是按值传递
        user.age = _age;  //这里是对user的一个拷贝进行修改，不会影响到adminuser ×
    }

    function setAge2(uint8 _age) public {
        //按引用传递
        User storage user = adminuser; //这里是按址传递
        user.age = _age; //这里是对adminuser进行修改 √
    }

    function setAge3(User storage _user, uint8 _age) internal {
        _user.age = _age; //这里是对传入的引用进行修改 √
    }

    function callsetAge3(uint8 _age) public {
        //纯是为了演示使用
        setAge3(adminuser, _age);
    }
}