const express=require("express");
const router= express.Router();
const path=require("node:path");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");



const videosJSONFile=path.join(__dirname,"../data/videos.json");
const videos=require(videosJSONFile);


router.get("/", (_req, res) => {
    try {
        const videoList=videos.map(video=>{
            return {
                id: video.id,
                title: video.title,
                image: video.image,
                channel: video.channel   
            }
        });
      res.status(200).json(videoList);
    } catch (error) {
      console.log("Error retrieving the videos", error);
    }
  });



  router.get("/:id", (req, res) => {
    const vidFound = videos.find((video) => video.id === req.params.id);
    if (vidFound) {
      res.status(200).json(vidFound);
    } else {
      res
        .status(404)
        .json({ error: `Oops! Video not found` });
    }
  });



// post functions to get id and change the JSON-file
  const getNewId = () => {
    return uuidv4();
  };
  const writeJSONFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
      if (err) console.log(err);
      console.log(`changes saved to ${filename}`);
    });
  };
  const timestampDate = new Date();
  
//post api
  router.post("/", (req, res) => {
    console.log(req.body);
    const { title,description } = req.body;
    if (!title || !description ) {
      return res.status(400).json({
        error: "Please provide title and description",
      });
    }
  
    const newVid = {
      id: getNewId(),
      title,
      description,
      image:"http://localhost:8080/images/Upload-video.jpg" ,
      channel:"User",
      views:"0",
      likes:"0",
      timestamp:timestampDate.getTime(),
    };
  
    
    videos.push(newVid);
    writeJSONFile(videosJSONFile, videos);
    res.status(201).json(newVid);
  });
  
  


  module.exports=router;