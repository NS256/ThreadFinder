const express = require("express");
const Thread = require("../models/threadModel");
const Family = require("../models/threadFamilyModel");

exports.getAllThreads = async (req,res,next) => {
    const threads = await Thread.find();

    res.status(200).json({
        status: "success",
        results: threads.length,
        data: threads,
    }); 
};

exports.getThread = async (req,res,next) => {
    const thread = await Thread.find(req.body);

    return res.status(200).json({
        status: "success",
        results: thread.length,
        data: thread,
    }); 
};

exports.createThread = async (req,res,next) => {
    //search for an existing thread family the submitted family name
    let family = await Family.find({
        $or:[
            {name: {$eq: req.body.familyName}},
            {fullName: {$eq: req.body.familyName}}
        ]
        
    });

    let familyLink;

    if (family.length > 1){
        res.status(400).json({
            status: "fail",
            message: "Unable to link appropriate thread type.",
        });
    } else if (family.length == 1) {
        familyLink = family[0]._id;
    } else {
        //no thread family exists, one must be created
        let family = await Family.create({
            name: req.body.familyName,
            fullName: req.body.familyFullName,
        })

        familyLink = family._id;
    }

    const newThread = await Thread.create({
        name: req.body.name,
        outerDiameter: req.body.outerDiameter,
        innerDiameter: req.body.innerDiameter,
        clearance: req.body.clearanceDrill,
        tap: req.body.tapDrill,
        tpi: req.body.tpi,
        familyID: familyLink,
    });

    return res.status(201).json({
        status: "success",
        data: newThread,
    });
};

exports.getAllThreadFamily = async (req,res,next) => {
    //get all the familys
    let family = await Family.find().lean();

    //get how many threads belong to this family
    for (let i = 0; i < family.length; i++){
        //get the threads matching that family
        let threadID = family[i]._id;
        const threads = await Thread.find({
            familyID: threadID,
        });
        console.log(`All found threads: ${threads.length}`);
        family[i].availableThreads = threads.length;
    }

    return res.status(200).json({
        status: "success",
        results: family.length,
        data: family,

    });
};