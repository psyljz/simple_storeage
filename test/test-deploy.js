const { ethers } = require("hardhat");
const {expect,assert} = require("chai");
// const { assert } = require("console");

describe("SimpleStorage",function (){

    let simpleStorageFactory,simpleStorage
    beforeEach(async function(){ 

        simpleStorageFactory= await ethers.getContractFactory("SimpleStorage")
        simpleStorage= await simpleStorageFactory.deploy()

    })

    it("should start with faorite number of 0", async function(){
        const currentValue =await simpleStorage.retrieve()
        const expectedValue="0"
 
        assert.equal(currentValue.toString(),expectedValue)
    })

    it("should update when we call store", async function(){
        
        const expectedValue="7"
        await simpleStorage.store("7")
        const currentValue =await simpleStorage.retrieve()
 
        assert.equal(currentValue.toString(),expectedValue)
    })


     
})