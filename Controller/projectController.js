const projects = require('../Models/projectSchema')


exports.addProject = async(req,res)=>{
    console.log("Inside Add Project Function")
    const {title,languages,github,website,overview,userId} =req.body
    const projectImage =req.file.filename

    // console.log(`${title} ${languages} ${github} ${website} ${overview} ${projectImage} ${userId}`);
try {
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json("project already exists...")
    }else{
        const newProject = new projects({
            title,languages,github,website,overview,projectImage,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
    }
} catch (error) {
    res.status(401).json(`Error !!! Transaction Failed : ${error}`)

}


}
/// to get project
exports.getProject = async(req,res)=>{
    const userId =req.payload
    try{
        const  ProjectDisplay = await projects.find({userId})
        res.status(200).json(ProjectDisplay)
    }
    catch (error) {
        res.status(401).json(` not found: ${error}`)
    
    }
}

// get three projects

exports.getHomeProjects = async (req,res)=>{
    
try {
    const threeProjects = await projects.find().limit(3)
    res.status(200).json(threeProjects)
} catch (error) {
    res.status(401).json(` not found: ${error}`)

}
}
// all projects
exports.getAllProjects =async(req,res)=>{
    const searchKey = req.query.searchKey
    const query = {
        languages:{
            $regex:searchKey, $options:"i"
        }
    }
try {
    const allprojects = await projects.find(query)
    res.status(200).json(allprojects)

} catch (error) {
    res.status(401).json(` not found: ${error}`)

}
}
/// edit project
exports.editProject = async (req,res)=>{
    const userId =req.payload 
    const {title,languages,github,website,overview,projectImage} =req.body
    const uploadedImage = req.file?req.file.filename:projectImage
    const {id} =req.params
    try {
        const uploadProjects = await projects.findByIdAndUpdate({_id:id},{
            title,languages,github,website,overview,projectImage:uploadedImage,userId
        },{new:true})
        await uploadProjects.save()
        res.status(200).json(uploadProjects)

    } catch (error) {
        res.status(401).json(` not found: ${error}`)
  
    }

}
//delte project

exports.delteProject= async(req,res)=>{
    const {id} =req.params
    try {
       const deltedProjects = await projects.findByIdAndDelete({_id:id}) 
       res.status(200).json(deltedProjects)
    } catch (error) {
        res.status(401).json(` not found: ${error}`)

    }
}