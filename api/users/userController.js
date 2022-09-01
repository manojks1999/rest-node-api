const {
    create,
    editUsers,
    searchUsers,
    createUserGroup,
    addUserGroup,
    getGroupMembers,
    deleteGrp,
    deleteIdgroup,
    addMessage,
    getMsg
  } = require("./userService");
  


  let createUser = (req, res) => {
    const body = req.body;
    console.log(body)
    return create(body, res);
  }




  let editUser = (req, res) => {
    const body = req.body;
    console.log(body)
    return editUsers(body, res);
  }



let searchUser = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body)
  return searchUsers(id, res);
}



let createGroup = async (req, res) => {
  const body = req.body;
  if(body.groupId === undefined){
    return res.json({
      "message":"Please mention the groupId"
    })
  }
  try{
    const res1 = await createUserGroup(body, res);
    console.log("after")
    const res2 = await addUserGroup(body, res);
  }catch{
    return res.status(404).json({
      status:0,
      "message": "Failed"
    })
  }
  return res.status(200).json({
    status:1,
    "message": "Created"
  });
}




let deleteGroup = async (req, res) => {
  const body = req.body;
  if(body.groupId === undefined){
    return res.status(404).json({
      "message":"Please mention the groupId"
    })
  }
  try{
    const groupMembers = await getGroupMembers(body.groupId, res);
    var exist = false;
    exist = groupMembers.filter((member) => {
      if(member['userId'] === body.userId){
        return true;
      }
    })
    if(!exist){
      res.status(404).json({
        status: 1,
        "message": "User Not exists in this group"
      })
    }
    const delGrp = await deleteGrp(body, res);
    const delFromgroups = await deleteIdgroup(body, res);
    return res.status(200).json({
      status:1,
      "message": "User Group Deleted"
    })
  }catch{
    return res.status(404).json({
      status:0,
      "message": "Failed"
    })
  }
}




let addMember = async (req, res) => {
  const body = req.body;
  if(body.groupId === undefined){
    return res.staus(404).json({
      "message":"Please mention the groupId"
    })
  }
  try{
    let groupMembers = await getGroupMembers(body.groupId, res);
    let exist;
    exist = groupMembers.filter((member) => {
      if(member['userId'] === body.userId){
        return true;
      }
    })
    console.log("exissst",exist)
    if(exist.length === 0){
      return res.staus(200).json({
        status: 1,
        "message": "User Not exists in this group"
      })
    }
    groupMembers = await getGroupMembers(body.groupId, res);
    console.log("grp mem",groupMembers)
    exist = groupMembers.filter((member) => {
      if(member['userId'] === body.newUserId){
        return true;
      }
    })
    console.log("len of new",exist.length)
    if(exist.length != 0){
      return res.status(200).json({
        status: 1,
        "message": "User already exists in this group"
      })
    }
    let newUserbody = {
      userId: body.newUserId,
      groupId: body.groupId
    }
    const addUser = await addUserGroup(newUserbody, res);
    return res.json({
      status:1,
      "message": "User is added to Group"
    })
  }catch{
    return res.json({
      status:0,
      "message": "Failed please check groupId or UserId"
    })
  }
}



let sendMessage = async(req, res) => {
  try{
    let body = req.body;
    let groupMembers = await getGroupMembers(body.groupId, res);
    let present;
    present = groupMembers.filter((member) => {
      if(member["userId"] === body.userId){
        return true;
      }
    });
    if(present.length === 0){
      return res.status(404).json({
        status: 0,
        "message": "User not present in this group"
      })
    }
    console.log(parseInt(String(Date.now()).slice(-9)))
    let addMsg = await addMessage(body, res);
    return res.status(200).json({
      status:1,
      "message": "Received"
    })
  }catch{
    return res.status(404).json({
      status:0,
      "message":"error"
    })
  }
}


let viewMesssages = async(req, res) => {
  let body = req.body;
  console.log(body.groupId)
  let groupMembers = await getGroupMembers(body.groupId, res);
  console.log(groupMembers)
  let present = groupMembers.filter((member) => {
    if(member['userId'] === body.userId){
      return true;
    }
  })
  if(present.length === 0){
    return res.status(404).json({
      status:1,
      "message": "User not present in this group"
    })
  }
  let msgs = await getMsg(body, res);
  if(msgs.length === 0){
    return res.status(200).json({
      status: 1,
      "message": "No messages found"
    })
  }
  return res.status(200).json({
    msgs
  })
}

module.exports = {
  createUser,
  editUser,
  addMember,
  deleteGroup,
  createGroup,
  searchUser,
  sendMessage,
  viewMesssages
}