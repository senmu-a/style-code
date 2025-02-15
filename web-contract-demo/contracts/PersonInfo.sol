// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PersonInfo {
    struct PersonData {
        string name;
        uint age;
    }
    
    PersonData private personData;
    
    // 更新事件定义
    event PersonDataChanged(
        address indexed user,
        string name,
        uint age
    );
    
    // 设置个人信息
    function setPersonData(string memory _name, uint _age) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_age > 0 && _age < 150, "Invalid age");
        
        personData.name = _name;
        personData.age = _age;
        
        emit PersonDataChanged(msg.sender, _name, _age);
    }
    
    // 获取个人信息
    function getPersonData() public view returns (PersonData memory) {
        return personData;
    }
}
