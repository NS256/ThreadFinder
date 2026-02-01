const express = require("express");
const Thread = require("../models/threadModel");
const Family = require("../models/threadFamilyModel");

exports.getAllThreads = async (req,res,next) => {
    let threads = await Thread.find().lean();
    const threadFamilies = await Family.find();

    // console.log(threads);

    for (let i = 0; i < threads.length; i++){
        const threadFamilyID = threads[i].familyID;
        let family = threadFamilies.find((el) => el.id === threadFamilyID);

        if (!family) {
            family = {};
            threads[i].familyID = null;
        }

        threads[i].family = family;
        
    }

    res.status(200).json({
        status: "success",
        results: threads.length,
        data: threads,
        types: threadFamilies,

    }); 
};

/** Will get all threads that match the search parameter, not just a single thread
 * Later can be built out to also accept the search parameters included in advanced search, for now will only take the individual search parameter
 */
exports.getThread = async (req,res,next) => {
    //get the query params
    const query = req.query.q;

    //all thread families must be got early on to allow for filtering if typeof is a string
    const threadFamilies = await Family.find();

    let queryObj = {};
    

    if (Object.keys(req.query).length > 0) {
        

        //Nest all other query functions here to start to filter output
        if (typeof query === 'string' && query.toLowerCase().includes("tpi")) {
            let tpiQuery = query.toLowerCase().replace(/\D/g, "");

            queryObj.tpi = tpiQuery;
        } else if (typeof query === 'string' && isNaN(query)) {
            //correct any spaces in the query
            let correctedQuery = query.replaceAll('%20',' ').replaceAll('+',' ');
            

            const filteredFamilies = threadFamilies.filter((el) => (
                el.name.toLowerCase().includes(correctedQuery.toLowerCase()) || el.fullName.toLowerCase().includes(correctedQuery.toLowerCase())
            ));

            queryObj.$or = [{ 'name': { $regex: '.*' + correctedQuery + '.*', $options: 'i' }}];

            filteredFamilies.forEach(el => {
                queryObj.$or.push({ 'familyID': el._id });
            });


        } else if (typeof query === 'number' || !isNaN(query)) {

            let correctedQuery = parseFloat(query);

            const minMultiplier = 0.9;
            const maxMultiplier = 1.1;

            //if the type is 
            queryObj.$or = [
                { 'tpi': query },
                { $and: 
                    [
                        { 'outerDiameter': { $gt: correctedQuery * minMultiplier} },
                        { 'outerDiameter': { $lt: correctedQuery * maxMultiplier} },
                    ], 
                },
                { $and: 
                    [
                        { 'innerDiameter': { $gt: correctedQuery * minMultiplier } },
                        { 'innerDiameter': { $lt: correctedQuery * maxMultiplier } },
                    ], 
                },
                { $and: 
                    [
                        { 'clearance': { $gt: correctedQuery * minMultiplier } },
                        { 'clearance': { $lt: correctedQuery * maxMultiplier } },
                    ], 
                },
                { $and: 
                    [
                        { 'tap': { $gt: correctedQuery * minMultiplier } },
                        { 'tap': { $lt: correctedQuery * maxMultiplier } },
                    ], 
                },
            ]
        }
    }


    

    let thread = await Thread.find(queryObj).lean();
    


    //GET THE THREAD FAMILY FOR ALL THREADS
    for (let i = 0; i < thread.length; i++){
        const threadFamilyID = thread[i].familyID;
        let family = threadFamilies.find((el) => el.id === threadFamilyID);

        if (!family) {
            family = {};
            thread[i].familyID = null;
        }

        thread[i].family = family;
        
    }

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
    } else if (req.body.defaultUnit) {
        //Reject request if no default unit provided due to no defaultUnit provided.

        res.status(400).json({
            status: "fail",
            message: "Unable to create thread family, no default unit provided.",
        });
    } else {
        //no thread family exists, one must be created
        let family = await Family.create({
            name: req.body.familyName,
            fullName: req.body.familyFullName,
            defaultUnit: req.body.defaultUnit,
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

exports.getThreadCounts = async (req,res,next) => {
    const totalThreads = await Thread.countDocuments();
    const totalThreadFamilies = await Family.countDocuments();

    return res.status(200).json({
        status: "success",
        counts: {
            totalThreads, totalThreadFamilies
        },
    })
}